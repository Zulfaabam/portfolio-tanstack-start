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

const JourneySection2 = ({ data, isMobile }: JourneySectionProps) => {
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
            x: prefersReducedMotion ? 0 : isMobile ? 50 : 100,
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
        className='star-anchor2 absolute right-4 top-[696px] size-fit md:right-12 lg:right-32'
      >
        <motion.svg
          width='75'
          height='67'
          viewBox='0 0 75 67'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='w-8 md:w-[75px]'
          animate={{ transform: 'translateY(-5px)' }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        >
          <path
            d='M0.889862 65.7812C33.8197 1.56855 32.0356 -0.826563 33.8197 1.56855C35.6038 3.96366 75.3605 62.8382 73.8627 61.5152C72.3649 60.1923 -0.23006 23.0078 1.44413 22.8479C3.11831 22.688 69.241 9.91374 63.9897 12.7517C59.7886 15.022 20.1727 49.0507 0.889862 65.7812Z'
            stroke='#76C1FF'
            strokeWidth='2'
          />
        </motion.svg>
      </div>
      <motion.p
        variants={yearVariants}
        initial='hidden'
        animate={isVisible ? 'visible' : 'hidden'}
        className='year-journey2 job-year max-w-12 md:max-w-24'
      >
        {data.year}
      </motion.p>
      <motion.div
        initial='hidden'
        animate={isVisible ? 'visible' : 'hidden'}
        className='content1-journey2 flex items-start gap-2 md:gap-8'
      >
        <motion.div
          variants={variants.text1}
          className='space-y-0.5 md:space-y-1'
        >
          <p className='company'>{data.company}</p>
          <p className='job-title'>{data.jobTitle}</p>
          <p className='job-duration'>{data.duration}</p>
        </motion.div>
        <motion.div variants={variants.image1} className='rotate-12'>
          <JourneyImage src={data.image1} />
        </motion.div>
      </motion.div>
      <motion.div
        initial='hidden'
        animate={isVisible ? 'visible' : 'hidden'}
        className='content2-journey2 flex gap-2 md:items-center md:gap-8'
      >
        <motion.div variants={variants.text2} className='job-desc'>
          <ul className='list-disc pl-6'>
            {data.projects.map((project, idx) => (
              <li key={idx}>{project}</li>
            ))}
          </ul>
        </motion.div>
        <motion.div variants={variants.image2} className='rotate-2'>
          <JourneyImage src={data.image2} />
        </motion.div>
      </motion.div>
      <motion.div
        initial='hidden'
        animate={isVisible ? 'visible' : 'hidden'}
        className='content3-journey2 flex flex-col-reverse items-end gap-3 md:flex-row md:items-start md:gap-7'
      >
        <motion.div
          variants={variants.text3}
          className='job-tech lg:max-w-96! md:max-w-68! text-right md:text-left'
        >
          <p>Tech / Tools:</p>
          <div className='flex flex-row-reverse flex-wrap gap-1 md:flex-row md:gap-2'>
            {data.tech.map((tech) => (
              <div key={tech} className='chip'>
                {tech}
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div variants={variants.image3}>
          <JourneyImage src={data.image3} className='-rotate-5' />
        </motion.div>
      </motion.div>
    </>
  );
};

export default JourneySection2;
