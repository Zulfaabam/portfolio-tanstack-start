import { useEffect, useState } from 'react';

const GRID_SIZE = 10;
const GRID_COLS = 10;

export default function PixelPlayground() {
  const [pixels, setPixels] = useState<string[]>([]);

  const handlePixelClick = (index: number) => {
    setPixels((prev) => {
      const newPixels = [...prev];
      if (newPixels[index] === 'bg-bg') {
        newPixels[index] = 'bg-text';
      } else {
        newPixels[index] = 'bg-bg';
      }
      return newPixels;
    });
  };

  useEffect(() => {
    const initialPixels = Array.from(
      { length: GRID_SIZE * GRID_COLS },
      () => 'bg-bg',
    );
    setPixels(initialPixels);
  }, []);

  return (
    <div className='flex h-full w-full flex-col'>
      <h3 className='text-text mb-6 font-medium'>Pixel Playground</h3>

      <div
        className='mx-auto mb-2 grid w-fit'
        style={{
          gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
        }}
      >
        {pixels.map((color, i) => (
          <div
            key={i}
            onClick={() => handlePixelClick(i)}
            className={`${color} size-4 cursor-pointer border border-border transition-colors duration-200 hover:opacity-80`}
          />
        ))}
      </div>

      <p className='text-text/80 text-center text-xs'>
        Click to paint, click again to remove
      </p>
    </div>
  );
}
