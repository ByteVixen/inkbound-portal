import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase"; // adjust path if needed

type Whisper = {
  id: string;
  text: string;
  createdAt: any;
};

export default function WhisperFeed() {
  const [whispers, setWhispers] = useState<Whisper[]>([]);

  useEffect(() => {
    const q = query(collection(db, "whispers"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const newWhispers = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Whisper)
      );
      setWhispers(newWhispers);
    });

    return () => unsub();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-4 px-4">
      <h2 className="text-2xl text-center font-semibold text-amber-400 mb-4 font-marcellus">
        📜 The Whisper Feed
      </h2>

      {whispers.length === 0 && (
        <p className="text-center text-white/60 italic">The fog is still listening...</p>
      )}

      {whispers.map((whisper) => (
        <div
          key={whisper.id}
          className="bg-white/5 border border-white/10 rounded-xl p-4 text-white shadow-md backdrop-blur-md animate-fadeIn"
        >
          <p className="text-amber-300 italic">"{whisper.text}"</p>
        </div>
      ))}
    </div>
  );
}
