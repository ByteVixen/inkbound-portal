// ✅ FamiliarContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type FamiliarKey = "raven" | "fox" | "cat" | "wolf" | "rabbit";

export interface Familiar {
  name: string;
  icon: string;
  whispers: string[];
}

export const familiars: Record<FamiliarKey, Familiar> = {
  raven: {
    name: "Raven",
    icon: "/familiars/raven.png",
    whispers: [
      "Beware the shelf that hums with ink…",
      "Quills remember more than you know.",
      "Watch the moon for signs of binding.",
      "Three knocks means turn back… or forward.",
      "What flies by night whispers by day.",
      "Ink runs cold when danger nears.",
      "Not all pages are meant to be turned.",
      "Echoes in libraries aren't always echoes.",
      "You were expected—centuries ago.",
      "Never trust a bookmark left behind.",
    ],
  },
  fox: {
    name: "Fox",
    icon: "/familiars/fox.png",
    whispers: [
      "Secrets hide where footsteps fade…",
      "Clever minds leave crooked trails.",
      "Not all tricks are traps. Some are doors.",
      "Follow the wind, not the path.",
      "Tail flicks twice? Something’s coming.",
      "Every lie has a truth-shaped shadow.",
      "If you smell fire, you're not lost.",
      "Speak softly to statues—they listen.",
      "Mirrors aren't always reflections.",
      "Ink stains are just paw prints in disguise.",
    ],
  },
  cat: {
    name: "Cat",
    icon: "/familiars/cat.png",
    whispers: [
      "Curiosity opens forgotten doors…",
      "Beware closed rooms with open windows.",
      "Purring means it’s watching.",
      "Wander. Linger. Vanish. Repeat.",
      "Magic prefers those who nap often.",
      "If the candle flickers, stay still.",
      "Nine lives, nine lessons, none shared.",
      "She left a claw mark on destiny.",
      "Don't chase. Lure.",
      "Follow meow, not logic.",
    ],
  },
  wolf: {
    name: "Wolf",
    icon: "/familiars/wolf.png",
    whispers: [
      "The lone path often leads to power…",
      "Howl only if you’re willing to be heard.",
      "Moonlight sharpens more than fangs.",
      "The pack watches from between the trees.",
      "Don't run. Walk with intention.",
      "The scent of change is on the wind.",
      "Your voice is stronger than silence.",
      "Let instinct be your lantern.",
      "Some bonds can't be unbitten.",
      "You're not alone, even when you are.",
    ],
  },
  rabbit: {
    name: "Rabbit",
    icon: "/familiars/rabbit.png",
    whispers: [
      "Time bends in the warren of wonder…",
      "Fall deeper. That's where it begins.",
      "Don't look back after the third turn.",
      "Burrows are memories disguised as escape routes.",
      "A twitch means go. Two means hide.",
      "Wiggle your nose. Doors might answer.",
      "Every garden has a guardian.",
      "Wonderland isn’t a place—it’s a question.",
      "Patience is faster than panic.",
      "Leap before you think. Just once.",
    ],
  },
};

interface FamiliarContextType {
  selected: FamiliarKey | null;
  setSelected: (key: FamiliarKey | null) => void;
}

const FamiliarContext = createContext<FamiliarContextType>({
  selected: null,
  setSelected: () => {},
});

export const useFamiliar = () => useContext(FamiliarContext);

export const FamiliarProvider = ({ children }: { children: ReactNode }) => {
  const [selected, setSelected] = useState<FamiliarKey | null>(
    localStorage.getItem("familiar") as FamiliarKey | null
  );

  useEffect(() => {
    if (selected) {
      localStorage.setItem("familiar", selected);
    } else {
      localStorage.removeItem("familiar");
    }
  }, [selected]);

  return (
    <FamiliarContext.Provider value={{ selected, setSelected }}>
      {children}
      {selected && <FamiliarSprite familiar={familiars[selected]} />}
    </FamiliarContext.Provider>
  );
};

const FamiliarSprite = ({ familiar }: { familiar: Familiar }) => {
  const { setSelected } = useFamiliar();
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [showWhisper, setShowWhisper] = useState(false);
  const [currentWhisper, setCurrentWhisper] = useState("");

  useEffect(() => {
    const whisperTimer = setInterval(() => {
      const random = familiar.whispers[Math.floor(Math.random() * familiar.whispers.length)];
      setCurrentWhisper(random);
      setShowWhisper(true);
      setTimeout(() => setShowWhisper(false), 6000);
    }, 18000);
    return () => clearInterval(whisperTimer);
  }, [familiar]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setOffset({ x: e.clientX - pos.x, y: e.clientY - pos.y });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (dragging) {
      setPos({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  };

  const handleMouseUp = () => setDragging(false);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

  return (
    <div className="fixed z-50 animate-fade-in" style={{ top: pos.y, left: pos.x }}>
      <div onMouseDown={handleMouseDown} className="relative w-24 h-24 cursor-move">
        <img
          src={familiar.icon}
          alt={familiar.name}
          className="w-full h-full drop-shadow-lg transition-transform duration-300 ease-out hover:scale-110"
        />
        <button
          onClick={() => {
            localStorage.removeItem("familiar");
            setSelected(null);
          }}
          className="absolute -top-2 -right-2 text-xs bg-black/80 border border-amber-500 text-amber-400 px-1 rounded-full shadow hover:bg-red-900 transition-all"
          title="Banish Familiar"
        >
          ✨
        </button>
      </div>
      {showWhisper && currentWhisper && (
        <div className="mt-2 text-xs text-amber-300 bg-black/70 px-3 py-1 rounded shadow backdrop-blur-md text-center max-w-[180px]">
          {currentWhisper}
        </div>
      )}
    </div>
  );
};

// ❌ No default export here!