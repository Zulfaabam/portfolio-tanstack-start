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

const JourneySection1 = ({ data, isMobile }: JourneySectionProps) => {
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
          },
          visible: {
            scale: 1,
            x: 0,
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
            x: prefersReducedMotion ? 0 : isMobile ? -50 : -100,
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
          hidden: { x: isMobile ? -50 : -200, opacity: 0 },
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
        className='star-anchor1 absolute left-4 top-[100px] size-fit md:left-[30px] md:top-[110px]'
      >
        <motion.svg
          width='77'
          height='71'
          viewBox='0 0 77 71'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='w-8 md:w-[77px]'
          animate={{ transform: 'translateY(-5px)' }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        >
          <path
            d='M0.741974 55.266C49.1226 1.72204 48.0168 -1.05226 49.1226 1.72204C50.2284 4.49634 73.4511 71.6344 72.3453 69.9698C71.2395 68.3052 10.6946 13.6515 12.3533 13.9289C14.0121 14.2063 81.192 18.9227 75.3864 20.3098C70.7418 21.4195 23.6882 44.0764 0.741974 55.266Z'
            stroke='#EBBF2F'
            strokeWidth='2'
          />
        </motion.svg>
      </div>
      <motion.p
        variants={yearVariants}
        initial='hidden'
        animate={isVisible ? 'visible' : 'hidden'}
        className='year-journey1 job-year'
      >
        {data.year}
      </motion.p>
      <motion.div
        initial='hidden'
        animate={isVisible ? 'visible' : 'hidden'}
        className='content1-journey1 flex items-start gap-4 lg:gap-8'
      >
        <motion.div variants={variants.image1} className='-rotate-10'>
          <JourneyImage src={data.image1} />
        </motion.div>
        <motion.div
          variants={variants.text1}
          className='space-y-0.5 md:space-y-1'
        >
          <p className='company'>{data.company}</p>
          <p className='job-title'>{data.jobTitle}</p>
          <p className='job-duration'>{data.duration}</p>
        </motion.div>
      </motion.div>
      <motion.div className='content2-journey1 flex items-start gap-2 md:items-center md:gap-8'>
        <motion.div
          initial='hidden'
          animate={isVisible ? 'visible' : 'hidden'}
          variants={variants.image2}
          className='-rotate-2'
        >
          <JourneyImage src={data.image2} />
        </motion.div>
        <motion.div
          initial='hidden'
          animate={isVisible ? 'visible' : 'hidden'}
          variants={variants.text2}
          className='job-desc'
        >
          <p>Contributed in {data.projects.length} projects:</p>
          <ul className='list-disc pl-6'>
            {data.projects.map((project, idx) => (
              <li key={idx}>{project}</li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
      <div className='content3-journey1 flex flex-col gap-7 md:flex-row md:items-end'>
        <motion.div
          initial='hidden'
          animate={isVisible ? 'visible' : 'hidden'}
          variants={variants.image3}
        >
          <JourneyImage src={data.image3} className='rotate-15' />
        </motion.div>
        <motion.div
          initial='hidden'
          animate={isVisible ? 'visible' : 'hidden'}
          variants={variants.text3}
          className='job-tech md:max-w-68! lg:max-w-96!'
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
      </div>
    </>
  );
};

export default JourneySection1;
