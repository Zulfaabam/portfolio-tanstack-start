import Section from '@/components/section';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/components')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main id='components-main' className='bg-bg relative min-h-screen w-full'>
      <Section id='labs' className='relative z-10'>
        <div className='py-10 lg:py-20'>
          <h2 className='text-text mb-4 max-w-4xl text-2xl md:text-4xl'>
            Components
          </h2>
          <p className='text-muted max-w-md text-sm md:text-base'>
            Experimenting with UI components, patterns, and micro-interactions.
          </p>
        </div>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6'>
          <div className='border-border bg-surface relative flex h-[260px] items-center justify-center overflow-hidden rounded-xl border'>
            <button className='h-9.5 text-text group relative cursor-pointer gap-1.5 rounded-none border-transparent px-3.5 text-xs font-medium hover:bg-transparent sm:text-sm'>
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
              <span className='bg-text/22 group-hover:bg-foreground/30 absolute -left-1.5 -right-1.5 top-0 h-px transition-colors' />
              {/* Bottom border */}
              <span className='bg-text/22 group-hover:bg-foreground/30 absolute -left-1.5 -right-1.5 bottom-0 h-px transition-colors' />
              {/* Left border */}
              <span className='bg-text/22 group-hover:bg-foreground/30 absolute -bottom-1.5 -top-1.5 left-0 w-px transition-colors' />
              {/* Right border */}
              <span className='bg-text/22 group-hover:bg-foreground/30 absolute -bottom-1.5 -top-1.5 right-0 w-px transition-colors' />

              <code className='text-text/90 relative font-mono'>
                Button w/ lines
              </code>
            </button>
          </div>
        </div>
      </Section>
    </main>
  );
}
