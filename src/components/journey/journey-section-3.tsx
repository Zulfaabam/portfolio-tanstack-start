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

const JourneySection3 = ({ data, isMobile }: JourneySectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { amount: 1, once: true });
  const prefersReducedMotion = useReducedMotion();

  const yearVariants: Variants = {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      transform: 'translateY(-5px)',
      transition: {
        opacity: contentTransition,
        filter: contentTransition,
        transform: {
          duration: 3,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
          delay: 1,
        },
      },
    },
  };

  const variants = useMemo(
    () =>
      ({
        image1: {
          hidden: {
            scale: prefersReducedMotion ? 1 : 0,
            x: prefersReducedMotion ? 0 : isMobile ? 50 : -100,
            y: prefersReducedMotion ? 0 : isMobile ? 50 : 100,
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
            x: prefersReducedMotion ? 0 : isMobile ? 50 : 200,
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
            x: prefersReducedMotion ? 0 : isMobile ? 50 : 100,
            y: prefersReducedMotion ? 0 : isMobile ? -100 : -50,
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
            x: prefersReducedMotion ? 0 : isMobile ? 50 : 200,
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
            x: prefersReducedMotion ? 0 : isMobile ? 50 : 100,
            y: prefersReducedMotion ? 0 : isMobile ? -50 : 100,
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
            x: prefersReducedMotion ? 0 : isMobile ? 50 : 200,
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
        className='star-anchor3 absolute bottom-[1091px] left-1/2 size-fit md:bottom-[1081px] md:left-[399px] md:translate-x-0'
      >
        <motion.svg
          width='85'
          height='80'
          viewBox='0 0 85 80'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='w-8 md:w-[85px]'
          animate={{ transform: 'translateY(-5px)' }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        >
          <path
            d='M0.356745 32.5715C67.7718 6.82545 68.0459 3.85148 67.7718 6.82545C67.4977 9.79943 57.7117 80.1631 57.482 78.1779C57.2523 76.1927 28.116 0.0100949 29.4681 1.0103C30.8201 2.01051 88.538 36.7098 82.7353 35.3103C78.0931 34.1906 25.882 33.0179 0.356745 32.5715Z'
            stroke='#76C1FF'
            strokeWidth='2'
          />
        </motion.svg>
      </div>
      <motion.p
        variants={yearVariants}
        initial='hidden'
        animate={isVisible ? 'visible' : 'hidden'}
        className='year-journey3 job-year'
      >
        {data.year}
      </motion.p>
      <motion.div
        initial='hidden'
        animate={isVisible ? 'visible' : 'hidden'}
        className='content1-journey3 flex gap-4 md:flex-col-reverse lg:flex-row lg:gap-8'
      >
        <motion.div variants={variants.image1} className='-rotate-9'>
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
        className='content2-journey3 flex flex-row-reverse gap-4 md:flex-col-reverse md:items-center'
      >
        <motion.div variants={variants.text2} className='job-desc'>
          <ul className='list-disc pl-6'>
            {data.projects.map((project, idx) => (
              <li key={idx}>{project}</li>
            ))}
          </ul>
        </motion.div>
        <motion.div variants={variants.image2} className='rotate-4'>
          <JourneyImage src={data.image2} />
        </motion.div>
      </motion.div>
      <motion.div
        initial='hidden'
        animate={isVisible ? 'visible' : 'hidden'}
        className='content3-journey3 flex flex-col-reverse gap-3 md:flex-row md:items-end lg:gap-1'
      >
        <motion.div
          variants={variants.text3}
          className='job-tech md:max-w-44! lg:max-w-52!'
        >
          <p>Tech / Tools:</p>
          <div className='flex flex-wrap gap-1 md:gap-2'>
            {data.tech.map((tech) => (
              <div key={tech} className='chip'>
                {tech}
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div variants={variants.image3}>
          <JourneyImage src={data.image3} className='-rotate-2' />
        </motion.div>
      </motion.div>
    </>
  );
};

export default JourneySection3;
