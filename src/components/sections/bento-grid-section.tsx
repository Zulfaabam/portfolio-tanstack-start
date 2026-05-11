import Section from '../section';
import TechStackBox from '../tech-stack-box';
import { Image } from '@unpic/react';
import {
  IconCircleArrowDown,
  IconArrowRight,
  IconBriefcase,
  IconBolt,
  IconSettings,
  IconTool,
  IconBrandReact,
  IconBrandNextjs,
  IconBrandTailwind,
  IconBrandTypescript,
  IconBrandJavascript,
  IconBrandFigma,
  IconDownload,
} from '@tabler/icons-react';
import FeaturedProjects from '../featured-projects';
import { Link } from '@tanstack/react-router';
import Signature from '../ui/signature';
import RippleButton from '../ui/ripple-btn';
import { motion } from 'motion/react';
import { getThisRepoCommits } from '@/lib/server/github';
import { useQuery } from '@tanstack/react-query';
import { miniJourneys } from '@/lib/consts';
import { DirectionAwareHover } from '../ui/direction-aware-hover';

const blurFadeInAnimation = {
  initial: { opacity: 0, filter: 'blur(40px)' },
  animate: { opacity: 1, filter: 'blur(0px)' },
};

export default function BentoGridSection() {
  const { data } = useQuery({
    queryKey: ['github-commits'],
    queryFn: () => getThisRepoCommits(),
  });

  const commitDate = data?.data?.[0]?.commit?.committer?.date;
  const lastUpdate = commitDate
    ? new Date(commitDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '14 Feb 2026';

  return (
    <Section id='homepage' className='pb-0 pt-20 xl:pt-32'>
      <div className='text-text grid w-full grid-cols-12 gap-4 lg:gap-x-4 lg:gap-y-6'>
        {/* Row 1: Left - Profile (Span 4) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className='lg:col-span-6! xl:col-span-4! col-span-12 flex flex-col gap-4 lg:gap-6'
        >
          {/* Open to work badge */}
          <div className='border-border bg-surface flex w-fit items-center gap-2 rounded-full border px-3 py-1.5'>
            <motion.span
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className='block h-2 w-2 rounded-full bg-green-500'
            />
            <span className='text-text/80 font-mono text-xs'>Open to work</span>
          </div>

          <div className='space-y-2'>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className='font-pacifico text-text text-4xl tracking-wide md:text-[52px]'
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
            <h2 className='text-text/90 text-base md:text-lg'>
              Frontend Engineer
            </h2>
          </div>

          <p className='text-muted max-w-sm text-sm leading-relaxed'>
            I build modern, performant, and accessible web applications with a
            focus on clean code and seamless user experience.
          </p>

          <div className='flex flex-wrap gap-3'>
            <RippleButton
              as={Link}
              to='/projects'
              className='bg-text text-bg hover:bg-text/90 flex items-center gap-1 rounded-lg border-0 px-2 py-2 font-medium sm:px-4'
            >
              <RippleButton.Text>View My Work</RippleButton.Text>
              <RippleButton.Icon>
                <IconArrowRight size={16} />
              </RippleButton.Icon>
            </RippleButton>

            <RippleButton
              as='a'
              href='/CV_ZULFA.pdf'
              download
              className='border-border bg-surface hover:bg-text/10 text-text flex items-center gap-1 rounded-lg border px-2 py-2 sm:px-4'
            >
              <RippleButton.Text>Download Resume</RippleButton.Text>
              <RippleButton.Icon>
                <IconDownload size={16} />
              </RippleButton.Icon>
            </RippleButton>
          </div>

          {/* <div className='space-y-2 md:space-y-3'>
            <p className='text-text/60 text-xs'>Tech I work with</p>
            <div className='text-text/80 flex items-center gap-4'>
              <IconBrandReact size={24} />
              <IconBrandNextjs size={24} />
              <IconBrandTypescript size={24} />
              <IconBrandTailwind size={24} />
              <IconBrandJavascript size={24} />
              <IconBrandFigma size={24} />
            </div>
          </div> */}
        </motion.div>

        {/* Row 1: Middle - Experience (Span 5) */}
        <motion.div
          {...blurFadeInAnimation}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className='bento-box lg:col-span-6! xl:col-span-5! col-span-12 flex h-full flex-col justify-between overflow-hidden p-2'
        >
          <div className='relative aspect-video w-full overflow-hidden rounded-sm'>
            <Image
              src='/abam-working.webp'
              layout='fullWidth'
              className='h-full w-full object-cover object-center'
            />
          </div>

          <div className='divide-border grid grid-cols-3 gap-2 divide-x py-3 text-center'>
            <div className='flex flex-col items-center justify-center gap-1'>
              <span className='text-xl font-semibold md:text-2xl'>3+</span>
              <span className='text-muted text-[10px]'>Years Experience</span>
            </div>
            <div className='flex flex-col items-center justify-center gap-1'>
              <span className='text-xl font-semibold md:text-2xl'>10+</span>
              <span className='text-muted text-[10px]'>Projects Completed</span>
            </div>
            <div className='flex flex-col items-center justify-center gap-1'>
              <span className='text-xl font-semibold md:text-2xl'>∞</span>
              <span className='text-muted text-[10px]'>Joy of Learning</span>
            </div>
          </div>
        </motion.div>

        {/* Row 1: Right - Journey (Span 3) */}
        <motion.div
          {...blurFadeInAnimation}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className='bento-box md:col-span-6! xl:col-span-3! col-span-12 flex h-full flex-col justify-between gap-8'
        >
          <div className='space-y-6'>
            <div className='flex items-center gap-2'>
              <IconBriefcase size={20} className='text-text' />
              <h6 className='text-lg font-semibold'>Journey</h6>
            </div>

            <div className='flex flex-col justify-center space-y-4'>
              {miniJourneys.map((j) => (
                <div className='space-y-1.5' key={j.id}>
                  <p className='text-sm font-medium'>{j.job}</p>
                  <p className='text-muted text-xs'>
                    {j.place} • {j.year}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <RippleButton
            as={Link}
            to='/journey'
            className='border-border w-full justify-center self-start rounded-md border bg-transparent px-4 py-2 text-sm'
          >
            <RippleButton.Text>View Full Journey</RippleButton.Text>
            <RippleButton.Icon>
              <IconArrowRight size={16} />
            </RippleButton.Icon>
          </RippleButton>
        </motion.div>

        {/* Row 2: Left - What I'm up to (Span 3) */}
        <motion.div
          {...blurFadeInAnimation}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className='bento-box md:col-span-6! xl:col-span-3! md:h-full! col-span-12 flex h-52 flex-col gap-6 lg:h-80'
        >
          <div className='flex items-center gap-2'>
            <IconBolt size={20} className='text-text' />
            <h6 className='text-lg font-semibold'>What I'm Up To</h6>
          </div>

          <div className='space-y-4'>
            <div className='flex items-center gap-2 text-sm'>
              <IconSettings size={18} className='text-muted' />
              <span>
                Building{' '}
                <a
                  href='https://pokepinpoint.netlify.app/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-primary decoration-muted underline underline-offset-4 transition-colors'
                >
                  PokePinpoint
                </a>
              </span>
            </div>
            <div className='flex items-center gap-2 text-sm'>
              <IconTool size={18} className='text-muted' />
              <span>Learning backend tech</span>
            </div>
          </div>
        </motion.div>

        {/* Row 2: Middle - Gallery (Span 5) */}
        <motion.div
          {...blurFadeInAnimation}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className='bento-box lg:col-span-6! xl:col-span-4! relative col-span-12 flex flex-col overflow-hidden p-2 lg:h-80'
        >
          <div className='h-full w-full'>
            <DirectionAwareHover imageUrl='/battlestation.webp'>
              <p className='mb-1 font-medium'>The Battlestation</p>
              <p className='max-w-[calc(100vw-75px)] text-xs md:max-w-[350px]'>
                <span className='font-medium'>Specs</span>: AMD Ryzen 5 7500F,
                AMD Radeon RX 6700 XT, 16GB RAM, 1TB Storage
              </p>
            </DirectionAwareHover>
          </div>
        </motion.div>

        {/* Row 2: Right - Play the Stack (Span 4) */}
        <motion.div
          {...blurFadeInAnimation}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className='bento-box lg:col-span-6! xl:col-span-5! col-span-12 flex flex-col lg:h-80'
        >
          <TechStackBox className='h-full flex-1' />
        </motion.div>

        {/* Row 3: Quote (Span 12) */}
        <motion.div
          {...blurFadeInAnimation}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className='bento-box relative col-span-12 flex items-center justify-center overflow-hidden px-0'
        >
          <FeaturedProjects />
        </motion.div>

        {/* Row 4: Footer (Span 12) */}
        <motion.div
          {...blurFadeInAnimation}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className='bento-box col-span-12 flex flex-col items-center justify-between gap-4 md:flex-row'
        >
          <p className='text-muted hidden text-sm md:block'>
            Let's build something amazing together 🤟
          </p>

          <div className='flex items-center gap-6'>
            <p className='text-muted text-xs'>Last update: {lastUpdate}</p>
            <Signature className='*:fill-text *:stroke-text size-12' />
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
