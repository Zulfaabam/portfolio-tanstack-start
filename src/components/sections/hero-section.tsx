import { motion } from 'motion/react';
import Section from '../section';

export default function HeroSection() {
  return (
    <div className='relative z-10 flex h-60 w-full items-center pt-16 md:h-80 lg:items-start lg:py-16'>
      <Section id='hero' className='py-0! w-full'>
        <div className='space-y-2 py-10 lg:py-20'>
          <motion.h1
            className='font-pacifico text-fg text-4xl md:text-5xl xl:text-6xl'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {'Hi, I am Abam'.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ y: 50, rotateX: -90, opacity: 0 }}
                animate={{ y: 0, rotateX: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.03,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className='inline-block'
                style={{ transformStyle: 'preserve-3d' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.div
            initial={{ filter: 'blur(10px)', opacity: 0 }}
            animate={{ filter: 'blur(0px)', opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.8,
              ease: [0.4, 0, 0.2, 1],
            }}
            className='flex items-center gap-2'
          >
            <h2 className='text-fg/80 text-base lg:text-lg'>
              Frontend Engineer
            </h2>
            <div className='text-fg/80 flex w-fit min-w-[100px] items-center gap-1 rounded-full border border-neutral-800 bg-neutral-900 px-1.5 py-1 text-[10px] md:gap-2 md:px-2 md:text-xs'>
              <div className='relative flex size-1.5 items-center justify-center md:size-2'>
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75'></span>
                <span className='relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500'></span>
              </div>
              <p>Open to work</p>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
