import ErrorContent from '@/components/error-content';
import Section from '@/components/section';
import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'motion/react';
import { useRef } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';

export const Route = createFileRoute('/gallery')({
  errorComponent: ({ reset }) => (
    <div className='bg-dark relative flex min-h-screen w-full items-center'>
      <Section
        id='error-gallery'
        className='flex flex-col items-center justify-center gap-2'
      >
        <ErrorContent reset={() => reset()} />
      </Section>
    </div>
  ),
  component: Gallery,
});

const images = [
  {
    src: 'https://images.unsplash.com/photo-1709949908058-a08659bfa922?q=80&w=1200&auto=format&fit=crop',
    title: 'Neon Nights',
    category: 'Cyberpunk',
  },
  {
    src: 'https://images.unsplash.com/photo-1548192746-dd526f154ed9?q=80&w=1200&auto=format&fit=crop',
    title: 'Desert Storm',
    category: 'Nature',
  },
  {
    src: 'https://images.unsplash.com/photo-1693680501357-a342180f1946?q=80&w=1200&auto=format&fit=crop',
    title: 'Urban Decay',
    category: 'Architecture',
  },
  {
    src: 'https://images.unsplash.com/photo-1706049379414-437ec3a54e93?q=80&w=1200&auto=format&fit=crop',
    title: 'Ocean Breeze',
    category: 'Travel',
  },
  {
    src: 'https://images.unsplash.com/photo-1709949908271-6e19cd00d238?q=80&w=1200&auto=format&fit=crop',
    title: 'Abstract Minds',
    category: 'Art',
  },
  {
    src: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1200&auto=format&fit=crop',
    title: 'Retro Future',
    category: 'Design',
  },
  {
    src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
    title: 'Tech Life',
    category: 'Technology',
  },
  {
    src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop',
    title: 'Create',
    category: 'Inspiration',
  },
];

const moreImages = [...images, ...images];

function Gallery() {
  const constraintsRef = useRef<HTMLDivElement>(null);

  const size = useWindowSize();

  // Grid Configuration
  const colCount = 5; // As per previous request
  const itemWidth = size?.width! < 768 ? 224 : 448;
  const rowHeight = size?.width! < 768 ? 174 : 348;

  return (
    <div
      className='bg-dark relative h-screen w-full overflow-hidden'
      ref={constraintsRef}
    >
      {/* Instructions Overlay */}
      <div className='text-fg/50 pointer-events-none absolute bottom-10 left-1/2 z-20 -translate-x-1/2 text-sm'>
        Drag to explore
      </div>

      <motion.div
        className='relative h-fit w-fit cursor-grab p-4 active:cursor-grabbing'
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.4}
      >
        <div
          className='relative'
          style={{
            // Manually set size to encompass all items so drag constraints work on the bounding box
            width: `${colCount * itemWidth}px`,
            height: `${Math.ceil(moreImages.length / colCount) * rowHeight}px`,
          }}
        >
          {moreImages.map((item, index) => {
            const row = Math.floor(index / colCount);
            const col = index % colCount;
            return (
              <div
                key={index}
                className='absolute transition-all duration-500'
                style={{
                  left: col * itemWidth,
                  top: row * rowHeight,
                }}
              >
                <GalleryCard item={item} />
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

function GalleryCard({
  item,
}: {
  item: { src: string; title: string; category: string };
}) {
  return (
    <div className='group relative h-[150px] w-[200px] shrink-0 overflow-hidden rounded-lg bg-neutral-900 md:h-[300px] md:w-[400px]'>
      <img
        src={item.src}
        alt={item.title}
        className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-110'
      />
      <div className='bg-linear-to-t absolute inset-0 from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100' />

      <div className='absolute bottom-0 left-0 translate-y-4 p-6 transition-transform duration-300 group-hover:translate-y-0'>
        <span className='text-primary mb-1 inline-block rounded-full bg-white/10 px-3 py-1 text-[10px] font-medium backdrop-blur-md md:mb-2 md:text-xs'>
          {item.category}
        </span>
        <p className='font-pixelify-sans text-lg text-white md:text-2xl'>
          {item.title}
        </p>
      </div>
    </div>
  );
}
