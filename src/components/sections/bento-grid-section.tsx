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
} from '@tabler/icons-react';
import FeaturedProjects from '../featured-projects';
import { Link } from '@tanstack/react-router';
import Signature from '../ui/signature';
import RippleButton from '../ui/ripple-btn';
import { motion } from 'motion/react';
import { getThisRepoCommits } from '@/lib/server/github';
import { useQuery } from '@tanstack/react-query';

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
    <Section id='about' className='py-0! space-y-4 xl:space-y-6'>
      <div className='grid w-full grid-cols-12 gap-4 lg:gap-6 text-text'>
        
        {/* Row 1: Left - Profile (Span 4) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className='bento-box col-span-12 lg:col-span-4 flex flex-col justify-between space-y-6 lg:h-[576px]'
        >
          <div className='space-y-6'>
            {/* Open to work badge */}
            <div className='flex items-center gap-2 w-fit px-3 py-1.5 rounded-full bg-white/5 border border-white/10'>
              <motion.span
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className='w-2 h-2 rounded-full bg-green-500 block'
              />
              <span className='text-xs text-text/80 font-mono'>Open to work</span>
            </div>
            
            <div className='space-y-1'>
              <h2 className='text-5xl md:text-6xl font-pacifico tracking-wide py-2'>Hi, I am Abam</h2>
              <h3 className='text-lg font-jetbrains-mono text-text/90 pt-2'>Frontend Engineer</h3>
            </div>
            
            <p className='text-sm text-text/80 leading-relaxed max-w-sm'>
              I build modern, performant, and accessible web applications with a focus on clean code and seamless user experience.
            </p>
            
            <div className='flex flex-wrap gap-3 pt-2'>
              <RippleButton as={Link} to='/projects' className='bg-white text-black hover:bg-white/90 px-4 py-2 rounded-lg border-0 font-medium'>
                <RippleButton.Text>View My Work</RippleButton.Text>
                <RippleButton.Icon>
                  <IconArrowRight size={18} />
                </RippleButton.Icon>
              </RippleButton>
              
              <RippleButton as='a' href='/CV_ZULFA.pdf' download className='bg-transparent text-white border border-border hover:bg-white/10 px-4 py-2 rounded-lg'>
                <RippleButton.Text>Download Resume</RippleButton.Text>
                <RippleButton.Icon>
                  <IconCircleArrowDown size={18} />
                </RippleButton.Icon>
              </RippleButton>
            </div>
          </div>
          
          <div className='space-y-3 pt-4'>
            <p className='text-xs text-text/60 font-jetbrains-mono'>Tech I work with</p>
            <div className='flex items-center gap-4 text-text/80'>
              <IconBrandReact size={24} />
              <IconBrandNextjs size={24} />
              <IconBrandTypescript size={24} />
              <IconBrandTailwind size={24} />
              <IconBrandJavascript size={24} />
              <IconBrandFigma size={24} />
            </div>
          </div>
        </motion.div>

        {/* Row 1: Middle - Experience (Span 5) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className='bento-box px-0! pt-0! pb-6 col-span-12 lg:col-span-5 flex flex-col justify-between overflow-hidden lg:h-[576px]'
        >
          <div className='w-full h-[380px] lg:h-[450px] relative overflow-hidden rounded-t-2xl'>
            <Image
              src='/abam-working.webp'
              layout='fullWidth'
              className='object-cover object-center w-full h-full'
            />
          </div>
          
          <div className='grid grid-cols-3 gap-2 px-4 pt-6 text-center divide-x divide-border'>
            <div className='flex flex-col gap-1 items-center justify-center'>
              <span className='text-2xl font-semibold'>3+</span>
              <span className='text-[10px] text-text/60 font-jetbrains-mono'>Years Experience</span>
            </div>
            <div className='flex flex-col gap-1 items-center justify-center'>
              <span className='text-2xl font-semibold'>10+</span>
              <span className='text-[10px] text-text/60 font-jetbrains-mono'>Projects Completed</span>
            </div>
            <div className='flex flex-col gap-1 items-center justify-center'>
              <span className='text-2xl font-semibold'>∞</span>
              <span className='text-[10px] text-text/60 font-jetbrains-mono'>Passion for Code</span>
            </div>
          </div>
        </motion.div>

        {/* Row 1: Right - Journey (Span 3) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className='bento-box col-span-12 lg:col-span-3 flex flex-col justify-between lg:h-[576px]'
        >
          <div className='space-y-8'>
            <div className='flex items-center gap-2'>
              <IconBriefcase size={20} className='text-text/80' />
              <h6 className='font-semibold text-lg'>Journey</h6>
            </div>
            
            <div className='space-y-8 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-border before:to-transparent flex flex-col justify-center pl-2'>
              <div className='relative ml-8'>
                <div className='absolute -left-[39px] top-1.5 h-3 w-3 rounded-full bg-border border-2 border-surface' />
                <div className='space-y-1.5'>
                  <p className='text-sm font-medium font-jetbrains-mono'>Frontend Dev @ Eksad</p>
                  <p className='text-xs text-text/50 font-jetbrains-mono'>Jakarta, Indonesia • 2025</p>
                </div>
              </div>
              
              <div className='relative ml-8'>
                <div className='absolute -left-[39px] top-1.5 h-3 w-3 rounded-full bg-border border-2 border-surface' />
                <div className='space-y-1.5'>
                  <p className='text-sm font-medium font-jetbrains-mono'>Frontend Dev @ Bukit Vista</p>
                  <p className='text-xs text-text/50 font-jetbrains-mono'>Bali, Indonesia • 2022 - 2024</p>
                </div>
              </div>
            </div>
          </div>
          
          <RippleButton as={Link} to='/journey' className='self-start mt-8 bg-transparent border border-border px-4 py-2 rounded-lg text-sm w-full justify-center'>
            <RippleButton.Text>View Full Journey</RippleButton.Text>
            <RippleButton.Icon>
              <IconArrowRight size={16} />
            </RippleButton.Icon>
          </RippleButton>
        </motion.div>

        {/* Row 2: Left - What I'm up to (Span 3) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className='bento-box col-span-12 lg:col-span-3 lg:h-80 space-y-6 flex flex-col'
        >
          <div className='flex items-center gap-2'>
            <IconBolt size={20} className='text-text/80' />
            <h6 className='font-semibold text-lg'>What I'm Up To</h6>
          </div>
          
          <div className='space-y-6 pt-4'>
            <div className='flex items-center gap-4 text-sm'>
              <IconSettings size={20} className='text-text/60' />
              <span className='font-jetbrains-mono'>Building <a href='https://pokepinpoint.netlify.app/' target='_blank' rel='noopener noreferrer' className='hover:text-primary transition-colors underline underline-offset-4 decoration-border'>PokePinpoint</a></span>
            </div>
            <div className='flex items-center gap-4 text-sm'>
              <IconTool size={20} className='text-text/60' />
              <span className='font-jetbrains-mono'>Learning backend tech</span>
            </div>
          </div>
        </motion.div>

        {/* Row 2: Middle - Featured Project (Span 5) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className='bento-box px-0! py-4! col-span-12 lg:col-span-5 flex flex-col lg:h-80 overflow-hidden'
        >
          <FeaturedProjects />
        </motion.div>

        {/* Row 2: Right - Play the Stack (Span 4) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className='bento-box col-span-12 lg:col-span-4 lg:h-80 flex flex-col'
        >
          <TechStackBox className='flex-1 h-full' />
        </motion.div>

        {/* Row 3: Quote (Span 12) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className='bento-box px-0! py-0! overflow-hidden col-span-12 h-[200px] md:h-[280px] relative flex items-center justify-center'
        >
          <div className='absolute inset-0 w-full h-full'>
            <Image
              src='/battlestation.webp'
              layout='fullWidth'
              className='object-cover object-center w-full h-full brightness-[0.3]'
            />
            <div className='absolute inset-0 bg-linear-to-r from-surface/80 via-surface/40 to-transparent' />
          </div>
          
          <div className='relative z-10 w-full px-8 md:px-16 flex flex-col items-start'>
            <span className='text-5xl md:text-7xl text-text/40 font-serif leading-none h-10'>"</span>
            <p className='font-jetbrains-mono text-xl md:text-3xl max-w-2xl text-text/90 mt-4 leading-relaxed'>
              Code is not just what I write,<br/>it's how I <span className='font-bold text-white'>solve</span> problems.
            </p>
          </div>
        </motion.div>

        {/* Row 4: Footer (Span 12) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className='bento-box col-span-12 flex flex-col md:flex-row items-center justify-between gap-4 py-4 md:py-3'
        >
          <p className='text-sm text-text/80 font-jetbrains-mono'>
            Let's build something amazing together 🤟
          </p>
          
          <div className='flex items-center gap-6'>
            <p className='text-xs text-text/60 font-jetbrains-mono'>
              Last update: {lastUpdate}
            </p>
            <Signature className='*:fill-text *:stroke-text size-12' />
          </div>
        </motion.div>

      </div>
    </Section>
  );
}

