// src/pages/AdminDashboard.tsx
import { useState, useEffect, useMemo } from "react";
import { db, auth, storage } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  getDoc,
  setDoc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  User,
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as Papa from "papaparse";
import ReactMarkdown from "react-markdown";

/* ---------- Types ---------- */
interface Entry {
  id?: string;
  name?: string;
  bookTitle?: string;
  genre?: string;
  quote?: string;
  narrator?: string;
  link?: string;
  image?: string;
  published?: boolean;
  updatedAt?: Timestamp;
  style?: string;
  _tab?: string;
}

interface Quest {
  title: string;
  description: string;
  startDate: string; // yyyy-mm-dd
  archivedAt?: Timestamp;
}

interface ReleaseEntry {
  id?: string;
  title?: string;
  author?: string;
  releaseDate?: string; // yyyy-mm-dd
  preorder?: boolean;
  link?: string;
  cover?: string; // image URL
  blurb?: string;
  series?: string;
  tags?: string; // comma-separated
  format?: string;
  published?: boolean;
  updatedAt?: Timestamp;
  _tab?: string;
}

// ✅ Use the interfaces so TS build doesn't fail (and keeps you safer than `any`)
type AdminRow = Entry | ReleaseEntry | Record<string, any>;
type AdminForm = Partial<Entry & ReleaseEntry & Quest> & Record<string, any>;

/* ---------- Collections ---------- */
const COLLECTIONS = [
  { key: "virtual_shelf_books", label: "📚 Virtual Shelf", template: "virtual_shelf_template.csv" },
  { key: "featured_authors", label: "✨ Featured Authors", template: "featured_books_template.csv" },
  { key: "narrators", label: "🎙 Narrators", template: "narrators_template.csv" },
  { key: "audiobooks", label: "🔊 Audiobooks", template: "audiobooks_template.csv" },
  { key: "new_releases", label: "🗓 New Releases", template: "new_releases_template.csv" },
  { key: "current_quest", label: "🧽 Current Quest", template: "" },
] as const;

type CollectionKey = (typeof COLLECTIONS)[number]["key"];

const ADMIN_UID = "reTG4KXRVeU4jzWdXstO5K78wCF3";

/* ---------- Labels / Tooltips ---------- */
const FIELD_LABELS: Record<string, string> = {
  name: "Name (Author or Narrator)",
  bookTitle: "Book Title",
  genre: "Genre",
  quote: "Quote (Optional)",
  narrator: "Narrator(s)",
  style: "Style",
  link: "Link (Preferred website or sample)",
  image: "Image URL (or Upload)",

  // ✅ New Releases
  title: "Book Title",
  author: "Author Name",
  releaseDate: "Release Date",
  preorder: "Preorder Available",
  cover: "Cover Image URL (or Upload)",
  blurb: "Blurb / Description",
  series: "Series (Optional)",
  tags: "Tags (comma-separated)",
  format: "Format (eBook / PB / HB / Audio etc.)",
};

const FIELD_TOOLTIPS: Record<string, string> = {
  name: "Enter the author or narrator name.",
  bookTitle: "Full title of the book.",
  genre: "e.g., Fantasy, Dark Romance, Horror.",
  quote: "Optional highlight or tagline.",
  narrator: "List of narrator(s), if applicable.",
  style: "Narration style e.g., Deep, Sultry, Dramatic.",
  link: "Link to store, sample, or website.",
  image: "Upload a file or paste a direct URL.",

  // ✅ New Releases
  title: "The book title.",
  author: "The author name.",
  releaseDate: "Release date (YYYY-MM-DD).",
  preorder: "Tick if the book is available for preorder.",
  cover: "Upload a file or paste a direct cover image URL.",
  blurb: "Short description shown on the calendar panel.",
  series: "Optional: series name / book number.",
  tags: "Comma-separated tags (e.g. Dark Romance, Myth, Irish).",
  format: "Optional: eBook, Paperback, Hardcover, Audio, etc.",
};

/* ---------- Per-tab required fields (link & image optional) ---------- */
const REQUIRED: Record<CollectionKey, string[]> = {
  virtual_shelf_books: ["name", "bookTitle", "genre"],
  featured_authors: ["name", "bookTitle", "genre"],
  narrators: ["name", "genre", "style"],
  audiobooks: ["bookTitle", "name", "narrator"],
  new_releases: ["title", "author", "releaseDate"],
  current_quest: [], // handled separately
};

/* ---------- Storage Upload Settings ---------- */
const MAX_FILE_MB = 8;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const folderForTab: Record<string, string> = {
  virtual_shelf_books: "covers/virtual_shelf",
  featured_authors: "covers/featured_authors",
  narrators: "covers/narrators",
  audiobooks: "covers/audiobooks",
  new_releases: "covers/new_releases",
  current_quest: "covers/quests",
};

/* ---------- Helpers ---------- */
const normalizeUrl = (v?: string) => {
  if (!v) return "";
  const s = String(v).trim();
  if (!s) return "";
  return /^https?:\/\//i.test(s) ? s : `https://${s}`;
};

const isValidUrl = (v?: string) => {
  if (!v) return false;
  try {
    const u = new URL(normalizeUrl(v));
    return !!u.protocol && !!u.host;
  } catch {
    return false;
  }
};

const toBool = (v: any) => {
  if (typeof v === "boolean") return v;
  if (typeof v === "number") return v !== 0;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    return ["true", "t", "yes", "y", "1"].includes(s);
  }
  return false;
};

function safeStr(v: any) {
  return (v ?? "").toString();
}

/* =======================================================
   Admin Dashboard
======================================================= */
export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<CollectionKey>(COLLECTIONS[0].key);
  const [entries, setEntries] = useState<AdminRow[]>([]);
  const [formData, setFormData] = useState<AdminForm>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [previousQuests, setPreviousQuests] = useState<Quest[]>([]);
  const [bulkResults, setBulkResults] = useState<{ success: number; failed: number }>({
    success: 0,
    failed: 0,
  });
  const [imageUploading, setImageUploading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const isQuestTab = activeTab === "current_quest";

  /* ---------- Auth ---------- */
  useEffect(() => onAuthStateChanged(auth, setUser), []);

  /* ---------- Visible Fields Per Tab ---------- */
  const visibleFields = useMemo(() => {
    switch (activeTab) {
      case "virtual_shelf_books":
        return ["name", "bookTitle", "genre", "link", "image"];
      case "featured_authors":
        return ["name", "bookTitle", "genre", "quote", "image"];
      case "narrators":
        return ["name", "genre", "style", "link", "image"];
      case "audiobooks":
        return ["bookTitle", "name", "narrator", "link"];
      case "new_releases":
        return [
          "title",
          "author",
          "releaseDate",
          "preorder",
          "link",
          "format",
          "series",
          "tags",
          "blurb",
          "cover",
        ];
      default:
        return [];
    }
  }, [activeTab]);

  const requiredFields = useMemo(() => REQUIRED[activeTab] ?? [], [activeTab]);

  /* ---------- Data Fetch ---------- */
  const fetchActiveTab = async () => {
    if (!user || user.uid !== ADMIN_UID) return;

    if (isQuestTab) {
      const questDoc = await getDoc(doc(db, "site_content", "current_quest"));
      setFormData(questDoc.exists() ? (questDoc.data() as AdminForm) : {});
      const prevSnap = await getDocs(
        query(collection(db, "previous_quests"), orderBy("archivedAt", "desc"))
      );
      setPreviousQuests(prevSnap.docs.map((d) => d.data() as Quest));
      setEntries([]);
      return;
    }

    try {
      const snap = await getDocs(query(collection(db, activeTab), orderBy("updatedAt", "desc")));
      setEntries(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as AdminRow[]);
    } catch {
      const snap = await getDocs(collection(db, activeTab));
      setEntries(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as AdminRow[]);
    }
  };

  useEffect(() => {
    fetchActiveTab();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, user]);

  /* ---------- Auth Buttons ---------- */
  const handleLogin = () =>
    signInWithPopup(auth, new GoogleAuthProvider()).catch(console.error);
  const handleLogout = () => signOut(auth);

  /* ---------- Validation ---------- */
  const validateEntry = (row: any) => {
    const allRequiredPresent = requiredFields.every((f) => !!row[f]);
    const linkOk = !visibleFields.includes("link") || !row.link || isValidUrl(row.link);
    return allRequiredPresent && linkOk;
  };

  /* ---------- Submit / Update ---------- */
  const handleSubmit = async () => {
    const working: any = { ...formData };

    // normalize link
    if (visibleFields.includes("link") && working.link) {
      working.link = normalizeUrl(working.link);
    }

    if (activeTab === "new_releases") {
      working.preorder = toBool(working.preorder);
      working.tags = safeStr(working.tags).trim();
      working.format = safeStr(working.format).trim();
      working.series = safeStr(working.series).trim();
      working.title = safeStr(working.title).trim();
      working.author = safeStr(working.author).trim();
      working.blurb = safeStr(working.blurb);
    }

    if (isQuestTab) {
      const payload: any = { ...working, _tab: activeTab, updatedAt: serverTimestamp() };
      const { title, startDate, description } = payload as Quest;
      if (!title || !startDate || !description) {
        alert("Please fill Title, Start Date, and Description for the quest.");
        return;
      }
      await setDoc(doc(db, "site_content", "current_quest"), payload);
      alert("Quest saved.");
      return;
    }

    if (!validateEntry(working)) {
      const missing = requiredFields.filter((f) => !working[f]);
      const problems: string[] = [];
      if (missing.length) problems.push(`Missing required: ${missing.join(", ")}`);
      if (visibleFields.includes("link") && working.link && !isValidUrl(working.link)) {
        problems.push("Link must be a valid URL (or leave it blank).");
      }
      alert(problems.join("\n") || "Please fix validation issues.");
      return;
    }

    const payload: any = {
      ...working,
      _tab: activeTab,
      published: toBool(working.published),
      updatedAt: serverTimestamp(),
    };

    if (editingId) {
      await updateDoc(doc(db, activeTab, editingId), payload);
      setEditingId(null);
    } else {
      await addDoc(collection(db, activeTab), payload);
    }

    setFormData({});
    await fetchActiveTab();
  };

  /* ---------- Archive Quest ---------- */
  const archiveQuest = async () => {
    if (!formData?.title) return alert("No quest title found.");
    const ok = confirm(`Archive quest "${formData.title}"? This will clear the current quest.`);
    if (!ok) return;
    await addDoc(collection(db, "previous_quests"), { ...formData, archivedAt: serverTimestamp() });
    await setDoc(doc(db, "site_content", "current_quest"), {});
    setFormData({});
    alert("Quest archived.");
    await fetchActiveTab();
  };

  /* ---------- CSV Bulk Upload ---------- */
  const handleBulkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isQuestTab) {
      e.target.value = "";
      return alert("Bulk upload is disabled for Current Quest.");
    }
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const rows = results.data as any[];
        let success = 0;
        let failed = 0;

        for (const row of rows) {
          try {
            const normalized: any = { ...row };

            // Optional header conveniences (old tabs)
            if (normalized.title && !normalized.bookTitle && activeTab !== "new_releases")
              normalized.bookTitle = normalized.title;
            if (normalized.author && !normalized.name && activeTab !== "new_releases")
              normalized.name = normalized.author;
            if (normalized.cover && !normalized.image && activeTab !== "new_releases")
              normalized.image = normalized.cover;

            // New Releases convenience
            if (activeTab === "new_releases") {
              if (normalized.date && !normalized.releaseDate) normalized.releaseDate = normalized.date;
              normalized.preorder = toBool(normalized.preorder);
              if (normalized.link) normalized.link = normalizeUrl(normalized.link);
              if (normalized.image && !normalized.cover) normalized.cover = normalized.image;
            } else {
              if (normalized.link) normalized.link = normalizeUrl(normalized.link);
              normalized.published = toBool(normalized.published);
            }

            normalized.published = toBool(normalized.published);

            if (validateEntry(normalized)) {
              await addDoc(collection(db, activeTab), {
                ...normalized,
                _tab: activeTab,
                updatedAt: serverTimestamp(),
              });
              success++;
            } else {
              failed++;
            }
          } catch {
            failed++;
          }
        }

        setBulkResults({ success, failed });
        alert(`Upload Complete:\n✅ ${success} added\n❌ ${failed} failed`);
        await fetchActiveTab();
      },
    });
  };

  /* ---------- Image Upload (Firebase Storage) ---------- */
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED.includes(file.type)) {
      alert("Please upload a JPG/PNG/WebP/GIF image.");
      return;
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      alert(`Image too large. Max ${MAX_FILE_MB} MB.`);
      return;
    }

    setImageUploading(true);
    try {
      const folder = folderForTab[activeTab] || "covers/misc";
      const safeName = file.name.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9._-]/g, "");
      const storageRef = ref(storage, `${folder}/${Date.now()}_${safeName}`);

      await uploadBytes(storageRef, file, { contentType: file.type });
      const url = await getDownloadURL(storageRef);

      const fieldName = activeTab === "new_releases" ? "cover" : "image";
      setFormData((prev) => ({ ...prev, [fieldName]: url }));
    } catch (err) {
      console.error(err);
      alert("Upload failed. Check Storage rules and try again.");
    } finally {
      setImageUploading(false);
    }
  };

  /* ---------- Edit / Delete ---------- */
  const handleEdit = (entry: AdminRow) => {
    setFormData(entry as AdminForm);
    setEditingId((entry as any).id || null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    const ok = confirm("Delete this entry? This cannot be undone.");
    if (!ok) return;
    await deleteDoc(doc(db, activeTab, id));
    await fetchActiveTab();
  };

  /* ---------- Filter ---------- */
  const filteredEntries = useMemo(() => {
    if (!search.trim()) return entries;
    const q = search.toLowerCase();
    return entries.filter((e) =>
      Object.values(e)
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [entries, search]);

  /* ---------- Auth Gates ---------- */
  if (!user)
    return (
      <div className="p-6 text-center">
        <p>🔐 Login required to access dashboard.</p>
        <button onClick={handleLogin} className="bg-gold text-black px-4 py-2 mt-4 rounded">
          Login with Google
        </button>
      </div>
    );

  if (user.uid !== ADMIN_UID) return <div className="p-6">⛔ Not authorized.</div>;

  const previewUrl = (formData as any).image || (formData as any).cover;

  /* ---------- UI ---------- */
  return (
    <div className="p-6 max-w-6xl mx-auto text-white">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold">📖 Inkbound Admin Dashboard</h1>
        <button onClick={handleLogout} className="text-sm bg-black text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>

      <div className="flex gap-4 mb-6 border-b pb-2 overflow-x-auto">
        {COLLECTIONS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
              setFormData({});
              setEditingId(null);
              setSearch("");
            }}
            className={`px-4 py-1 border-b-2 whitespace-nowrap ${
              activeTab === tab.key ? "border-gold text-gold" : "border-transparent text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Edit mode banner */}
      {!isQuestTab && editingId && (
        <div className="mb-4 p-3 rounded border border-blue-600 bg-blue-900/30 flex items-center justify-between">
          <span>
            ✏️ <strong>Editing</strong> this {activeTab.replace(/_/g, " ")} entry.
          </span>
          <button
            onClick={() => {
              setEditingId(null);
              setFormData({});
            }}
            className="text-sm bg-gray-700 px-3 py-1 rounded"
          >
            Cancel Edit
          </button>
        </div>
      )}

      {isQuestTab ? (
        <div className="grid gap-4">
          {/* Quest Title */}
          <div>
            <label htmlFor="quest-title" className="block text-sm mb-1">
              Quest Title
            </label>
            <input
              id="quest-title"
              className="border p-2 text-black w-full"
              placeholder="Quest Title"
              value={(formData as any).title || ""}
              onChange={(e) => setFormData({ ...(formData as any), title: e.target.value })}
            />
          </div>

          {/* Start Date */}
          <div>
            <label htmlFor="quest-start" className="block text-sm mb-1">
              Start Date
            </label>
            <input
              id="quest-start"
              type="date"
              className="border p-2 text-black w-full"
              value={(formData as any).startDate || ""}
              onChange={(e) => setFormData({ ...(formData as any), startDate: e.target.value })}
            />
          </div>

          {/* Markdown Description */}
          <div>
            <label htmlFor="quest-desc" className="block text-sm mb-1">
              Markdown Description
            </label>
            <textarea
              id="quest-desc"
              className="border p-2 min-h-[140px] text-black w-full"
              placeholder="Use **Markdown** here…"
              value={(formData as any).description || ""}
              onChange={(e) =>
                setFormData({ ...(formData as any), description: e.target.value })
              }
            />
          </div>

          <div className="flex gap-2">
            <button onClick={handleSubmit} className="bg-green-700 text-white px-4 py-2 rounded">
              Save Quest
            </button>
            <button onClick={archiveQuest} className="bg-red-700 text-white px-4 py-2 rounded">
              Archive Quest
            </button>
          </div>

          <div className="prose prose-invert max-w-none border-t pt-4">
            <p className="font-semibold">Live Preview:</p>
            <ReactMarkdown>{(formData as any).description || "_No description yet._"}</ReactMarkdown>
          </div>

          <div>
            <p className="font-semibold mt-4">📜 Previous Quests:</p>
            <ul className="list-disc pl-5 text-sm text-gray-300">
              {previousQuests.map((q, i) => (
                <li key={i}>
                  <strong>{q.title}</strong> — {q.startDate}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <>
          {/* Search */}
          <div className="mb-4">
            <label htmlFor="search" className="block text-sm mb-1">
              Search
            </label>
            <input
              id="search"
              className="border p-2 w-full text-black"
              placeholder="Filter by anything…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Dynamic Form */}
          <div className="grid gap-3 md:grid-cols-2 mb-6">
            {visibleFields.map((field) => (
              <div key={field} className="relative">
                <label htmlFor={`field-${field}`} className="block text-sm mb-1">
                  {FIELD_LABELS[field] || field}{" "}
                  {requiredFields.includes(field) && <span className="text-gold">*</span>}
                </label>

                {field === "preorder" ? (
                  <label className="flex items-center gap-2 bg-black/20 border border-gray-700 rounded p-2">
                    <input
                      type="checkbox"
                      checked={!!(formData as any).preorder}
                      onChange={(e) =>
                        setFormData({ ...(formData as any), preorder: e.target.checked })
                      }
                      className="mr-1"
                    />
                    <span className="text-sm">Preorder available</span>
                  </label>
                ) : field === "blurb" ? (
                  <textarea
                    id={`field-${field}`}
                    className="border p-2 w-full text-black min-h-[110px]"
                    placeholder={FIELD_LABELS[field] || field}
                    value={((formData as any)[field] as string) || ""}
                    onChange={(e) => setFormData({ ...(formData as any), [field]: e.target.value })}
                  />
                ) : field === "releaseDate" ? (
                  <input
                    id={`field-${field}`}
                    type="date"
                    className="border p-2 w-full text-black"
                    value={((formData as any).releaseDate as string) || ""}
                    onChange={(e) =>
                      setFormData({ ...(formData as any), releaseDate: e.target.value })
                    }
                  />
                ) : field === "link" ? (
                  <input
                    id={`field-${field}`}
                    className="border p-2 w-full text-black"
                    placeholder={FIELD_LABELS[field] || field}
                    value={(((formData as any)[field] as string) || "") as string}
                    onChange={(e) => setFormData({ ...(formData as any), [field]: e.target.value })}
                    onBlur={(e) => {
                      const fixed = normalizeUrl(e.target.value);
                      if (fixed !== e.target.value) {
                        setFormData((prev) => ({ ...(prev as any), [field]: fixed }));
                      }
                    }}
                  />
                ) : (
                  <input
                    id={`field-${field}`}
                    className="border p-2 w-full text-black"
                    placeholder={FIELD_LABELS[field] || field}
                    value={((formData as any)[field] as string) || ""}
                    onChange={(e) => setFormData({ ...(formData as any), [field]: e.target.value })}
                  />
                )}

                <span
                  className="absolute top-0 right-0 mt-1 mr-1 text-xs text-gray-400 cursor-help"
                  title={FIELD_TOOLTIPS[field] || ""}
                >
                  🛈
                </span>
              </div>
            ))}

            {/* File upload for image/cover */}
            {(visibleFields.includes("image") || visibleFields.includes("cover")) && (
              <div className="md:col-span-2">
                <label htmlFor="image-file" className="block text-sm mb-1">
                  Upload Image / Cover
                </label>
                <input
                  id="image-file"
                  className="border p-2 w-full bg-black/20"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {imageUploading && <p className="text-xs mt-1 text-gray-400">Uploading image…</p>}
                {previewUrl && (
                  <div className="mt-2 flex items-center gap-3">
                    <img
                      src={previewUrl}
                      alt="preview"
                      className="w-20 h-28 object-cover rounded border border-gray-700"
                    />
                    <a
                      className="underline text-gold text-sm break-all"
                      href={previewUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open image
                    </a>
                  </div>
                )}
              </div>
            )}

            <label className="col-span-full flex items-center gap-2">
              <input
                id="published"
                type="checkbox"
                checked={!!(formData as any).published}
                onChange={(e) => setFormData({ ...(formData as any), published: e.target.checked })}
                className="mr-1"
              />
              <span>Published</span>
            </label>

            <div className="col-span-full flex gap-2">
              <button onClick={handleSubmit} className="bg-green-700 text-white px-4 py-2 rounded">
                {editingId ? "Update Entry" : "Add Entry"}
              </button>
              {editingId && (
                <button
                  onClick={() => {
                    setEditingId(null);
                    setFormData({});
                  }}
                  className="bg-gray-700 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* Bulk Upload */}
          <div className="mb-6">
            <label className="block mb-1 text-sm font-semibold">📥 Bulk Upload CSV</label>
            <input type="file" accept=".csv" onChange={handleBulkUpload} className="mb-2" />
            {COLLECTIONS.find((c) => c.key === activeTab)?.template && (
              <a
                className="text-sm underline text-gold"
                href={`/csv-templates/${COLLECTIONS.find((c) => c.key === activeTab)?.template}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Template
              </a>
            )}
            {bulkResults.success + bulkResults.failed > 0 && (
              <p className="text-sm mt-2">
                Last upload: ✅ {bulkResults.success} added, ❌ {bulkResults.failed} failed
              </p>
            )}
          </div>

          {/* Entries List */}
          {filteredEntries.map((entry) => {
            const isEditingThis = editingId === (entry as any).id;
            const row: any = entry;

            return (
              <div
                key={row.id}
                className={`border p-4 mb-2 rounded flex justify-between items-start ${
                  isEditingThis ? "border-blue-600 bg-blue-900/20" : "border-gray-700"
                }`}
              >
                <div className="pr-4">
                  {visibleFields.map((field) => {
                    const val = row[field];

                    // cover/image preview
                    if ((field === "image" || field === "cover") && val) {
                      return (
                        <img
                          key={field}
                          src={val}
                          alt="cover"
                          className="w-24 mt-2 rounded border border-gray-700"
                        />
                      );
                    }

                    if (field === "preorder") {
                      return (
                        <p key={field}>
                          <span className="text-gray-400 capitalize">{field}:</span>{" "}
                          {toBool(val) ? "Yes" : "No"}
                        </p>
                      );
                    }

                    return (
                      <p key={field} className={field === "quote" ? "italic" : ""}>
                        {field === "quote" ? (
                          val
                        ) : (
                          <>
                            <span className="text-gray-400 capitalize">{field}:</span>{" "}
                            {val || "—"}
                          </>
                        )}
                      </p>
                    );
                  })}

                  <div className="mt-2 flex items-center gap-3 text-sm text-gray-400">
                    <span>
                      Updated:{" "}
                      {row.updatedAt instanceof Timestamp ? row.updatedAt.toDate().toLocaleString() : "—"}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs ${
                        row.published
                          ? "bg-green-900/50 border border-green-700"
                          : "bg-gray-800 border border-gray-700"
                      }`}
                    >
                      {row.published ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 shrink-0">
                  <button
                    className="bg-blue-700 text-white px-3 py-1 rounded"
                    onClick={() => handleEdit(entry)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => row.id && handleDelete(row.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
