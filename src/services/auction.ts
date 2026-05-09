import {
  collection,
  addDoc,
  doc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  runTransaction,
} from "firebase/firestore";
import { db } from "../firebase";

export type AuctionStatus =
  | "upcoming"
  | "live"
  | "closed"
  | "paid"
  | "released";

export type AuctionItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  donorName: string;
  startingBid: number;
  value: number;
  currentBid: number;
  currentBidderName?: string;
  currentBidderEmail?: string;
  currentBidderHandle?: string;
  status: AuctionStatus;
  order: number;
};

export function listenAuctionItems(callback: (items: AuctionItem[]) => void) {
  const q = query(collection(db, "auction_items"), orderBy("order", "asc"));

  return onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as AuctionItem[];

    callback(items);
  });
}

export async function createAuctionItem(item: Omit<AuctionItem, "id">) {
  return addDoc(collection(db, "auction_items"), {
    ...item,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateAuctionItemStatus(
  itemId: string,
  status: AuctionStatus
) {
  const itemRef = doc(db, "auction_items", itemId);

  return updateDoc(itemRef, {
    status,
    updatedAt: serverTimestamp(),
  });
}

export async function placeBid({
  itemId,
  bidderName,
  bidderEmail,
  bidderHandle,
  amount,
}: {
  itemId: string;
  bidderName: string;
  bidderEmail: string;
  bidderHandle?: string;
  amount: number;
}) {
  const itemRef = doc(db, "auction_items", itemId);

  await runTransaction(db, async (transaction) => {
    const itemSnap = await transaction.get(itemRef);

    if (!itemSnap.exists()) {
      throw new Error("Auction item not found.");
    }

    const item = itemSnap.data() as AuctionItem;

    if (item.status !== "live") {
      throw new Error("This item is not currently open for bidding.");
    }

    const currentBid = Number(item.currentBid || item.startingBid || 0);

    if (amount <= currentBid) {
      throw new Error(`Your bid must be higher than €${currentBid}.`);
    }

   transaction.update(itemRef, {
  currentBid: amount,
  currentBidderName: bidderName,
  currentBidderEmail: bidderEmail,
  currentBidderHandle: bidderHandle || "",
  updatedAt: serverTimestamp(),
});

    const bidRef = doc(collection(db, "auction_bids"));

    transaction.set(bidRef, {
      itemId,
      bidderName,
      bidderEmail,
      bidderHandle: bidderHandle || "",
      amount,
      createdAt: serverTimestamp(),
    });
  });
}