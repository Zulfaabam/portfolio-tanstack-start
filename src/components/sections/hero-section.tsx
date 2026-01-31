import { motion } from 'framer-motion';

import { useEffect, useState } from 'react';
import Section from '../section';

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState<number>(0);

  const words = [
    {
      id: 1,
      content: (
        <motion.span
          animate={{
            x: [0.5, 0.25, 0, -0.25, -0.5],
            y: [-0.6, 0.6, 0, -0.6, 0.6],
          }}
          transition={{
            repeat: Infinity,
            duration: 0.1,
            repeatType: 'reverse',
          }}
          className='bg-linear-to-b via-fg inline-block from-white via-30% to-blue-500 bg-clip-text text-transparent'
        >
          cool<span className='text-fg'>🥶</span>
        </motion.span>
      ),
    },
    {
      id: 2,
      content: (
        <span className='bg-linear-to-b via-fg inline-block from-white via-30% to-yellow-500 bg-clip-text text-transparent'>
          good
          <motion.span
            animate={{
              y: [2, 0, 2],
              x: [-0.5, 0, -0.5],
              rotateZ: ['-10deg', 0, '10deg'],
              scaleX: [1.1, 1, 1.1],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.25,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
            className='text-fg inline-block'
          >
            👍
          </motion.span>
        </span>
      ),
    },
    {
      id: 3,
      content: (
        <motion.span
          animate={{
            x: [-0.6, -0.3, 0, 0.3, 0.6],
            y: [0, 0.6, 0, 0.6, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 1,
            repeatType: 'reverse',
          }}
          className='bg-linear-to-b via-fg inline-block from-white via-30% to-pink-600 bg-clip-text text-transparent'
        >
          cute<span className='text-fg'>😻</span>
        </motion.span>
      ),
    },
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((state) => {
        if (state >= words.length - 1) return 0;
        return state + 1;
      });
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className='relative z-10 flex h-60 w-full items-center pt-14 md:h-80 md:pt-16 lg:items-start lg:py-16'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.1, 0.25, 0.4, 0.5, 0.75, 1] }}
        transition={{ ease: 'easeIn' }}
        className='relative w-full'
      >
        <Section id='hero' className='py-0! w-full'>
          <div className='space-y-2 px-4 py-10 md:px-0 lg:py-20'>
            <h1 className='font-pacifico text-fg text-4xl md:text-5xl xl:text-6xl'>
              Hi, I am Abam
            </h1>
            <h2 className='text-fg/90 text-base lg:text-lg'>
              Frontend Developer based in Indonesia
            </h2>
          </div>
        </Section>
      </motion.div>
    </div>
  );
}
