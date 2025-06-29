import { useState } from "react";
import { useFamiliar } from "../components/FamiliarContext";
import { familiars, FamiliarKey } from "../components/FamiliarContext";

const FamiliarSelector = () => {
  const { selected, setSelected } = useFamiliar();
  const [open, setOpen] = useState(false);

  const handleSelect = (key: FamiliarKey) => {
    setSelected(key);
    setOpen(false);
  };

  return (
    <div className="fixed top-24 right-4 z-50 flex flex-col items-end">
      {/* Toggle Summon Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-full bg-black/80 text-amber-300 border border-amber-400 px-3 py-2 text-xs shadow-md hover:bg-black hover:text-amber-200 transition-all backdrop-blur-md"
      >
        {selected ? "Change Familiar" : "🔮 Summon"}
      </button>

      {/* Familiar Menu */}
      {open && (
        <div className="mt-2 p-4 bg-black/90 rounded-xl shadow-xl border border-amber-500 backdrop-blur-lg animate-fade-in flex flex-wrap gap-4 w-[260px] justify-center max-w-[90vw]">
          {Object.entries(familiars).map(([key, fam]) => (
            <button
              key={key}
              onClick={() => handleSelect(key as FamiliarKey)}
              className="flex flex-col items-center text-amber-300 hover:text-amber-100 transition"
            >
              <img
                src={fam.icon}
                alt={fam.name}
                className="w-14 h-14 mb-1 rounded-full hover:scale-110 transition-all drop-shadow"
              />
              <span className="text-xs">{fam.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FamiliarSelector;
