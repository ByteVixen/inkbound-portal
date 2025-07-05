import { useEffect, useState } from "react";

export default function LiveReaderCount() {
  const [count, setCount] = useState(1 + Math.floor(Math.random() * 5));

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(1 + Math.floor(Math.random() * 5)); // fake activity
    }, 8000); // every 8 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-sm text-gray-300 italic">
      {count} reader{count !== 1 ? "s" : ""} online
    </span>
  );
}
