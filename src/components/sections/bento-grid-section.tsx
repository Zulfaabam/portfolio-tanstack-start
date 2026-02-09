import Section from '../section';
import TechStackBox from '../tech-stack-box';
import { Image } from '@unpic/react';
import {
  IconCircleArrowDown,
  IconCircleArrowRight,
  IconCircleArrowUpRight,
} from '@tabler/icons-react';
import FeaturedProjects from '../featured-projects';
import { Link } from '@tanstack/react-router';
import Signature from '../ui/signature';
import { DirectionAwareHover } from '../ui/direction-aware-hover';
import RippleButton from '../ui/ripple-btn';
import { miniJourneys } from '@/lib/consts';
import { motion } from 'motion/react';

export default function BentoGridSection() {
  return (
    <Section id='about' className='py-0! space-y-4 xl:space-y-6'>
      <div className='text-fg grid w-full grid-flow-row grid-cols-1 grid-rows-4 gap-4 sm:grid-cols-2 sm:grid-rows-2 md:grid-cols-3 lg:grid-cols-12 lg:grid-rows-2 xl:gap-6'>
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0 }}
          animate={{ filter: 'blur(0px)', opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className='bento-box col-span-1 row-span-2 flex h-[568px] flex-col justify-between sm:col-span-2 lg:col-span-9 lg:h-[576px]'
        >
          <div className='space-y-2 lg:space-y-4'>
            <Image
              src='/abam-working.webp'
              layout='fullWidth'
              className='max-h-[300px] w-[736px] rounded-lg object-cover object-[25%_75%] lg:max-h-[356px]'
            />
            <p className='text-justify text-[13px] leading-6 lg:text-sm'>
              Name’s Zulfa Fatah Akbar Ahmad. You can call me Abam, a Frontend
              Developer with 3+ years of experience building production-grade
              web applications using React, Next.js, TypeScript, TailwindCSS,
              and other modern frontend technologies. Strong in problem-solving,
              with a passion for crafting seamless user experiences and writing
              clean, efficient, and maintainable code.
            </p>
          </div>
          <div className='ml-auto flex items-center gap-2'>
            <RippleButton
              as='a'
              href='/CV_ZULFA.pdf'
              target='_blank'
              rel='noopener noreferrer'
              download
              className='self-end'
            >
              <RippleButton.Text>Resume</RippleButton.Text>
              <RippleButton.Icon>
                <IconCircleArrowDown size={22} strokeWidth={1.5} />
              </RippleButton.Icon>
            </RippleButton>
            <RippleButton
              as='a'
              href='mailto:zulfafatahakbar@gmail.com'
              className='self-end'
            >
              <RippleButton.Text>Let's Talk</RippleButton.Text>
              <RippleButton.Icon>
                <IconCircleArrowUpRight size={22} strokeWidth={1.5} />
              </RippleButton.Icon>
            </RippleButton>
          </div>
        </motion.div>
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0 }}
          animate={{ filter: 'blur(0px)', opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className='bento-box col-span-1 row-span-1 flex h-[276px] flex-col justify-between lg:col-span-3'
        >
          <div className='space-y-6'>
            <h6 className='font-semibold'>Journey</h6>
            <div className='space-y-4'>
              {miniJourneys.map((j) => (
                <div className='space-y-0.5' key={j.id}>
                  <p className='text-sm'>{j.job}</p>
                  <div className='text-fg/80 flex items-center gap-2 text-xs'>
                    <p>{j.place}</p>
                    <span className='bg-fg/40 h-3 w-px'></span>
                    <p>{j.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <RippleButton as={Link} to='/journey' className='self-end'>
            <RippleButton.Text>Full Journey</RippleButton.Text>
            <RippleButton.Icon>
              <IconCircleArrowRight size={22} strokeWidth={1.5} />
            </RippleButton.Icon>
          </RippleButton>
        </motion.div>
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0 }}
          animate={{ filter: 'blur(0px)', opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className='bento-box col-span-1 row-span-1 h-[276px] space-y-6 lg:col-span-3'
        >
          <h6 className='font-semibold'>What I'm Up to</h6>
          <div className='space-y-2'>
            <p className='text-fg flex gap-2 text-sm'>
              <span>🟢</span> Open to work
            </p>
            <p className='text-fg flex gap-2 text-sm'>
              <span>🌱</span> Now learning: Node.js & Backend techs
            </p>
            <p className='text-fg flex gap-2 text-sm'>
              <span>👨‍💻</span> Working on this portfolio
            </p>
          </div>
        </motion.div>
      </div>
      <div className='text-fg grid w-full auto-cols-min grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12 lg:gap-6'>
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0 }}
          animate={{ filter: 'blur(0px)', opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className='bento-box col-span-3 row-span-3 flex h-full flex-col-reverse gap-4 md:col-span-6 md:h-[276px] md:flex-row md:gap-9 lg:justify-between'
        >
          <TechStackBox />
        </motion.div>
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0 }}
          animate={{ filter: 'blur(0px)', opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className='bento-box px-0! col-span-3 flex h-[492px] flex-col justify-between md:col-span-6 md:row-span-6'
        >
          <FeaturedProjects />
          <div className='w-fit self-end px-4'>
            <RippleButton as={Link} to='/projects'>
              <RippleButton.Text>Projects</RippleButton.Text>
              <RippleButton.Icon>
                <IconCircleArrowRight size={22} strokeWidth={1.5} />
              </RippleButton.Icon>
            </RippleButton>
          </div>
        </motion.div>
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0 }}
          animate={{ filter: 'blur(0px)', opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className='bento-box col-span-3 row-span-4 h-[276px] space-y-4 md:col-span-6 lg:col-span-6'
        >
          <div className='relative h-full w-full'>
            <DirectionAwareHover imageUrl='/battlestation.webp'>
              <p className='mb-1 font-medium'>The Battlestation</p>
              <p className='max-w-[430px] text-xs'>
                <span className='font-medium'>Specs</span>: AMD Ryzen 5 7500F,
                AMD Radeon RX 6700 XT, 16GB RAM, 1TB Storage
              </p>
            </DirectionAwareHover>
          </div>
        </motion.div>
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0 }}
          animate={{ filter: 'blur(0px)', opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className='bento-box col-span-3 row-span-1 flex h-[60px] items-center justify-between md:col-span-6'
        >
          <p className='text-fg/80 text-xs md:text-sm'>
            Last update: 04 February 2026
          </p>
          <Signature className='*:fill-fg *:stroke-fg w-10' />
        </motion.div>
      </div>
    </Section>
  );
}
