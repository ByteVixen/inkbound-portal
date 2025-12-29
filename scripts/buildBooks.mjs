import fs from "node:fs";
import { parse } from "csv-parse/sync";

// INPUT / OUTPUT
const csvPath = "./submissions.csv";
const outPath = "./src/books.ts";

// ---------- read + parse ----------
let csv = fs.readFileSync(csvPath, "utf8");

// Strip UTF-8 BOM if present
csv = csv.replace(/^\uFEFF/, "");

const rows = parse(csv, {
  columns: true,
  skip_empty_lines: true,
  bom: true,
  relax_quotes: true,
  relax_column_count: true,
  trim: true,
});

console.log("CSV headers detected:", Object.keys(rows[0] || {}));

// ---------- helpers ----------
function safeUrl(u = "") {
  u = String(u).trim();
  if (!u) return "";
  if (/^https?:\/\//i.test(u)) return u;
  return `https://${u}`;
}

function splitList(s = "") {
  return String(s)
    .split(/[,•\n]/g)
    .map((x) => x.trim())
    .filter(Boolean);
}

function normGenre(g = "") {
  const s = String(g).trim();
  if (!s) return "";
  if (/^sci[\s-]?fi$/i.test(s)) return "Sci-Fi";
  if (/^(ya|young adult)$/i.test(s)) return "YA";
  if (/^dark romance$/i.test(s)) return "Dark Romance";
  return s.replace(/\s+/g, " ");
}

function cleanText(s = "") {
  const t = String(s || "")
    .replace(/^\uFEFF/, "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return t || "";
}

function pick(row, candidates) {
  for (const key of candidates) {
    if (row[key] != null && String(row[key]).trim() !== "") {
      return String(row[key]).trim();
    }
  }
  return "";
}

// ---------- map rows -> Book ----------
const books = rows.map((r, idx) => {
  // Exact headers from your Tally export:
  const title = pick(r, ["Book Title"]);
  const author = pick(r, ["Author / Pen Name"]);
  const socials = pick(r, ["Socials Username"]);

  const series =
    pick(r, ["Series Information"]) ||
    pick(r, ["If part of a series, please list:"]);

  const genresRaw = pick(r, ["Primary Genre(s)"]);
  const otherGenre = pick(r, ["Untitled short answer field"]); // "Other" genre free text (as exported)

  const blurb = cleanText(pick(r, ["Book Blurb"]));
  const hook = cleanText(pick(r, ["One-Line Hook"]));

  const repsRaw = pick(r, ["Representation(s) in This Book"]);
  const spice = pick(r, ["Spice Level"]);
  const contentLevel = pick(r, ["Content Level"]);
  const warnings = cleanText(pick(r, ["Content Warnings"]));

  const amazon = safeUrl(pick(r, ["Amazon Universal Link"]));
  const kobo = safeUrl(pick(r, ["Kobo Universal Link"]));

  const links = [
    amazon ? { label: "Amazon", url: amazon } : null,
    kobo ? { label: "Kobo", url: kobo } : null,
  ].filter(Boolean);

  const genres = splitList(genresRaw).map(normGenre).filter(Boolean);

  return {
    id: pick(r, ["Submission ID"]) || `book-${idx + 1}`,
    title,
    author,
    socials: socials || undefined,
    series: series || undefined,

    genres: genres.length ? genres : ["Other"],
    otherGenre: otherGenre || undefined,

    blurb: blurb || undefined,
    hook: hook || undefined,

    reps: splitList(repsRaw),
    spice: spice || undefined,
    contentLevel: contentLevel || undefined,
    warnings: warnings || undefined,

    links,
  };
});

// ---------- sanity checks ----------
const missingTitle = books.filter((b) => !b.title).length;
const missingAuthor = books.filter((b) => !b.author).length;
const missingLinks = books.filter((b) => !b.links?.length).length;

// ---------- write TS output ----------
const content = `// AUTO-GENERATED from submissions.csv
// Run: npm run build:books
export const BOOKS = ${JSON.stringify(books, null, 2)} as const;

export type Book = (typeof BOOKS)[number];

// Sanity stats (at generation time):
// total=${books.length}, missingTitle=${missingTitle}, missingAuthor=${missingAuthor}, missingLinks=${missingLinks}
`;

fs.writeFileSync(outPath, content, "utf8");

console.log(`✅ Wrote ${books.length} books -> ${outPath}`);
console.log(
  `ℹ️ Missing: title=${missingTitle}, author=${missingAuthor}, links=${missingLinks}`
);
