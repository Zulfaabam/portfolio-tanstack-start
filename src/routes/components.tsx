import Section from '@/components/section';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/components')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div id='labs-div' className='bg-darkest relative min-h-screen w-full'>
      <Section id='labs' className='relative z-10'>
        <div className='py-10 lg:py-20'>
          <h2 className='text-fg mb-4 max-w-4xl text-2xl md:text-4xl'>
            Components
          </h2>
          <p className='text-fg max-w-md text-sm md:text-base'>
            Experimenting with UI components, patterns, and micro-interactions.
          </p>
        </div>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6'>
          <div className='relative flex h-[260px] items-center justify-center overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900'>
            <button className='h-9.5 text-fg group relative cursor-pointer gap-1.5 rounded-none border-transparent px-3.5 text-xs font-medium hover:bg-transparent sm:text-sm'>
              {/* Diagonal lines background */}
              <span
                className='absolute inset-0 opacity-[0.13] transition-opacity group-hover:opacity-[0.18]'
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    -45deg,
                    transparent,
                    transparent 4px,
                    currentColor 4px,
                    currentColor 5px
                  )`,
                }}
              />
              {/* Top border */}
              <span className='bg-fg/22 group-hover:bg-foreground/30 absolute -left-[6px] -right-[6px] top-0 h-px transition-colors' />
              {/* Bottom border */}
              <span className='bg-fg/22 group-hover:bg-foreground/30 absolute -left-[6px] -right-[6px] bottom-0 h-px transition-colors' />
              {/* Left border */}
              <span className='bg-fg/22 group-hover:bg-foreground/30 absolute -bottom-[6px] -top-[6px] left-0 w-px transition-colors' />
              {/* Right border */}
              <span className='bg-fg/22 group-hover:bg-foreground/30 absolute -bottom-[6px] -top-[6px] right-0 w-px transition-colors' />

              <code className='text-fg/90 relative font-mono'>
                Button w/ lines
              </code>
            </button>
          </div>
        </div>
      </Section>
    </div>
  );
}
