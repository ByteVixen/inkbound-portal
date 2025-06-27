// src/pages/authors/AuthorHubPage.tsx

export default function AuthorHubPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-3xl mx-auto text-center">

          <h1 className="text-5xl font-light mb-6 text-amber-500 text-glow">
            Welcome to the Author Hub
          </h1>

          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            The Inkbound Society supports storytellers of all kinds — whether you're self-published, traditionally published, or just getting started.
          </p>

          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            From getting your book on our shelves to collaborating with narrators, bartering skills, or joining upcoming quests — this is your gateway into the Society’s author resources.
          </p>

          <div className="flex flex-col items-center space-y-4">
            <a
              href="/authors/consignment"
              className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transition"
            >
              Bookshop Consignment
            </a>

            <a
              href="#"
              className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-full shadow opacity-50 cursor-not-allowed"
            >
              Narrator Directory (Coming Soon)
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
