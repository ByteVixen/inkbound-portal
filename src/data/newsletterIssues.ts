export type NewsletterIssueData = {
    slug: string;
    title: string;
    issueNumber: string;
    dateLabel: string;
    coverImage: string;
    pdfUrl: string;
    description?: string;
  };
  
  export const newsletterIssues: NewsletterIssueData[] = [
    {
      slug: "issue-01",
      title: "The Inkbound Times",
      issueNumber: "Issue 01",
      dateLabel: "March 6, 2026",
      coverImage: "/newsletter/covers/issue-01.jpg",
      pdfUrl: "/newsletter/issues/inkbound-times-issue-01.pdf",
      description:
        "Inkbound announces the Indie Summit, Inkbound Studios launches, and spotlights authors, narrators, and ARC readers across the indie community."
    }
  ];