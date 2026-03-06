import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { newsletterIssues } from "../data/newsletterIssues";
import NewspaperPressIntro from "../components/newsletter/NewspaperPressIntro";
import PdfFlipBook from "../components/newsletter/PdfFlipBook";

export default function NewsletterIssue() {
  const { slug } = useParams();
  const introKey = `inkbound-newsletter-intro-${slug}`;

  const [showIntro, setShowIntro] = useState(() => {
    return sessionStorage.getItem(introKey) !== "done";
  });

  const issue = useMemo(
    () => newsletterIssues.find((item) => item.slug === slug),
    [slug]
  );

  if (!issue) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16 text-white">
        <h1 className="mb-4 text-3xl font-semibold">Issue not found</h1>
        <Link to="/newsletter" className="underline">
          Back to archive
        </Link>
      </div>
    );
  }

  return (
    <>
      {showIntro && (
        <NewspaperPressIntro
          coverImage={issue.coverImage}
          onComplete={() => {
            sessionStorage.setItem(introKey, "done");
            setShowIntro(false);
          }}
        />
      )}

      <main
        className={`mx-auto max-w-7xl px-4 py-10 text-white transition-opacity duration-700 ${
          showIntro ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] opacity-70">
              {issue.issueNumber}
            </p>
            <h1 className="text-4xl font-semibold">{issue.title}</h1>
            <p className="opacity-80">{issue.dateLabel}</p>

            {issue.description && (
              <p className="mt-3 max-w-2xl opacity-75">{issue.description}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={issue.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white/40 hover:bg-white/10"
            >
              Open PDF
            </a>

            <a
              href={issue.pdfUrl}
              download
              className="rounded-full bg-white px-4 py-2 text-black transition hover:bg-white/90"
            >
              Download Issue
            </a>

            <Link
              to="/newsletter"
              className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white/40 hover:bg-white/10"
            >
              Back to Archive
            </Link>
          </div>
        </div>

        <PdfFlipBook pdfUrl={issue.pdfUrl} title={issue.title} />
      </main>
    </>
  );
}