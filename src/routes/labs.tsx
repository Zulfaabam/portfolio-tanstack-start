import ErrorContent from '@/components/error-content';
import Section from '@/components/section';
import { createFileRoute } from '@tanstack/react-router';
import LabCard from '@/components/lab-card';

// A static list of your HTML experiments.
// Place your HTML files inside the `public/experiments` folder.
const EXPERIMENTS = [
  {
    id: 1,
    title: 'Blackhole',
    techs: ['Pretext', 'CSS'],
    src: '/experiments/blackhole.html', // path relative to public folder
    featured: true,
  },
  {
    id: 2,
    title: 'Fish',
    techs: ['Pretext', 'Canvas'],
    src: '/experiments/fish.html',
    featured: true,
  },
  {
    id: 3,
    title: 'Curtain',
    techs: ['JS', 'HTML', 'CSS'],
    src: '/experiments/curtain.html',
    featured: true,
  },
];

export const Route = createFileRoute('/labs')({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      { title: 'Abams Labs' },
      {
        name: 'description',
        content:
          'A collection of my experiments, including CSS animations, UI components, canvas sketches, and more.',
      },
    ],
  }),
  errorComponent: ({ reset }) => (
    <div className='bg-dark relative flex min-h-screen w-full items-center'>
      <Section
        id='error-labs'
        className='flex flex-col items-center justify-center gap-2'
      >
        <ErrorContent reset={() => reset()} />
      </Section>
    </div>
  ),
  component: Labs,
});

function Labs() {
  return (
    <div className='bg-darkest relative min-h-screen w-full'>
      <Section id='labs' className='relative z-10'>
        <div className='py-10 lg:py-20'>
          <h2 className='text-fg mb-4 max-w-4xl text-2xl md:text-4xl'>Labs</h2>
          <p className='text-fg max-w-md text-sm md:text-base'>
            A collection of my experiments, including CSS animations, UI
            components, canvas sketches, and more.
          </p>
        </div>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6'>
          {EXPERIMENTS.filter((exp) => exp.featured).map((item) => (
            <LabCard
              key={item.id}
              title={item.title}
              techs={item.techs}
              src={item.src}
            />
          ))}
        </div>

        {/* Minimalist List View */}
        {/* <div className='mt-16 flex flex-col md:mt-24'>
          <h3 className='text-fg mb-4 text-xl md:text-2xl'>
            Other Experiments
          </h3>
          <div className='flex flex-col'>
            {EXPERIMENTS.map((item) => (
              <a
                key={item.id}
                href={item.src}
                target='_blank'
                rel='noopener noreferrer'
                className='group flex items-center justify-between border-b border-neutral-800 py-5 transition-colors hover:border-neutral-600'
              >
                <div className='flex items-center gap-6'>
                  <span className='font-mono text-sm text-neutral-600 transition-colors group-hover:text-neutral-400'>
                    0{item.id}
                  </span>
                  <p className='text-sm text-neutral-300 transition-colors group-hover:text-white md:text-base'>
                    {item.title}
                  </p>
                </div>
                <div className='flex items-center gap-4'>
                  <div className='flex gap-2'>
                    {item.techs.map((tech, idx) => (
                      <span
                        key={idx}
                        className='rounded bg-neutral-900 px-2 py-1 text-[10px] text-neutral-500 transition-colors group-hover:bg-neutral-800 group-hover:text-neutral-300'
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <svg
                    className='h-4 w-4 text-neutral-600 transition-transform group-hover:-rotate-45 group-hover:text-white'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M14 5l7 7m0 0l-7 7m7-7H3'
                    />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div> */}
      </Section>
    </div>
  );
}
