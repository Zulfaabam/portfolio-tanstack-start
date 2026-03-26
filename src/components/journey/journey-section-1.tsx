import JourneyImage from '@/components/journey-image';
import { contentTransition, floatingTransition } from '@/lib/consts';
import { motion, useInView, useReducedMotion, Variants } from 'motion/react';
import React, { useRef } from 'react';
import { JourneyData } from 'types';

interface JourneySectionProps {
  data: JourneyData;
}

const JourneySection1 = ({ data }: JourneySectionProps) => {
  const starRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(starRef, { amount: 1, once: true });
  const prefersReducedMotion = useReducedMotion();

  const fadeInVariants: Variants = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      filter: prefersReducedMotion ? 'blur(0px)' : 'blur(10px)',
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      transition: contentTransition,
      willChange: 'opacity, filter',
    },
  };

  const fadeInFloatingVariants: (delay: number) => Variants = (
    delay: number = 1,
  ) => {
    return {
      hidden: {
        opacity: prefersReducedMotion ? 1 : 0,
        filter: prefersReducedMotion ? 'blur(0px)' : 'blur(10px)',
      },
      visible: {
        opacity: 1,
        filter: 'blur(0px)',
        transform: 'translateY(-5px) rotate(-2deg)',
        transition: {
          opacity: contentTransition,
          filter: contentTransition,
          transform: {
            ...floatingTransition,
            delay,
          },
        },
        willChange: 'transform, opacity, filter',
      },
    };
  };

  const image1Variants = fadeInFloatingVariants(0.5);
  const image2Variants = fadeInFloatingVariants(0.3);
  const image3Variants = fadeInFloatingVariants(0.7);

  return (
    <>
      <div
        ref={starRef}
        className='star-anchor1 absolute left-4 top-[100px] size-fit md:left-[30px] md:top-[110px]'
      >
        <motion.svg
          width='77'
          height='71'
          viewBox='0 0 77 71'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='w-8 md:w-[77px]'
          animate={{ transform: 'translateY(-3px) rotate(5deg)' }}
          transition={floatingTransition}
        >
          <path
            d='M0.741974 55.266C49.1226 1.72204 48.0168 -1.05226 49.1226 1.72204C50.2284 4.49634 73.4511 71.6344 72.3453 69.9698C71.2395 68.3052 10.6946 13.6515 12.3533 13.9289C14.0121 14.2063 81.192 18.9227 75.3864 20.3098C70.7418 21.4195 23.6882 44.0764 0.741974 55.266Z'
            stroke='#EBBF2F'
            strokeWidth='2'
          />
        </motion.svg>
      </div>
      <motion.p
        variants={fadeInVariants}
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
        <motion.div variants={image1Variants} className='-rotate-10'>
          <JourneyImage src={data.image1} />
        </motion.div>
        <motion.div
          variants={fadeInVariants}
          className='space-y-0.5 md:space-y-1'
        >
          <p className='company'>{data.company}</p>
          <p className='job-title'>{data.jobTitle}</p>
          <p className='job-duration'>{data.duration}</p>
        </motion.div>
      </motion.div>
      <motion.div
        initial='hidden'
        animate={isVisible ? 'visible' : 'hidden'}
        className='content2-journey1 flex items-start gap-2 md:items-center md:gap-8'
      >
        <motion.div variants={image2Variants} className='-rotate-2'>
          <JourneyImage src={data.image2} />
        </motion.div>
        <motion.div variants={fadeInVariants} className='job-desc'>
          <p>Contributed in {data.projects.length} projects:</p>
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
        className='content3-journey1 flex flex-col gap-7 md:flex-row md:items-end'
      >
        <motion.div variants={image3Variants}>
          <JourneyImage src={data.image3} className='rotate-15' />
        </motion.div>
        <motion.div
          variants={fadeInVariants}
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
      </motion.div>
    </>
  );
};

export default JourneySection1;
