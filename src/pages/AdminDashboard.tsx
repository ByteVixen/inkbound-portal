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
interface Quest {
  title: string;
  description: string;
  startDate: string;
  archivedAt?: Timestamp;
}

/* ---------- Collections ---------- */
const COLLECTIONS = [
  { key: "virtual_shelf_books", label: "📚 Virtual Shelf", template: "virtual_shelf_template.csv" },
  { key: "featured_authors", label: "✨ Featured Authors", template: "featured_books_template.csv" },
  { key: "narrators", label: "🎙 Narrators", template: "narrators_template.csv" },
  { key: "audiobooks", label: "🔊 Audiobooks", template: "audiobooks_template.csv" },
  { key: "new_releases", label: "🗓 New Releases", template: "new_releases_template.csv" },
  { key: "creatives", label: "🎨 Creatives", template: "creatives_template.csv" },
  { key: "auction_items", label: "⚡ Auction", template: "auction_items_template.csv" },
  { key: "current_quest", label: "🧽 Current Quest", template: "" },
] as const;

type CollectionKey = typeof COLLECTIONS[number]["key"];

const ADMIN_UID = "reTG4KXRVeU4jzWdXstO5K78wCF3";

/* ---------- Labels / Tooltips ---------- */
const FIELD_LABELS: Record<string, string> = {
  name: "Name",
  bookTitle: "Book Title",
  genre: "Genre",
  quote: "Quote (Optional)",
  narrator: "Narrator(s)",
  style: "Style",
  link: "Link",
  image: "Image URL (or Upload)",

  title: "Title",
  author: "Author Name",
  releaseDate: "Release Date",
  preorder: "Preorder Available",
  cover: "Cover Image URL (or Upload)",
  blurb: "Blurb / Description",
  series: "Series (Optional)",
  tags: "Tags (comma-separated)",
  format: "Format",

  businessName: "Business Name (Optional)",
  creativeType: "Creative Type",
  shortDescription: "Short Description",
  offers: "Services / Products Offered",
  website: "Website",
  socials: "Socials",
  exampleImageUrl: "Example Image URL (or Upload)",
  creditTag: "Preferred credit/tag",
  openToCollabs: "Open to collaborations?",
  featuredWhere: "Featured where?",

  imageUrl: "Auction Image URL (or Upload)",
  donorName: "Donor Name",
  startingBid: "Starting Bid",
  value: "Estimated Value",
  currentBid: "Current Bid",
  currentBidderName: "Highest Bidder Name",
  currentBidderEmail: "Highest Bidder Email",
  status: "Auction Status",
  order: "Display Order",
};

const FIELD_TOOLTIPS: Record<string, string> = {
  name: "Public display name.",
  bookTitle: "Full book title.",
  genre: "e.g., Fantasy, Dark Romance, Horror.",
  quote: "Optional highlight or tagline.",
  narrator: "List narrator(s) if applicable.",
  style: "Narration style.",
  link: "A valid URL. We'll auto-add https:// if missing.",
  image: "Upload a file or paste a direct URL.",

  title: "Title shown publicly.",
  author: "The author name.",
  releaseDate: "Release date.",
  preorder: "Tick if preorder is available.",
  cover: "Upload a cover file or paste an image URL.",
  blurb: "Short description.",
  series: "Optional series name.",
  tags: "Comma-separated tags.",
  format: "Optional format.",

  businessName: "Optional studio/business name.",
  creativeType: "Cover Artist / Illustrator / Designer / Bookish Business…",
  shortDescription: "A short public intro.",
  offers: "What you sell/provide.",
  website: "Where people can find you.",
  socials: "Social handles or links.",
  exampleImageUrl: "A portfolio/example image.",
  creditTag: "How Inkbound should credit you.",
  openToCollabs: "Show a collab badge.",
  featuredWhere: "Website / Discord / Both.",

  imageUrl: "Upload an image or paste a direct image URL.",
  donorName: "The person or business donating the prize.",
  startingBid: "The minimum opening bid.",
  value: "Approximate retail value of the item or bundle.",
  currentBid: "Usually same as starting bid when creating the lot.",
  currentBidderName: "Leave blank when creating a new lot.",
  currentBidderEmail: "Leave blank when creating a new lot.",
  status: "Use upcoming, live, closed, paid, or released.",
  order: "Controls display order.",
};

/* ---------- Required Fields ---------- */
const REQUIRED: Record<CollectionKey, string[]> = {
  virtual_shelf_books: ["name", "bookTitle", "genre"],
  featured_authors: ["name", "bookTitle", "genre"],
  narrators: ["name", "genre", "style"],
  audiobooks: ["bookTitle", "name", "narrator"],
  new_releases: ["title", "author", "releaseDate"],
  creatives: ["name", "creativeType", "shortDescription", "offers", "exampleImageUrl", "featuredWhere"],
  auction_items: [
  "title",
  "description",
  "donorName",
  "startingBid",
  "value",
  "status",
  "order",
],
  current_quest: [],
};

/* ---------- Upload Settings ---------- */
const MAX_FILE_MB = 8;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const folderForTab: Record<string, string> = {
  virtual_shelf_books: "covers/virtual_shelf",
  featured_authors: "covers/featured_authors",
  narrators: "covers/narrators",
  audiobooks: "covers/audiobooks",
  new_releases: "covers/new_releases",
  creatives: "covers/creatives",
  auction_items: "covers/auction",
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

const AUCTION_STATUSES = ["upcoming", "live", "closed", "paid", "released"];

/* =======================================================
   Admin Dashboard
======================================================= */
export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<CollectionKey>(COLLECTIONS[0].key);
  const [entries, setEntries] = useState<any[]>([]);
  const [formData, setFormData] = useState<any>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [previousQuests, setPreviousQuests] = useState<Quest[]>([]);
  const [bulkResults, setBulkResults] = useState({ success: 0, failed: 0 });
  const [imageUploading, setImageUploading] = useState(false);
  const [search, setSearch] = useState("");

  const isQuestTab = activeTab === "current_quest";
  const isAuctionTab = activeTab === "auction_items";

  useEffect(() => onAuthStateChanged(auth, setUser), []);

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
        return ["title", "author", "releaseDate", "preorder", "link", "format", "series", "tags", "blurb", "cover"];
      case "creatives":
        return ["name", "businessName", "creativeType", "shortDescription", "offers", "website", "socials", "creditTag", "openToCollabs", "featuredWhere", "exampleImageUrl"];
      case "auction_items":
        return [
  "title",
  "description",
  "imageUrl",
  "donorName",
  "startingBid",
  "value",
  "currentBid", "currentBidderName", "currentBidderEmail", "status", "order"];
      default:
        return [];
    }
  }, [activeTab]);

  const requiredFields = useMemo(() => REQUIRED[activeTab] ?? [], [activeTab]);

  const fetchActiveTab = async () => {
    if (!user || user.uid !== ADMIN_UID) return;

    if (isQuestTab) {
      const questDoc = await getDoc(doc(db, "site_content", "current_quest"));
      setFormData(questDoc.exists() ? questDoc.data() : {});

      const prevSnap = await getDocs(
        query(collection(db, "previous_quests"), orderBy("archivedAt", "desc"))
      );
      setPreviousQuests(prevSnap.docs.map((d) => d.data() as Quest));
      setEntries([]);
      return;
    }

    try {
      const orderField = isAuctionTab ? "order" : "updatedAt";
      const direction = isAuctionTab ? "asc" : "desc";
      const snap = await getDocs(query(collection(db, activeTab), orderBy(orderField, direction as any)));
      setEntries(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch {
      const snap = await getDocs(collection(db, activeTab));
      setEntries(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    }
  };

  useEffect(() => {
    fetchActiveTab();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, user]);

  const handleLogin = () =>
    signInWithPopup(auth, new GoogleAuthProvider()).catch(console.error);

  const handleLogout = () => signOut(auth);

  const validateEntry = (row: any) => {
    const allRequiredPresent = requiredFields.every((f) => {
      if (f === "startingBid" || f === "order") return row[f] !== undefined && row[f] !== "";
      return !!row[f];
    });

    const linkOk = !visibleFields.includes("link") || !row.link || isValidUrl(row.link);
    const websiteOk = activeTab !== "creatives" || !row.website || isValidUrl(row.website);

    const auctionStatusOk =
      activeTab !== "auction_items" || AUCTION_STATUSES.includes(safeStr(row.status));

    return allRequiredPresent && linkOk && websiteOk && auctionStatusOk;
  };

  const handleSubmit = async () => {
    const working: any = { ...formData };

    if (visibleFields.includes("link") && working.link) {
      working.link = normalizeUrl(working.link);
    }

    if (activeTab === "creatives") {
      if (working.website) working.website = normalizeUrl(working.website);
      working.name = safeStr(working.name).trim();
      working.businessName = safeStr(working.businessName).trim();
      working.creativeType = safeStr(working.creativeType).trim();
      working.shortDescription = safeStr(working.shortDescription).trim();
      working.offers = safeStr(working.offers).trim();
      working.socials = safeStr(working.socials);
      working.creditTag = safeStr(working.creditTag).trim();
      working.featuredWhere = safeStr(working.featuredWhere).trim() || "website";
      working.openToCollabs = toBool(working.openToCollabs);
      working.exampleImageUrl = safeStr(working.exampleImageUrl).trim();
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

    if (activeTab === "auction_items") {
      working.title = safeStr(working.title).trim();
      working.description = safeStr(working.description).trim();
      working.imageUrl = safeStr(working.imageUrl).trim();
      working.donorName = safeStr(working.donorName).trim();

      working.startingBid = Number(working.startingBid || 0);
      working.value = Number(working.value || 0);
      working.currentBid = Number(working.currentBid || working.startingBid || 0);
      working.currentBidderName = safeStr(working.currentBidderName).trim();
      working.currentBidderEmail = safeStr(working.currentBidderEmail).trim();
      working.status = safeStr(working.status).trim() || "upcoming";
      working.order = Number(working.order || 999);
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
      const missing = requiredFields.filter((f) => !working[f] && working[f] !== 0);
      const problems: string[] = [];

      if (missing.length) problems.push(`Missing required: ${missing.join(", ")}`);
      if (visibleFields.includes("link") && working.link && !isValidUrl(working.link)) {
        problems.push("Link must be a valid URL.");
      }
      if (activeTab === "creatives" && working.website && !isValidUrl(working.website)) {
        problems.push("Website must be a valid URL.");
      }
      if (activeTab === "auction_items" && !AUCTION_STATUSES.includes(working.status)) {
        problems.push("Auction status must be upcoming, live, closed, paid, or released.");
      }

      alert(problems.join("\n") || "Please fix validation issues.");
      return;
    }

    const payload: any = {
      ...working,
      _tab: activeTab,
      published: isAuctionTab ? true : toBool(working.published),
      updatedAt: serverTimestamp(),
      createdAt: working.createdAt ?? serverTimestamp(),
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

  const archiveQuest = async () => {
    if (!formData?.title) return alert("No quest title found.");

    const ok = confirm(`Archive quest "${formData.title}"? This will clear the current quest.`);
    if (!ok) return;

    await addDoc(collection(db, "previous_quests"), {
      ...formData,
      archivedAt: serverTimestamp(),
    });

    await setDoc(doc(db, "site_content", "current_quest"), {});
    setFormData({});
    alert("Quest archived.");
    await fetchActiveTab();
  };

 const openAuctionItem = async (itemId: string) => {
  const ok = confirm("Open this lot live?");
  if (!ok) return;

  await updateDoc(doc(db, "auction_items", itemId), {
    status: "live",
    updatedAt: serverTimestamp(),
  });

  await fetchActiveTab();
};

  const setAuctionStatus = async (itemId: string, status: string) => {
    await updateDoc(doc(db, "auction_items", itemId), {
      status,
      updatedAt: serverTimestamp(),
    });

    await fetchActiveTab();
  };

  const resetAuctionBid = async (entry: any) => {
    const ok = confirm(`Reset bids for "${entry.title}" back to starting bid?`);
    if (!ok) return;

    await updateDoc(doc(db, "auction_items", entry.id), {
      currentBid: Number(entry.startingBid || 0),
      currentBidderName: "",
      currentBidderEmail: "",
      updatedAt: serverTimestamp(),
    });

    await fetchActiveTab();
  };
const exportAuctionWinnersCSV = () => {
  const closedStatuses = ["closed", "paid", "released"];

  const winners = entries
    .filter(
      (entry) =>
        closedStatuses.includes(entry.status) &&
        (entry.currentBidderName ||
          entry.currentBidderEmail ||
          entry.currentBidderHandle)
    )
    .map((entry) => ({
      title: entry.title || "",
      donorName: entry.donorName || "",
      winnerName:
        entry.currentBidderName ||
        entry.currentBidderHandle ||
        "Unknown",
      winnerEmail: entry.currentBidderEmail || "",
      winningBid: entry.currentBid || entry.startingBid || 0,
      status: entry.status || "closed",
    }));

  if (!winners.length) {
    alert("No winners found.");
    return;
  }

  const headers = Object.keys(winners[0]);

  const csvRows = [
    headers.join(","),
    ...winners.map((row) =>
      headers
        .map((field) => {
          const value = row[field as keyof typeof row] ?? "";
          return `"${String(value).replace(/"/g, '""')}"`;
        })
        .join(",")
    ),
  ];

  const blob = new Blob([csvRows.join("\n")], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = window.document.createElement("a");

  link.href = url;
  link.setAttribute("download", "inkbound-auction-winners.csv");

  window.document.body.appendChild(link);
  link.click();
  window.document.body.removeChild(link);

  URL.revokeObjectURL(url);
};


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

            if (normalized.title && !normalized.bookTitle && activeTab !== "new_releases") {
              normalized.bookTitle = normalized.title;
            }
            if (normalized.author && !normalized.name && activeTab !== "new_releases") {
              normalized.name = normalized.author;
            }
            if (normalized.cover && !normalized.image && activeTab !== "new_releases") {
              normalized.image = normalized.cover;
            }

            if (activeTab === "new_releases") {
              if (normalized.date && !normalized.releaseDate) normalized.releaseDate = normalized.date;
              normalized.preorder = toBool(normalized.preorder);
              if (normalized.link) normalized.link = normalizeUrl(normalized.link);
              if (normalized.image && !normalized.cover) normalized.cover = normalized.image;
            } else if (activeTab === "creatives") {
              if (normalized.website) normalized.website = normalizeUrl(normalized.website);
              normalized.openToCollabs = toBool(normalized.openToCollabs);
              normalized.featuredWhere = normalized.featuredWhere || "website";
              if (normalized.image && !normalized.exampleImageUrl) {
                normalized.exampleImageUrl = normalized.image;
              }
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
                createdAt: serverTimestamp(),
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

      let fieldName = "image";
      if (activeTab === "new_releases") fieldName = "cover";
      if (activeTab === "creatives") fieldName = "exampleImageUrl";
      if (activeTab === "auction_items") fieldName = "imageUrl";

      setFormData((prev: any) => ({ ...prev, [fieldName]: url }));
    } catch (err) {
      console.error(err);
      alert("Upload failed. Check Storage rules and try again.");
    } finally {
      setImageUploading(false);
    }
  };

  const handleEdit = (entry: any) => {
    setFormData(entry);
    setEditingId(entry.id || null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    const ok = confirm("Delete this entry? This cannot be undone.");
    if (!ok) return;

    await deleteDoc(doc(db, activeTab, id));
    await fetchActiveTab();
  };

  const filteredEntries = useMemo(() => {
    if (!search.trim()) return entries;

    const q = search.toLowerCase();

    return entries.filter((e) =>
      Object.values(e)
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [entries, search]);

  if (!user) {
    return (
      <div className="p-6 text-center">
        <p>🔐 Login required to access dashboard.</p>
        <button onClick={handleLogin} className="bg-gold text-black px-4 py-2 mt-4 rounded">
          Login with Google
        </button>
      </div>
    );
  }

  if (user.uid !== ADMIN_UID) {
    return <div className="p-6">⛔ Not authorized.</div>;
  }

  const previewUrl =
    activeTab === "creatives"
      ? formData.exampleImageUrl
      : activeTab === "auction_items"
      ? formData.imageUrl
      : formData.image || formData.cover;

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
              setFormData(tab.key === "auction_items" ? { status: "upcoming", startingBid: 5, currentBid: 5, order: entries.length + 1 } : {});
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
          <div>
            <label htmlFor="quest-title" className="block text-sm mb-1">
              Quest Title
            </label>
            <input
              id="quest-title"
              className="border p-2 text-black w-full"
              placeholder="Quest Title"
              value={formData.title || ""}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="quest-start" className="block text-sm mb-1">
              Start Date
            </label>
            <input
              id="quest-start"
              type="date"
              className="border p-2 text-black w-full"
              value={formData.startDate || ""}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="quest-desc" className="block text-sm mb-1">
              Markdown Description
            </label>
            <textarea
              id="quest-desc"
              className="border p-2 min-h-[140px] text-black w-full"
              placeholder="Use **Markdown** here…"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
            <ReactMarkdown>{formData.description || "_No description yet._"}</ReactMarkdown>
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
                      checked={!!formData.preorder}
                      onChange={(e) => setFormData({ ...formData, preorder: e.target.checked })}
                      className="mr-1"
                    />
                    <span className="text-sm">Preorder available</span>
                  </label>
                ) : field === "openToCollabs" ? (
                  <label className="flex items-center gap-2 bg-black/20 border border-gray-700 rounded p-2">
                    <input
                      type="checkbox"
                      checked={!!formData.openToCollabs}
                      onChange={(e) => setFormData({ ...formData, openToCollabs: e.target.checked })}
                      className="mr-1"
                    />
                    <span className="text-sm">Open to collaborations</span>
                  </label>
                ) : field === "featuredWhere" ? (
                  <select
                    id={`field-${field}`}
                    className="border p-2 w-full text-black"
                    value={formData.featuredWhere || "website"}
                    onChange={(e) => setFormData({ ...formData, featuredWhere: e.target.value })}
                  >
                    <option value="website">Website</option>
                    <option value="discord">Discord</option>
                    <option value="both">Both</option>
                  </select>
                ) : field === "status" && isAuctionTab ? (
                  <select
                    id={`field-${field}`}
                    className="border p-2 w-full text-black"
                    value={formData.status || "upcoming"}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    {AUCTION_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                ) : field === "description" || field === "blurb" || field === "offers" || field === "shortDescription" ? (
                  <textarea
                    id={`field-${field}`}
                    className="border p-2 w-full text-black min-h-[110px]"
                    placeholder={FIELD_LABELS[field] || field}
                    value={(formData[field] as string) || ""}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                  />
                ) : field === "releaseDate" ? (
                  <input
                    id={`field-${field}`}
                    type="date"
                    className="border p-2 w-full text-black"
                    value={(formData.releaseDate as string) || ""}
                    onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                  />
                ) : field === "startingBid" || field === "value" || field === "currentBid" || field === "order" ? (
                  <input
                    id={`field-${field}`}
                    type="number"
                    className="border p-2 w-full text-black"
                    placeholder={FIELD_LABELS[field] || field}
                    value={formData[field] ?? ""}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setFormData((prev: any) => {
                        const next = { ...prev, [field]: value };
                        if (field === "startingBid" && !prev.currentBid) {
                          next.currentBid = value;
                        }
                        return next;
                      });
                    }}
                  />
                ) : field === "link" || field === "website" ? (
                  <input
                    id={`field-${field}`}
                    className="border p-2 w-full text-black"
                    placeholder={FIELD_LABELS[field] || field}
                    value={(formData[field] as string) || ""}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    onBlur={(e) => {
                      const fixed = normalizeUrl(e.target.value);
                      if (fixed !== e.target.value) {
                        setFormData((prev: any) => ({ ...prev, [field]: fixed }));
                      }
                    }}
                  />
                ) : (
                  <input
                    id={`field-${field}`}
                    className="border p-2 w-full text-black"
                    placeholder={FIELD_LABELS[field] || field}
                    value={(formData[field] as string) || ""}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
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

            {(visibleFields.includes("image") ||
              visibleFields.includes("cover") ||
              visibleFields.includes("exampleImageUrl") ||
              visibleFields.includes("imageUrl")) && (
              <div className="md:col-span-2">
                <label htmlFor="image-file" className="block text-sm mb-1">
                  Upload Image
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

            {!isAuctionTab && (
              <label className="col-span-full flex items-center gap-2">
                <input
                  id="published"
                  type="checkbox"
                  checked={!!formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="mr-1"
                />
                <span>Published</span>
              </label>
            )}

            <div className="col-span-full flex gap-2">
              <button onClick={handleSubmit} className="bg-green-700 text-white px-4 py-2 rounded">
                {editingId ? "Update Entry" : isAuctionTab ? "Add Auction Lot" : "Add Entry"}
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

       {!isQuestTab && (
  <div className="mb-6 space-y-3">
    {isAuctionTab && (
      <button
        onClick={exportAuctionWinnersCSV}
        className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Export Winners CSV
      </button>
    )}

    <div>
      <label className="block mb-1 text-sm font-semibold">
        📥 Bulk Upload CSV
      </label>

      <input
        type="file"
        accept=".csv"
        onChange={handleBulkUpload}
        className="mb-2"
      />

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
  </div>
)}
          {filteredEntries.map((entry) => {
            const isEditingThis = editingId === entry.id;

            return (
              <div
                key={entry.id}
                className={`border p-4 mb-2 rounded ${
                  isEditingThis ? "border-blue-600 bg-blue-900/20" : "border-gray-700"
                }`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="pr-4">
                    {visibleFields.map((field) => {
                      const val = entry[field];

                      if ((field === "image" || field === "cover" || field === "exampleImageUrl" || field === "imageUrl") && val) {
                        return (
                          <img
                            key={field}
                            src={val}
                            alt="preview"
                            className="w-24 mt-2 rounded border border-gray-700"
                          />
                        );
                      }

                      if (field === "preorder" || field === "openToCollabs") {
                        return (
                          <p key={field}>
                            <span className="text-gray-400 capitalize">{field}:</span>{" "}
                            {toBool(val) ? "Yes" : "No"}
                          </p>
                        );
                      }

                      return (
                        <p key={field}>
                          <span className="text-gray-400 capitalize">{field}:</span>{" "}
                          {val || val === 0 ? String(val) : "—"}
                        </p>
                      );
                    })}

                    <div className="mt-2 flex items-center gap-3 text-sm text-gray-400">
                      <span>
                        Updated:{" "}
                        {entry.updatedAt instanceof Timestamp
                          ? entry.updatedAt.toDate().toLocaleString()
                          : "—"}
                      </span>

                      {!isAuctionTab && (
                        <span
                          className={`px-2 py-0.5 rounded text-xs ${
                            entry.published
                              ? "bg-green-900/50 border border-green-700"
                              : "bg-gray-800 border border-gray-700"
                          }`}
                        >
                          {entry.published ? "Published" : "Draft"}
                        </span>
                      )}

                      {isAuctionTab && (
                        <span className="px-2 py-0.5 rounded text-xs bg-red-900/40 border border-red-700">
                          {entry.status || "upcoming"}
                        </span>
                      )}
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
                      onClick={() => entry.id && handleDelete(entry.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {isAuctionTab && (
                  <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-700 pt-4">
                    <button
                      onClick={() => openAuctionItem(entry.id)}
                      className="bg-green-700 text-white px-3 py-1 rounded"
                    >
                      Open Live
                    </button>

                    <button
                      onClick={() => setAuctionStatus(entry.id, "closed")}
                      className="bg-yellow-700 text-white px-3 py-1 rounded"
                    >
                      Close
                    </button>

                    <button
                      onClick={() => setAuctionStatus(entry.id, "paid")}
                      className="bg-blue-700 text-white px-3 py-1 rounded"
                    >
                      Mark Paid
                    </button>

                    <button
                      onClick={() => setAuctionStatus(entry.id, "released")}
                      className="bg-purple-700 text-white px-3 py-1 rounded"
                    >
                      Mark Released
                    </button>

                    <button
                      onClick={() => resetAuctionBid(entry)}
                      className="bg-gray-700 text-white px-3 py-1 rounded"
                    >
                      Reset Bid
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}