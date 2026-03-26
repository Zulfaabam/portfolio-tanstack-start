import JourneyImage from '@/components/journey-image';
import { contentTransition, floatingTransition } from '@/lib/consts';
import { motion, useInView, useReducedMotion, Variants } from 'motion/react';
import React, { useRef } from 'react';
import { JourneyData } from 'types';

interface JourneySectionProps {
  data: JourneyData;
}

const JourneySection2 = ({ data }: JourneySectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { amount: 1, once: true });
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
        transform: 'translateY(-5px) rotate(2deg)',
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

  const image1Variants = fadeInFloatingVariants(0.2);
  const image2Variants = fadeInFloatingVariants(0.6);
  const image3Variants = fadeInFloatingVariants(0.4);

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
          animate={{ transform: 'translateY(-5px) rotate(-3deg)' }}
          transition={floatingTransition}
        >
          <path
            d='M0.889862 65.7812C33.8197 1.56855 32.0356 -0.826563 33.8197 1.56855C35.6038 3.96366 75.3605 62.8382 73.8627 61.5152C72.3649 60.1923 -0.23006 23.0078 1.44413 22.8479C3.11831 22.688 69.241 9.91374 63.9897 12.7517C59.7886 15.022 20.1727 49.0507 0.889862 65.7812Z'
            stroke='#76C1FF'
            strokeWidth='2'
          />
        </motion.svg>
      </div>
      <motion.p
        variants={fadeInVariants}
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
          variants={fadeInVariants}
          className='space-y-0.5 md:space-y-1'
        >
          <p className='company'>{data.company}</p>
          <p className='job-title'>{data.jobTitle}</p>
          <p className='job-duration'>{data.duration}</p>
        </motion.div>
        <motion.div variants={image1Variants} className='rotate-12'>
          <JourneyImage src={data.image1} />
        </motion.div>
      </motion.div>
      <motion.div
        initial='hidden'
        animate={isVisible ? 'visible' : 'hidden'}
        className='content2-journey2 flex gap-2 md:items-center md:gap-8'
      >
        <motion.div variants={fadeInVariants} className='job-desc'>
          <ul className='list-disc pl-6'>
            {data.projects.map((project, idx) => (
              <li key={idx}>{project}</li>
            ))}
          </ul>
        </motion.div>
        <motion.div variants={image2Variants} className='rotate-2'>
          <JourneyImage src={data.image2} />
        </motion.div>
      </motion.div>
      <motion.div
        initial='hidden'
        animate={isVisible ? 'visible' : 'hidden'}
        className='content3-journey2 flex flex-col-reverse items-end gap-3 md:flex-row md:items-start md:gap-7'
      >
        <motion.div
          variants={fadeInVariants}
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
        <motion.div variants={image3Variants}>
          <JourneyImage src={data.image3} className='-rotate-5' />
        </motion.div>
      </motion.div>
    </>
  );
};

export default JourneySection2;
