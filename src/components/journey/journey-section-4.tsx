import JourneyImage from '@/components/journey-image';
import { contentTransition, floatingTransition } from '@/lib/consts';
import { motion, useInView, useReducedMotion, Variants } from 'motion/react';
import React, { useRef } from 'react';
import { JourneyData } from 'types';

interface JourneySectionProps {
  data: JourneyData;
}

const JourneySection4 = ({ data }: JourneySectionProps) => {
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

  const image1Variants = fadeInFloatingVariants(0.25);
  const image2Variants = fadeInFloatingVariants(0.1);
  const image3Variants = fadeInFloatingVariants(0.67);

  return (
    <>
      <div
        ref={ref}
        className='star-anchor4 absolute bottom-[392px] left-6 size-fit md:bottom-[386px] md:left-[54px]'
      >
        <motion.svg
          width='75'
          height='70'
          viewBox='0 0 75 70'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='w-8 md:w-[75px]'
          animate={{ transform: 'translateY(-5px) rotate(4deg)' }}
          transition={floatingTransition}
        >
          <path
            d='M0.787176 58.4891C45.2928 1.68328 43.995 -1.00662 45.2928 1.68328C46.5905 4.37318 74.4654 69.7169 73.2455 68.134C72.0256 66.551 7.79618 16.2789 9.47032 16.4393C11.1445 16.5997 78.4898 16.592 72.7957 18.383C68.2404 19.8158 22.892 45.7174 0.787176 58.4891Z'
            stroke='#76C1FF'
            strokeWidth='2'
          />
        </motion.svg>
      </div>
      <motion.p
        variants={fadeInVariants}
        initial='hidden'
        animate={isVisible ? 'visible' : 'hidden'}
        className='year-journey4 job-year'
      >
        {data.year}
      </motion.p>
      <motion.div
        initial='hidden'
        animate={isVisible ? 'visible' : 'hidden'}
        className='content1-journey4 flex items-start gap-3 md:gap-5 lg:gap-8'
      >
        <motion.div variants={image1Variants} className='-rotate-10'>
          <JourneyImage src={data.image1} />
        </motion.div>
        <motion.div variants={fadeInVariants} className='space-y-1'>
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
        <motion.div variants={image2Variants} className='-rotate-2'>
          <JourneyImage src={data.image2} />
        </motion.div>
        <motion.div variants={fadeInVariants} className='job-desc'>
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
        <motion.div variants={image3Variants}>
          <JourneyImage src={data.image3} className='rotate-15' />
        </motion.div>
        <motion.div variants={fadeInVariants} className='job-tech'>
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
