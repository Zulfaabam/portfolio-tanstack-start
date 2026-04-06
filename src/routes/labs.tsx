import ErrorContent from '@/components/error-content';
import Section from '@/components/section';
import { createFileRoute } from '@tanstack/react-router';
import LabCard from '@/components/lab-card';
import { EXPERIMENTS } from '@/lib/labs';
import { useState, useMemo } from 'react';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  const allTechs = useMemo(() => {
    const techs = new Set<string>();
    EXPERIMENTS.filter((exp) => exp.featured).forEach((exp) =>
      exp.techs.forEach((t) => techs.add(t)),
    );
    return Array.from(techs).sort();
  }, []);

  const toggleTech = (tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech],
    );
  };

  const displayedExperiments = useMemo(() => {
    let result = EXPERIMENTS.filter((exp) => exp.featured);

    if (selectedTechs.length > 0) {
      result = result.filter((exp) =>
        selectedTechs.every((tech) => exp.techs.includes(tech)),
      );
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = [...result].sort((a, b) => {
        const aMatch =
          a.title.toLowerCase().includes(query) ||
          a.techs.some((t) => t.toLowerCase().includes(query));
        const bMatch =
          b.title.toLowerCase().includes(query) ||
          b.techs.some((t) => t.toLowerCase().includes(query));

        if (aMatch && !bMatch) return -1;
        if (!aMatch && bMatch) return 1;
        return 0;
      });
    }

    return result;
  }, [searchQuery, selectedTechs]);

  return (
    <div id='labs-div' className='bg-darkest relative min-h-screen w-full'>
      <Section id='labs' className='relative z-10'>
        <div className='py-10 lg:py-20'>
          <h2 className='text-fg mb-4 max-w-4xl text-2xl md:text-4xl'>Labs</h2>
          <p className='text-fg max-w-md text-sm md:text-base'>
            A collection of my web experiments.
          </p>
        </div>
        <div className='mb-8 flex flex-col items-center justify-between gap-4 md:flex-row'>
          <input
            type='text'
            placeholder='Search experiments...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='text-fg w-full max-w-md rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm placeholder-neutral-500 focus:border-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-600'
          />
          {allTechs.length > 0 && (
            <div className='flex flex-wrap gap-2'>
              {allTechs.map((tech) => {
                const isSelected = selectedTechs.includes(tech);
                return (
                  <button
                    key={tech}
                    onClick={() => toggleTech(tech)}
                    className={`cursor-pointer rounded-full border px-3 py-1 text-xs transition-colors ${
                      isSelected
                        ? 'border-neutral-300 bg-neutral-300 text-neutral-900'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300'
                    }`}
                  >
                    {tech}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6'>
          {displayedExperiments.map((item) => (
            <LabCard
              key={item.id}
              title={item.title}
              techs={item.techs}
              src={item.src}
              searchQuery={searchQuery}
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
