// src/pages/AudiobookShelfPage.tsx
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import VantaBackground from "../components/VantaBackground";

interface Audiobook {
  id: string;
  bookTitle: string;
  name: string; // author
  narrator?: string;
  link?: string;
  image?: string;
}

type FirestoreAudiobook = {
  bookTitle?: string;
  name?: string; // author
  narrator?: string;
  link?: string;
  image?: string;
  published?: boolean;
  updatedAt?: any; // Firestore Timestamp
};

const AudiobookShelfPage: React.FC = () => {
  const [audiobooks, setAudiobooks] = useState<Audiobook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAudiobooks = async () => {
      setLoading(true);
      try {
        // Preferred query (needs composite index: published ASC, updatedAt DESC)
        const q1 = query(
          collection(db, "audiobooks"),
          where("published", "==", true),
          orderBy("updatedAt", "desc")
        );
        const snapshot = await getDocs(q1);

        const data: Audiobook[] = snapshot.docs.map((doc) => {
          const d = doc.data() as FirestoreAudiobook;
          return {
            id: doc.id,
            bookTitle: d.bookTitle ?? "Untitled",
            name: d.name ?? "Unknown Author",
            narrator: d.narrator,
            link: d.link,
            image: d.image,
          };
        });

        setAudiobooks(data);
      } catch (err) {
        // Index missing → fallback without orderBy; sort locally by updatedAt desc
        console.warn("Audiobooks index missing; falling back without orderBy.", err);
        try {
          const q2 = query(collection(db, "audiobooks"), where("published", "==", true));
          const snapshot = await getDocs(q2);

          const mapped = snapshot.docs.map((doc) => {
            const d = doc.data() as FirestoreAudiobook;
            const ts =
              d.updatedAt && typeof d.updatedAt.toMillis === "function"
                ? d.updatedAt.toMillis()
                : 0;

            return {
              id: doc.id,
              bookTitle: d.bookTitle ?? "Untitled",
              name: d.name ?? "Unknown Author",
              narrator: d.narrator,
              link: d.link,
              image: d.image,
              _ts: ts,
            };
          });

          mapped.sort((a, b) => b._ts - a._ts);
          setAudiobooks(mapped.map(({ _ts, ...rest }) => rest as Audiobook));
        } catch (fallbackErr) {
          console.error("Error fetching audiobooks (fallback):", fallbackErr);
          setAudiobooks([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAudiobooks();
  }, []);

  return (
    <div className="relative min-h-screen font-marcellus text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 py-20 px-4 flex items-center justify-center">
        <div className="bg-black/60 backdrop-blur-md p-8 rounded-xl shadow-xl max-w-7xl w-full text-center">
          <h1 className="text-4xl font-light mb-6 text-amber-400">🎧 Audiobook Shelf</h1>
          <p className="text-lg text-gray-300 mb-12">
            Explore indie audiobooks brought to life by talented narrators. Each listing links directly to where you can listen or buy.
          </p>

          {loading ? (
            <p className="text-gray-400 italic">Loading audiobooks…</p>
          ) : audiobooks.length === 0 ? (
            <p className="text-gray-400 italic">No audiobooks available yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-left">
              {audiobooks.map((book) => {
                const Card = (
                  <div className="bg-black/50 border border-amber-700 p-4 rounded-xl hover:shadow-xl hover:scale-105 transition duration-300">
                    {book.image ? (
                      <img
                        src={book.image}
                        alt={book.bookTitle}
                        className="w-full h-64 object-cover rounded mb-4"
                      />
                    ) : (
                      <div className="w-full h-64 flex items-center justify-center text-gray-500 border rounded mb-4">
                        No Cover
                      </div>
                    )}
                    <h2 className="text-xl text-amber-300 font-semibold mb-1">
                      {book.bookTitle}
                    </h2>
                    <p className="text-sm text-gray-400 italic mb-1">by {book.name}</p>
                    {book.narrator && (
                      <p className="text-xs text-gray-500">Narrated by {book.narrator}</p>
                    )}
                  </div>
                );

                // Only wrap with <a> if a valid link exists
                return book.link ? (
                  <a
                    key={book.id}
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {Card}
                  </a>
                ) : (
                  <div key={book.id}>{Card}</div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudiobookShelfPage;
