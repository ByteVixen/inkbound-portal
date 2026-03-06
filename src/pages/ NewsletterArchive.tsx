import { Link } from "react-router-dom";
import { newsletterIssues } from "../data/newsletterIssues";

export default function NewsletterArchive() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 text-white">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.35em] opacity-70">
          Archive
        </p>
        <h1 className="text-4xl font-semibold">The Inkbound Times</h1>
        <p className="mt-2 max-w-2xl opacity-80">
          Open each issue as a collectible digital edition, then read or download the full paper.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {newsletterIssues.map((issue) => (
         <Link
         key={issue.slug}
         to={issue.slug}
         className="group block"
       
          >
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition-transform duration-300 group-hover:-translate-y-1">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={issue.coverImage}
                  alt={`${issue.title} ${issue.issueNumber}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-4">
                <p className="text-xs uppercase tracking-[0.3em] opacity-60">
                  {issue.issueNumber}
                </p>
                <h2 className="mt-1 text-2xl font-semibold">{issue.title}</h2>
                <p className="mt-1 opacity-75">{issue.dateLabel}</p>
                {issue.description && (
                  <p className="mt-2 text-sm opacity-70">{issue.description}</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}