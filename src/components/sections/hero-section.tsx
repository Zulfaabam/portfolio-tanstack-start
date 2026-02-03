import { motion } from 'framer-motion';
import Section from '../section';

export default function HeroSection() {
  return (
    <div className='relative z-10 flex h-60 w-full items-center pt-14 md:h-80 md:pt-16 lg:items-start lg:py-16'>
      <Section id='hero' className='py-0! w-full'>
        <div className='space-y-2 px-4 py-10 md:px-0 lg:py-20'>
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
          <motion.h2
            className='text-fg/80 text-base lg:text-lg'
            initial={{ filter: 'blur(10px)', opacity: 0 }}
            animate={{ filter: 'blur(0px)', opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            Frontend Developer based in Indonesia
          </motion.h2>
        </div>
      </Section>
    </div>
  );
}
