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

  const image1Variants = fadeInRotateVariants(0.25, -2);
  const image2Variants = fadeInRotateVariants(0.1, -2);
  const image3Variants = fadeInRotateVariants(0.67, -2);

  return (
    <>
      <div
        ref={ref}
        className='star-anchor4 absolute bottom-[392px] left-6 size-fit md:bottom-[386px] md:left-14 lg:left-24 xl:left-60'
      >
        <svg
          width='75'
          height='70'
          viewBox='0 0 75 70'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='w-8 md:w-[75px] animate-float-star-3'
        >
          <path
            d='M0.787176 58.4891C45.2928 1.68328 43.995 -1.00662 45.2928 1.68328C46.5905 4.37318 74.4654 69.7169 73.2455 68.134C72.0256 66.551 7.79618 16.2789 9.47032 16.4393C11.1445 16.5997 78.4898 16.592 72.7957 18.383C68.2404 19.8158 22.892 45.7174 0.787176 58.4891Z'
            stroke='#76C1FF'
            strokeWidth='2'
          />
        </svg>
      </div>
      <motion.h2
        variants={fadeTextVariants(0.1)}
        initial='hidden'
        animate={isVisible ? 'visible' : 'hidden'}
        className='year-journey4 job-year tabular-nums'
      >
        {data.year}
      </motion.h2>
      <motion.div
        initial='hidden'
        animate={isVisible ? 'visible' : 'hidden'}
        className='content1-journey4 flex items-start gap-3 md:gap-5 lg:gap-8'
      >
        <motion.div variants={image1Variants} className='-rotate-10'>
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
        className='content2-journey4 flex gap-1 md:items-center md:gap-3 lg:gap-8'
      >
        <motion.div variants={image2Variants} className='-rotate-2'>
          <JourneyImage src={data.image2} />
        </motion.div>
        <motion.div variants={fadeTextVariants(0.3)} className='job-desc'>
          <ul className='list-disc pl-6'>
            {data.projects.map((project, idx) => (
              <li key={idx} className='text-pretty'>{project}</li>
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
        <motion.div variants={fadeTextVariants(0.4)} className='job-tech'>
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
