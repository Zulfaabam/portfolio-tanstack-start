import { useEffect, useState } from "react";

const GRID_SIZE = 14; 
const GRID_COLS = 14;

export default function PixelPlayground() {
  const [pixels, setPixels] = useState<string[]>([]);

  // Initialize with zinc-100
  useEffect(() => {
    const initialPixels = Array.from({ length: GRID_SIZE * GRID_COLS }, () =>
      "bg-zinc-100"
    );
    setPixels(initialPixels);
  }, []);

  const handlePixelClick = (index: number) => {
    setPixels((prev) => {
      const newPixels = [...prev];
      if (newPixels[index] === "bg-zinc-100") {
        newPixels[index] = "bg-zinc-800";
      } else {
        newPixels[index] = "bg-zinc-100";
      }
      return newPixels;
    });
  };

  return (
    <div className="flex flex-col h-full w-full">
      <h3 className="font-medium text-fg mb-6">Pixel Playground</h3>
      
      <div 
        className="grid gap-px w-fit mx-auto mb-2"
        style={{
            gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))`
        }}
      >
        {pixels.map((color, i) => (
          <div
            key={i}
            onClick={() => handlePixelClick(i)}
            className={`${color} w-2.5 h-2.5 hover:opacity-80 cursor-pointer transition-colors duration-200`}
          />
        ))}
      </div>

      <p className="text-xs text-center text-fg/80">Click to paint, click again to remove</p>
    </div>
  );
}
