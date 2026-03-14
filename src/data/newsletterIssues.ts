export type NewsletterIssueData = {
    slug: string;
    title: string;
    issueNumber: string;
    dateLabel: string;
    coverImage: string;
    pdfUrl: string;
    description?: string;
  };
  
  export const newsletterIssues = [
    {
      slug: "issue-02",
      title: "The Inkbound Times",
      issueNumber: "Issue 02",
      dateLabel: "March 13, 2026",
      coverImage: "/newsletter/covers/issue-02.jpg",
      pdfUrl: "/newsletter/issues/inkbound-times-issue-02.pdf",
      description: "Issue two of the Inkbound Times featuring community news, new releases, and event highlights."
    },
    {
      slug: "issue-01",
      title: "The Inkbound Times",
      issueNumber: "Issue 01",
      dateLabel: "March 6, 2026",
      coverImage: "/newsletter/covers/issue-01.jpg",
      pdfUrl: "/newsletter/issues/inkbound-times-issue-01.pdf",
      description: "Inkbound announces the Indie Summit, Inkbound Studios launches, and spotlights authors and narrators."
    }
  ];