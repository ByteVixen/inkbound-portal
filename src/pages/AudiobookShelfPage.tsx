// src/pages/AudiobookShelfPage.tsx
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import VantaBackground from "../components/VantaBackground";

interface Audiobook {
  id: string;
  bookTitle: string;
  name: string;
  narrator?: string;
  link?: string;
  image?: string;
}

type FirestoreAudiobook = {
  bookTitle?: string;
  name?: string;
  narrator?: string;
  link?: string;
  image?: string;
  published?: boolean;
  updatedAt?: any;
};

const AudiobookShelfPage: React.FC = () => {
  const [audiobooks, setAudiobooks] = useState<Audiobook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAudiobooks = async () => {
      setLoading(true);
      try {
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
        console.warn("Audiobooks index missing; falling back without orderBy.", err);
        try {
          const q2 = query(
            collection(db, "audiobooks"),
            where("published", "==", true)
          );
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
    <div className="relative min-h-screen overflow-hidden bg-[#050506] font-marcellus text-[#f5efe3]">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <VantaBackground />
      </div>

      {/* Ambient overlays */}
      <div className="pointer-events-none fixed inset-0 z-[1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,160,78,0.10),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(82,58,133,0.08),transparent_20%),radial-gradient(circle_at_20%_80%,rgba(13,30,66,0.10),transparent_24%)]" />
        <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[#c8a04e]/8 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-10">
        {/* Hero */}
        <div className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-black/25 px-6 py-10 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl md:px-10 md:py-14">
          <div className="mx-auto max-w-4xl text-center">
            <div className="text-xs uppercase tracking-[0.34em] text-[#c8a04e]">
              Narrator Pathway
            </div>

            <h1 className="mt-5 font-serif text-4xl leading-tight text-white md:text-6xl">
              Audiobook Shelf
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/68 md:text-lg">
              Explore indie audiobooks brought to life by talented narrators.
              Each listing links directly to where you can listen or buy.
            </p>
          </div>
        </div>

        {/* Content state */}
        <div className="mt-10">
          {loading ? (
            <div className="rounded-[1.8rem] border border-white/10 bg-white/5 px-6 py-10 text-center backdrop-blur-xl">
              <p className="text-base text-[#f6dca0]">Loading audiobooks…</p>
            </div>
          ) : audiobooks.length === 0 ? (
            <div className="rounded-[1.8rem] border border-white/10 bg-white/5 px-6 py-10 text-center backdrop-blur-xl">
              <p className="text-base italic text-white/55">
                No audiobooks available yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {audiobooks.map((book) => {
                const card = (
                  <article className="group flex h-full flex-col overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#c8a04e]/25 hover:bg-white/[0.07]">
                    <div className="relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-black/35">
                      {book.image ? (
                        <img
                          src={book.image}
                          alt={book.bookTitle}
                          className="h-72 w-full object-cover transition duration-500 group-hover:scale-[1.015]"
                        />
                      ) : (
                        <div className="flex h-72 w-full items-center justify-center px-6 text-center text-sm text-white/35">
                          No cover available
                        </div>
                      )}
                    </div>

                    <div className="mt-5 flex flex-1 flex-col">
                      <div className="text-[0.68rem] uppercase tracking-[0.24em] text-[#c8a04e]">
                        Audiobook
                      </div>

                      <h2 className="mt-2 text-2xl leading-tight text-white">
                        {book.bookTitle}
                      </h2>

                      <p className="mt-2 text-sm italic text-white/58">
                        by {book.name}
                      </p>

                      {book.narrator && (
                        <p className="mt-2 text-sm text-[#f6dca0]/85">
                          Narrated by {book.narrator}
                        </p>
                      )}

                      {book.link && (
                        <div className="mt-5">
                          <span className="inline-flex rounded-full border border-[#c8a04e]/30 bg-[#c8a04e]/10 px-4 py-2 text-sm text-[#f6dca0] transition group-hover:border-[#c8a04e]/50 group-hover:bg-[#c8a04e]/15 group-hover:text-white">
                            Listen / Buy
                          </span>
                        </div>
                      )}
                    </div>
                  </article>
                );

                return book.link ? (
                  <a
                    key={book.id}
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    {card}
                  </a>
                ) : (
                  <div key={book.id}>{card}</div>
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