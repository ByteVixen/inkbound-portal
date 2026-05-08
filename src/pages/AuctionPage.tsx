// src/pages/AuctionPage.tsx
import { useEffect, useMemo, useState } from "react";
import {
  AuctionItem,
  listenAuctionItems,
  placeBid,
} from "../services/auction";

function getMinIncrement(currentBid: number) {
  if (currentBid < 50) return 2;
  if (currentBid < 100) return 5;
  return 10;
}

export default function AuctionPage() {
  const [items, setItems] = useState<AuctionItem[]>([]);

  useEffect(() => {
    return listenAuctionItems(setItems);
  }, []);

  const liveItems = items.filter((item) => item.status === "live");

  const upcoming = items.filter((item) => item.status === "upcoming");

  const closed = items.filter((item) =>
    ["closed", "paid", "released"].includes(item.status)
  );

  return (
    <main className="min-h-screen bg-black text-white px-4 py-10">
      <section className="max-w-7xl mx-auto space-y-10">
        <header className="text-center space-y-4">
          <p className="uppercase tracking-[0.4em] text-red-400 text-sm">
            Inkbound Live Auction
          </p>

          <h1 className="text-4xl md:text-7xl font-black">
            Bid For The Cause
          </h1>

          <p className="max-w-2xl mx-auto text-white/70">
            Place your bid live. Winners donate through GoFundMe and send proof
            before prizes are released.
          </p>
        </header>

      {liveItems.length > 0 ? (
  <section className="space-y-6">
    <div>
      <p className="uppercase tracking-[0.35em] text-red-300 text-sm">
        Live Now
      </p>
      <h2 className="text-3xl md:text-5xl font-black mt-2">
        Currently Open For Bidding
      </h2>
    </div>

    <div className="grid xl:grid-cols-2 gap-8">
      {liveItems.map((item) => (
        <LiveAuctionCard key={item.id} item={item} />
      ))}
    </div>
  </section>
) : (
  <section className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
    <p className="text-red-300 uppercase tracking-[0.3em] text-sm">
      Waiting Room
    </p>
    <h2 className="text-3xl font-bold mt-3">No lot is live yet.</h2>
    <p className="text-white/60 mt-2">
      Stay close. The next prize is being summoned.
    </p>
  </section>
)}

        <AuctionGrid title="Coming Up Next" items={upcoming} />

        <AuctionGrid title="Closed Lots" items={closed} />
      </section>
    </main>
  );
}

function LiveAuctionCard({ item }: { item: AuctionItem }) {
  const increment = getMinIncrement(Number(item.currentBid || 0));
  const minimumBid = Number(item.currentBid || 0) + increment;

  const [bidderName, setBidderName] = useState("");
  const [bidderEmail, setBidderEmail] = useState("");
  const [bidderHandle, setBidderHandle] = useState("");
  const [amount, setAmount] = useState(minimumBid);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setAmount(minimumBid);
  }, [minimumBid, item.id]);

  async function handleBid(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (Number(amount) < minimumBid) {
      setError(`Minimum bid is €${minimumBid}.`);
      return;
    }

    setSubmitting(true);

    try {
      await placeBid({
        itemId: item.id,
        bidderName,
        bidderEmail,
        bidderHandle,
        amount: Number(amount),
      });

      setSuccess("Bid placed. Watch your crown.");
    } catch (err: any) {
      setError(err.message || "Bid failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="rounded-[2rem] border border-red-500/40 bg-gradient-to-br from-red-950/40 via-black to-black p-5 md:p-8 shadow-2xl">
      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 items-start">
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full max-h-[600px] object-cover"
              />
            ) : (
              <div className="h-[420px] flex items-center justify-center text-white/40">
                No image added
              </div>
            )}

            <div className="absolute top-4 left-4 rounded-full bg-red-700 px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] animate-pulse">
              Live Now
            </div>
          </div>

          <p className="text-white/50 text-sm">
            Donated by <span className="text-white">{item.donorName}</span>
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <p className="uppercase tracking-[0.35em] text-red-300 text-sm">
              Currently Bidding
            </p>

            <h2 className="text-4xl md:text-6xl font-black mt-3">
              {item.title}
            </h2>

            <p className="text-white/70 mt-4 text-lg leading-relaxed">
              {item.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
  <p className="text-white/50">Estimated Value</p>

  <p className="text-5xl font-black mt-2 text-green-300">
    €{item.value}
  </p>
</div>
            <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
              <p className="text-white/50">Current highest bid</p>
              <p className="text-6xl font-black text-red-300 mt-2">
                €{item.currentBid || item.startingBid}
              </p>
            </div>

            <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
              <p className="text-white/50">Leading bidder</p>
              <p className="text-2xl font-bold mt-2">
                {item.currentBidderName || "No bids yet"}
              </p>
              <p className="text-white/40 text-sm mt-2">
                Minimum next bid: €{minimumBid}
              </p>
            </div>
          </div>

          <form
            onSubmit={handleBid}
            className="rounded-3xl border border-white/10 bg-black/50 p-5 space-y-4"
          >
            <h3 className="text-2xl font-bold">Place Your Bid</h3>

            <div className="grid md:grid-cols-2 gap-3">
              <input
                className="rounded-xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-red-400"
                placeholder="Your name"
                value={bidderName}
                onChange={(e) => setBidderName(e.target.value)}
                required
              />

              <input
                className="rounded-xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-red-400"
                placeholder="Email address"
                type="email"
                value={bidderEmail}
                onChange={(e) => setBidderEmail(e.target.value)}
                required
              />

              <input
                className="rounded-xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-red-400"
                placeholder="Discord / TikTok handle optional"
                value={bidderHandle}
                onChange={(e) => setBidderHandle(e.target.value)}
              />

              <input
                className="rounded-xl bg-white/10 border border-white/10 px-4 py-3 outline-none focus:border-red-400"
                type="number"
                min={minimumBid}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                required
              />
            </div>

            <button
              disabled={submitting}
              className="w-full rounded-xl bg-red-700 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-4 font-black text-lg"
            >
              {submitting ? "Placing Bid..." : `Bid €${amount}`}
            </button>

            {error && <p className="text-red-300">{error}</p>}
            {success && <p className="text-green-300">{success}</p>}

            <p className="text-white/40 text-xs leading-relaxed">
              Winning bidders must donate the final amount through the fundraiser
              link and send receipt/screenshot proof before prizes are released.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function AuctionGrid({
  title,
  items,
}: {
  title: string;
  items: AuctionItem[];
}) {
  if (!items.length) return null;

  return (
    <section>
      <h2 className="text-3xl font-black mb-4">{title}</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item) => (
          <AuctionPreviewCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

function AuctionPreviewCard({ item }: { item: AuctionItem }) {
  const statusLabel = useMemo(() => {
    if (item.status === "paid") return "Payment Confirmed";
    if (item.status === "released") return "Prize Released";
    if (item.status === "closed") return "Closed";
    return "Upcoming";
  }, [item.status]);

  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
      {item.imageUrl ? (
        <img
          src={item.imageUrl}
          alt={item.title}
          className="h-64 w-full object-cover"
        />
      ) : (
        <div className="h-64 bg-white/5 flex items-center justify-center text-white/40">
          No image
        </div>
      )}

      <div className="p-5 space-y-3">
        <p className="text-xs uppercase tracking-[0.25em] text-red-300">
          {statusLabel}
        </p>

        <h3 className="text-2xl font-bold">{item.title}</h3>

        <p className="text-white/60 line-clamp-3">{item.description}</p>
<div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-3">
  <div>
    <p className="text-white/40 text-sm">Value</p>
    <p className="text-2xl font-black text-green-300">
      €{item.value || 0}
    </p>
  </div>

  <div>
    <p className="text-white/40 text-sm">Current bid</p>
    <p className="text-2xl font-black text-red-300">
      €{item.currentBid || item.startingBid}
    </p>
  </div>
</div>
        
      </div>
    </article>
  );
}