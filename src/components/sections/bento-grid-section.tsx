import Section from '../section';
import { techStack as techStackBackup } from '@/lib/consts';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import TechStackBox, { TechStack } from '../about/tech-stack-box';
import { createServerFn } from '@tanstack/react-start';
import { useQuery } from '@tanstack/react-query';
import BentoBox from '../bento-box';
import { Image } from '@unpic/react';
import {
  IconCircleArrowDown,
  IconCircleArrowRight,
  IconCircleArrowUpRight,
} from '@tabler/icons-react';
import FeaturedProjects from './featured-projects';
import PixelPlayground from '../pixel-playground';
import { Link } from '@tanstack/react-router';

export const getTechStack = createServerFn({ method: 'GET' }).handler(
  async (): Promise<{
    data: TechStack[];
    error: { message: string } | null;
  }> => {
    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase
      .from('tech_stack')
      .select('*')
      .eq('is_main_tech', true);

    if (error) throw new Error(error.message);
    return { data, error };
  },
);

export default function BentoGridSection() {
  const {
    data,
    error,
    isLoading: loadingTechStack,
  } = useQuery({
    queryKey: ['techStack'],
    queryFn: () => getTechStack(),
  });

  const techStack = data?.data ?? techStackBackup;

  return (
    <Section id='about' className='py-0! space-y-6'>
      <div className='text-fg grid w-full grid-flow-row grid-cols-1 grid-rows-4 gap-4 sm:grid-cols-2 sm:grid-rows-2 md:grid-cols-3 lg:grid-cols-12 lg:grid-rows-2 xl:gap-6'>
        <BentoBox className='col-span-1 row-span-2 flex h-[576px] flex-col justify-between sm:col-span-2 lg:col-span-9'>
          <div className='space-y-6'>
            <Image
              src='/abam-working.webp'
              layout='fullWidth'
              className='max-h-[356px] w-[736px] rounded-xl object-cover object-[25%_75%]'
            />
            <p className='text-justify text-sm leading-6'>
              Name’s Zulfa Fatah Akbar Ahmad. You can call me Abam, a Frontend
              Developer with 3+ years of experience building production-grade
              web applications using React, Next.js, TypeScript, TailwindCSS,
              and other modern frontend technologies. Strong in problem-solving,
              with a passion for crafting seamless user experiences and writing
              clean, efficient, and maintainable code.
            </p>
          </div>
          <div className='ml-auto flex items-center gap-2'>
            <a
              className='border-fg flex cursor-pointer items-center gap-0.5 self-end rounded-full border py-1 pl-2 pr-1 text-sm'
              href='/CV_ZULFA.pdf'
              target='_blank'
              rel='noopener noreferrer'
              download
            >
              Resume{' '}
              <span>
                <IconCircleArrowDown size={22} strokeWidth={1.5} />
              </span>
            </a>
            <a
              className='border-fg flex cursor-pointer items-center gap-0.5 self-end rounded-full border py-1 pl-2 pr-1 text-sm'
              href='mailto:zulfafatahakbar@gmail.com'
            >
              Let's Talk{' '}
              <span>
                <IconCircleArrowUpRight size={22} strokeWidth={1.5} />
              </span>
            </a>
          </div>
        </BentoBox>
        <BentoBox className='col-span-1 row-span-1 flex h-[276px] flex-col justify-between lg:col-span-3'>
          <div className='space-y-6'>
            <h6 className='font-medium'>Journey</h6>
            <div className='space-y-4'>
              <div className='space-y-0.5'>
                <p className='text-sm'>Frontend Dev @ Eksad</p>
                <div className='text-fg/80 flex items-center gap-2 text-xs'>
                  <p>Jakarta, Indonesia</p>
                  <span className='bg-fg/40 h-3 w-px'></span>
                  <p>2025</p>
                </div>
              </div>
              <div className='space-y-0.5'>
                <p className='text-sm'>Frontend Dev @ Bukit Vista</p>
                <div className='text-fg/80 flex h-full items-center gap-2 text-xs'>
                  <p>Bali, Indonesia</p>
                  <span className='bg-fg/40 h-3 w-px'></span>
                  <p>2022 - 2024</p>
                </div>
              </div>
            </div>
          </div>
          <Link
            to='/journey'
            className='border-fg flex cursor-pointer items-center gap-0.5 self-end rounded-full border py-1 pl-2 pr-1 text-sm'
          >
            Full Journey{' '}
            <span>
              <IconCircleArrowRight size={22} strokeWidth={1.5} />
            </span>
          </Link>
        </BentoBox>
        <BentoBox className='col-span-1 row-span-1 h-[276px] space-y-6 lg:col-span-3'>
          <h6 className='font-medium'>What I'm Up to</h6>
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
        </BentoBox>
      </div>
      <div className='text-fg grid w-full auto-cols-min grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12 lg:gap-6'>
        <BentoBox className='col-span-1 row-span-3 h-[276px] space-y-6 md:col-span-3'>
          <h6 className='font-medium'>Tech Stack</h6>
          {loadingTechStack ? (
            <div className='h-4 w-8 animate-pulse rounded-xl bg-gray-400'></div>
          ) : (
            <TechStackBox techStack={techStack} />
          )}
          {error && <p>Error loading tech stack</p>}
        </BentoBox>
        <BentoBox className='col-span-1 row-span-3 h-[276px] md:col-span-3'>
          <PixelPlayground />
        </BentoBox>
        <BentoBox className='col-span-3 flex h-[492px] flex-col justify-between md:col-span-6 md:row-span-6'>
          <div>
            <h6 className='font-medium'>Featured Projects</h6>
            <div className='w-full'>
              <FeaturedProjects />
            </div>
          </div>
          <Link
            to='/projects'
            className='border-fg flex items-center gap-0.5 self-end rounded-full border py-1 pl-2 pr-1 text-sm'
          >
            Projects{' '}
            <span>
              <IconCircleArrowRight size={22} strokeWidth={1.5} />
            </span>
          </Link>
        </BentoBox>
        <BentoBox className='col-span-1 row-span-4 h-[276px] space-y-4 md:col-span-6 lg:col-span-6'>
          <div className='relative h-full w-full'>
            <div className='absolute inset-0 rounded-lg bg-black/50' />
            <Image
              src='/battlestation.webp'
              layout='fullWidth'
              className='h-full w-full select-none rounded-lg object-cover object-[25%_75%]'
            />
            <p className='absolute right-3 top-3 text-sm'>The Battlestation</p>
            <p className='absolute bottom-3 left-3 text-xs'>
              <span className='font-medium'>PC specs</span>: AMD Ryzen 5 7500F,
              AMD Radeon RX 6700 XT, 16GB RAM, 1TB Storage
            </p>
          </div>
        </BentoBox>
        <BentoBox className='col-span-1 row-span-1 flex h-[60px] items-center justify-end md:col-span-6'>
          <p className='text-fg/80 text-sm'>Last update: 27 January 2026</p>
        </BentoBox>
      </div>
    </Section>
  );
}
