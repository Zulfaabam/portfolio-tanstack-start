import ErrorContent from '@/components/error-content';
import Section from '@/components/section';
import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'motion/react';
import { useRef } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import { Image } from '@unpic/react';
import { galleryImages } from '@/lib/consts';

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

function Gallery() {
  const constraintsRef = useRef<HTMLDivElement>(null);

  const size = useWindowSize();

  // Grid Configuration
  const colCount = size?.width! < 768 ? 3 : 5;
  const itemWidth = size?.width! < 768 ? 224 : 368;
  const rowHeight = size?.width! < 768 ? 174 : 288;

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
        className='relative h-fit w-fit cursor-grab px-4 py-12 active:cursor-grabbing'
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.4}
      >
        <div
          className='relative'
          style={{
            // Manually set size to encompass all items so drag constraints work on the bounding box
            width: `${colCount * itemWidth}px`,
            height: `${Math.ceil(galleryImages.length / colCount) * rowHeight}px`,
          }}
        >
          {galleryImages.map((item, index) => {
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
    <div className='aspect-4/3 group relative w-[200px] shrink-0 overflow-hidden rounded-lg bg-neutral-900 md:w-[320px]'>
      <Image
        src={item.src}
        alt={item.title}
        layout='fullWidth'
        loading='lazy'
        className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-110'
      />
      <div className='bg-linear-to-t absolute inset-0 from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100' />

      {/* <div className='absolute bottom-0 left-0 translate-y-4 p-6 transition-transform duration-300 group-hover:translate-y-0'>
        <span className='text-primary mb-1 inline-block rounded-full bg-white/10 px-3 py-1 text-[10px] font-medium backdrop-blur-md md:mb-2 md:text-xs'>
          {item.category}
        </span>
        <p className='font-pixelify-sans text-lg text-white md:text-2xl'>
          {item.title}
        </p>
      </div> */}
    </div>
  );
}
