export default function AboutPage() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 max-w-3xl mx-auto">
        {/* Profile Image */}
        <img
          src="/images/amanda.png"
          alt="Amanda Kilkenny"
          className="w-40 h-40 rounded-full object-cover mb-4 border-4 border-amber-500 shadow-lg"
        />
  
        <h2 className="text-amber-400 text-lg font-medium mb-6">
          Amanda Kilkenny · Founder of Inkbound
        </h2>
  
        <h1 className="text-5xl font-light mb-6 text-amber-500 text-glow">
          About the Inkbound Society
        </h1>
  
        <p className="text-lg text-gray-300 mb-6 leading-relaxed">
          Inkbound Bookshop is a real-world haven for stories and storytellers,
          tucked away in the heart of Gort, Co. Galway. Founded by me — Amanda,
          a lifelong local from the Ardrahan–Peterswell area — Inkbound is the
          kind of space I always wished existed growing up. Despite Gort’s deep
          literary ties (WB Yeats, anyone?), it never had a bookshop. I wanted to
          change that.
        </p>
  
        <p className="text-lg text-gray-300 mb-6 leading-relaxed">
          Since I was a child, I’ve dreamed of creating a bookshop that felt like
          stepping through a portal — a place where magic lives on every shelf.
          Books have always been my way into other worlds, and Inkbound is my way
          of bringing those worlds to life for others.
        </p>
  
        <p className="text-lg text-gray-400 mb-6 leading-relaxed">
          We champion indie authors, celebrate the self-published and the strange,
          and build a community where no reader or writer is left out. Here,
          stories are currency, quests are real, and every book has the potential
          to change someone’s world.
        </p>
  
        <p className="italic text-amber-400 mt-4">
          “From a girl who grew up with no bookshop - to a woman who built one”
        </p>
      </div>
    );
  }
  