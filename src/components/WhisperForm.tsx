import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function WhisperForm() {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const submitWhisper = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setSending(true);
    await addDoc(collection(db, "whispers"), {
      text,
      createdAt: serverTimestamp(),
    });
    setText("");
    setSending(false);
  };

  return (
    <form
      onSubmit={submitWhisper}
      className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 max-w-xl mx-auto mt-8 shadow-md"
    >
      <h2 className="text-2xl font-bold text-amber-400 mb-4">Whisper into the Fog</h2>
      <textarea
        maxLength={280}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Your whisper goes here..."
        className="w-full p-3 rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/40 resize-none focus:outline-none focus:ring focus:ring-amber-500"
        rows={4}
      />
      <button
        type="submit"
        disabled={sending}
        className="mt-4 px-6 py-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-full transition disabled:opacity-50"
      >
        {sending ? "Sending..." : "Submit Whisper"}
      </button>
    </form>
  );
}
