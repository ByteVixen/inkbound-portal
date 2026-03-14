import { useEffect, useMemo, useState, forwardRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

type Props = {
  pdfUrl: string;
  title: string;
};

type RenderedPage = {
  pageNumber: number;
  imageUrl: string;
};

type FlipPageProps = {
  pageNumber: number;
  imageUrl: string;
  isCover?: boolean;
  title: string;
};

const FlipPage = forwardRef<HTMLDivElement, FlipPageProps>(
  ({ pageNumber, imageUrl, isCover = false, title }, ref) => {
    return (
      <div
        ref={ref}
        className={`pdf-flip-page ${isCover ? "pdf-flip-page--cover" : ""}`}
      >
        <div className="pdf-flip-page__inner">
          <img
            src={imageUrl}
            alt={`${title} page ${pageNumber}`}
            className="pdf-flip-page__image"
          />

          {!isCover && (
            <div className="pdf-flip-page__number">{pageNumber}</div>
          )}

          {isCover && (
            <div className="pdf-flip-page__label">{title}</div>
          )}
        </div>
      </div>
    );
  }
);

FlipPage.displayName = "FlipPage";

export default function PdfFlipBook({ pdfUrl, title }: Props) {
  const [pages, setPages] = useState<RenderedPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let objectUrls: string[] = [];

    async function renderPdfToImages() {
      try {
        setLoading(true);
        setError(null);
        setPages([]);

        const loadingTask = pdfjs.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;

        const renderedPages: RenderedPage[] = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);

          const viewport = page.getViewport({ scale: 1.6 });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          
          if (!context) {
            throw new Error("Could not create canvas context.");
          }
          
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          
          await page.render({
            canvas,
            canvasContext: context,
            viewport,
          }).promise;

          const blob: Blob | null = await new Promise((resolve) =>
            canvas.toBlob(resolve, "image/jpeg", 0.92)
          );

          if (!blob) {
            throw new Error(`Failed to render page ${i}.`);
          }

          const imageUrl = URL.createObjectURL(blob);
          objectUrls.push(imageUrl);

          renderedPages.push({
            pageNumber: i,
            imageUrl,
          });
        }

        if (!cancelled) {
          setPages(renderedPages);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          setError("Failed to render this issue.");
          setLoading(false);
        }
      }
    }

    renderPdfToImages();

    return () => {
      cancelled = true;
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [pdfUrl]);

  const hasPages = useMemo(() => pages.length > 0, [pages]);

  if (loading) {
    return <div className="pdf-flipbook-status">Loading issue...</div>;
  }

  if (error) {
    return <div className="pdf-flipbook-status">{error}</div>;
  }

  if (!hasPages) {
    return <div className="pdf-flipbook-status">No pages found.</div>;
  }

  return (
    <div className="pdf-flipbook-wrap">
      <HTMLFlipBook
  key={`${pdfUrl}-${pages.length}`}
  width={520}
  height={720}
  minWidth={280}
  maxWidth={1000}
  minHeight={360}
  maxHeight={1400}
  size="stretch"
  startPage={0}
  drawShadow={true}
  flippingTime={900}
  usePortrait={true}
  startZIndex={0}
  autoSize={true}
  maxShadowOpacity={0.25}
  showCover={true}
  mobileScrollSupport={true}
  swipeDistance={30}
  clickEventForward={true}
  useMouseEvents={true}
  showPageCorners={true}
  disableFlipByClick={false}
  className="inkbound-flipbook"
  style={{ margin: "0 auto" }}
>
{pages.map((page) => (
  <FlipPage
    key={`${pdfUrl}-${page.pageNumber}`}
    pageNumber={page.pageNumber}
    imageUrl={page.imageUrl}
    isCover={page.pageNumber === 1}
    title={title}
  />
))}
      </HTMLFlipBook>
    </div>
  );
}