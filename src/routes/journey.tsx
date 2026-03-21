import { useRef } from 'react';
import JourneySection1 from '@/components/journey/journey-section-1';
import JourneySection2 from '@/components/journey/journey-section-2';
import JourneySection3 from '@/components/journey/journey-section-3';
import JourneySection4 from '@/components/journey/journey-section-4';
import JourneyConstellation from '@/components/journey-constellation';
import { useMediaQuery } from '@/hooks/use-media-query';

import ErrorContent from '@/components/error-content';
import Section from '@/components/section';
import { createFileRoute } from '@tanstack/react-router';
import { useScroll, useTransform } from 'motion/react';
import {
  JOURNEY_2022,
  JOURNEY_2022_2023,
  JOURNEY_2023_2024,
  JOURNEY_2025,
} from '@/lib/consts';

export const Route = createFileRoute('/journey')({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      { title: 'Abams Journey' },
      {
        name: 'description',
        content: "Abam's journey as a developer so far",
      },
    ],
  }),
  errorComponent: ({ reset }) => (
    <div className='bg-dark relative flex min-h-screen w-full items-center'>
      <Section
        id='error-journey'
        className='flex flex-col items-center justify-center gap-2'
      >
        <ErrorContent reset={() => reset()} />
      </Section>
    </div>
  ),
  component: Journey,
});

function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 640px)');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0%', 'end 70%'],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={containerRef}
      className='bg-linear-to-b to-darkest relative min-h-screen w-full overflow-hidden from-black via-black'
    >
      <Section id='journey' className='z-10 w-full'>
        <div className='relative z-10 mx-auto py-10 md:px-0 lg:py-20'>
          <h2 className='text-fg mb-4 max-w-5xl text-2xl md:text-4xl'>
            My Journey So Far
          </h2>
          <p className='text-fg max-w-md text-sm md:text-base'>
            Here&apos;s my timeline of 3+ years learning, growing, and working
            as a developer.
          </p>
        </div>

        <div className='relative z-10 mt-16 h-fit w-full md:mt-32'>
          <JourneySection1 data={JOURNEY_2025} isMobile={isMobile} />
          <JourneySection2 data={JOURNEY_2023_2024} isMobile={isMobile} />
          <JourneySection3 data={JOURNEY_2022_2023} isMobile={isMobile} />
          <JourneySection4 data={JOURNEY_2022} isMobile={isMobile} />
          <JourneyConstellation pathLength={pathLength} />
        </div>
      </Section>
    </div>
  );
}
