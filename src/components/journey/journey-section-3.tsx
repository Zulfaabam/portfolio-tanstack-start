import JourneyImage from '@/components/journey-image';
import { contentTransition, floatingTransition } from '@/lib/consts';
import { motion, useInView, useReducedMotion, Variants } from 'motion/react';
import React, { useRef } from 'react';
import { JourneyData } from 'types';

interface JourneySectionProps {
  data: JourneyData;
}

const JourneySection3 = ({ data }: JourneySectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { amount: 1, once: true });
  const prefersReducedMotion = useReducedMotion();



  const fadeTextVariants = (delay: number): Variants => ({
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      filter: prefersReducedMotion ? 'blur(0px)' : 'blur(4px)',
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      transition: { ...contentTransition, delay },
      willChange: 'opacity, filter',
    },
  });

  const fadeInRotateVariants = (delay: number, targetRotate: number): Variants => ({
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      filter: prefersReducedMotion ? 'blur(0px)' : 'blur(4px)',
      transform: prefersReducedMotion ? 'translate(0px, 0px) rotate(0deg)' : 'translate(0px, 8px) rotate(0deg)',
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      transform: prefersReducedMotion ? 'translate(0px, 0px) rotate(0deg)' : `translate(0px, 0px) rotate(${targetRotate}deg)`,
      transition: {
        opacity: contentTransition,
        filter: contentTransition,
        transform: { ...contentTransition, delay },
      },
      willChange: 'transform, opacity, filter',
    },
  });

  const image1Variants = fadeInRotateVariants(0.1, 4);
  const image2Variants = fadeInRotateVariants(0.5, 4);
  const image3Variants = fadeInRotateVariants(0.8, 4);

  return (
    <>
      <div
        ref={ref}
        className='star-anchor3 absolute bottom-[1091px] left-1/2 size-fit md:bottom-[1081px] md:translate-x-10 lg:-translate-x-12'
      >
        <svg
          width='85'
          height='80'
          viewBox='0 0 85 80'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='w-8 md:w-[85px] animate-float-star-2'
        >
          <path
            d='M0.356745 32.5715C67.7718 6.82545 68.0459 3.85148 67.7718 6.82545C67.4977 9.79943 57.7117 80.1631 57.482 78.1779C57.2523 76.1927 28.116 0.0100949 29.4681 1.0103C30.8201 2.01051 88.538 36.7098 82.7353 35.3103C78.0931 34.1906 25.882 33.0179 0.356745 32.5715Z'
            stroke='#76C1FF'
            strokeWidth='2'
          />
        </svg>
      </div>
      <motion.h2
        variants={fadeTextVariants(0.1)}
        initial='hidden'
        animate={isVisible ? 'visible' : 'hidden'}
        className='year-journey3 job-year tabular-nums'
      >
        {data.year}
      </motion.h2>
      <motion.div
        initial='hidden'
        animate={isVisible ? 'visible' : 'hidden'}
        className='content1-journey3 flex gap-4 md:flex-col-reverse lg:flex-row lg:gap-8'
      >
        <motion.div variants={image1Variants} className='-rotate-9'>
          <JourneyImage src={data.image1} />
        </motion.div>
        <motion.div variants={fadeTextVariants(0.2)} className='space-y-1'>
          <h3 className='company text-balance'>{data.company}</h3>
          <h4 className='job-title text-balance'>{data.jobTitle}</h4>
          <p className='job-duration'>{data.duration}</p>
        </motion.div>
      </motion.div>
      <motion.div
        initial='hidden'
        animate={isVisible ? 'visible' : 'hidden'}
        className='content2-journey3 flex flex-row-reverse gap-4 md:flex-col-reverse md:items-center'
      >
        <motion.div variants={fadeTextVariants(0.3)} className='job-desc'>
          <ul className='list-disc pl-6'>
            {data.projects.map((project, idx) => (
              <li key={idx} className='text-pretty'>{project}</li>
            ))}
          </ul>
        </motion.div>
        <motion.div variants={image2Variants} className='rotate-4'>
          <JourneyImage src={data.image2} />
        </motion.div>
      </motion.div>
      <motion.div
        initial='hidden'
        animate={isVisible ? 'visible' : 'hidden'}
        className='content3-journey3 flex flex-col-reverse gap-3 md:flex-row md:items-end lg:gap-1'
      >
        <motion.div
          variants={fadeTextVariants(0.4)}
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
        <motion.div variants={image3Variants}>
          <JourneyImage src={data.image3} className='-rotate-2' />
        </motion.div>
      </motion.div>
    </>
  );
};

export default JourneySection3;
