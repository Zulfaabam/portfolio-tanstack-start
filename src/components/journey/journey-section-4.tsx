import JourneyImage from '@/components/journey-image';
import {
  motion,
  Transition,
  useInView,
  useReducedMotion,
  Variants,
} from 'motion/react';
import React, { useMemo, useRef } from 'react';
import { JourneyData } from 'types';

interface JourneySectionProps {
  data: JourneyData;
  isMobile: boolean;
}

const contentTransition: Transition = {
  duration: 1,
  ease: [0.7, 0, 0.3, 1],
};

const JourneySection4 = ({ data, isMobile }: JourneySectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { amount: 1, once: true });
  const prefersReducedMotion = useReducedMotion();

  const variants = useMemo(
    () =>
      ({
        image1: {
          hidden: {
            scale: prefersReducedMotion ? 1 : 0,
            x: prefersReducedMotion ? 0 : isMobile ? -50 : -100,
            y: prefersReducedMotion ? 0 : isMobile ? 50 : 150,
          },
          visible: {
            scale: 1,
            x: 0,
            y: 0,
            transition: contentTransition,
            willChange: 'transform, opacity',
          },
        },
        text1: {
          hidden: {
            x: prefersReducedMotion ? 0 : isMobile ? -50 : -200,
            opacity: 0,
          },
          visible: {
            x: 0,
            opacity: 1,
            transition: contentTransition,
            willChange: 'transform, opacity',
          },
        },
        image2: {
          hidden: {
            scale: prefersReducedMotion ? 1 : 0,
            x: prefersReducedMotion ? 0 : isMobile ? -50 : -100,
            y: 0,
          },
          visible: {
            scale: 1,
            x: 0,
            y: 0,
            transition: contentTransition,
            willChange: 'transform, opacity',
          },
        },
        text2: {
          hidden: {
            x: prefersReducedMotion ? 0 : isMobile ? -50 : -200,
            opacity: 0,
          },
          visible: {
            x: 0,
            opacity: 1,
            transition: contentTransition,
            willChange: 'transform, opacity',
          },
        },
        image3: {
          hidden: {
            scale: prefersReducedMotion ? 1 : 0,
            x: prefersReducedMotion ? 0 : -50,
            y: prefersReducedMotion ? 0 : isMobile ? -50 : -150,
          },
          visible: {
            scale: 1,
            x: 0,
            y: 0,
            transition: contentTransition,
            willChange: 'transform, opacity',
          },
        },
        text3: {
          hidden: {
            x: prefersReducedMotion ? 0 : isMobile ? -50 : -200,
            opacity: 0,
          },
          visible: {
            x: 0,
            opacity: 1,
            transition: contentTransition,
            willChange: 'transform, opacity',
          },
        },
      }) as const satisfies Record<string, Variants>,
    [isMobile, prefersReducedMotion],
  );

  return (
    <>
      <div
        ref={ref}
        className='star-anchor4 absolute bottom-[392px] left-6 size-fit md:bottom-[386px] md:left-[54px]'
      >
        <svg
          width='75'
          height='70'
          viewBox='0 0 75 70'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='w-8 md:w-[75px]'
        >
          <path
            d='M0.787176 58.4891C45.2928 1.68328 43.995 -1.00662 45.2928 1.68328C46.5905 4.37318 74.4654 69.7169 73.2455 68.134C72.0256 66.551 7.79618 16.2789 9.47032 16.4393C11.1445 16.5997 78.4898 16.592 72.7957 18.383C68.2404 19.8158 22.892 45.7174 0.787176 58.4891Z'
            stroke='#76C1FF'
            strokeWidth='2'
          />
        </svg>
      </div>
      <p className='year-journey4 job-year'>{data.year}</p>
      <motion.div
        initial='hidden'
        animate={isVisible ? 'visible' : 'hidden'}
        className='content1-journey4 flex items-start gap-3 md:gap-5 lg:gap-8'
      >
        <motion.div variants={variants.image1} className='-rotate-10'>
          <JourneyImage src={data.image1} />
        </motion.div>
        <motion.div variants={variants.text1} className='space-y-1'>
          <p className='company'>{data.company}</p>
          <p className='job-title'>{data.jobTitle}</p>
          <p className='job-duration'>{data.duration}</p>
        </motion.div>
      </motion.div>
      <motion.div
        initial='hidden'
        animate={isVisible ? 'visible' : 'hidden'}
        className='content2-journey4 flex gap-1 md:items-center md:gap-3 lg:gap-8'
      >
        <motion.div variants={variants.image2} className='-rotate-2'>
          <JourneyImage src={data.image2} />
        </motion.div>
        <motion.div variants={variants.text2} className='job-desc'>
          <ul className='list-disc pl-6'>
            {data.projects.map((project, idx) => (
              <li key={idx}>{project}</li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
      <motion.div
        initial='hidden'
        animate={isVisible ? 'visible' : 'hidden'}
        className='content3-journey4 flex flex-col items-start gap-4 md:flex-row md:gap-7'
      >
        <motion.div variants={variants.image3}>
          <JourneyImage src={data.image3} className='rotate-15' />
        </motion.div>
        <motion.div variants={variants.text3} className='job-tech'>
          <p>Tech / Tools:</p>
          <div className='flex flex-wrap gap-2'>
            {data.tech.map((tech) => (
              <div key={tech} className='chip'>
                {tech}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default JourneySection4;
