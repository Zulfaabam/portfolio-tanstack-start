import Section from '../section';
import { techStack as techStackBackup } from '@/lib/consts';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import TechStackBox, { TechStack } from '../about/tech-stack-box';
import { createServerFn } from '@tanstack/react-start';
import { useQuery } from '@tanstack/react-query';
import BentoBox from '../bento-box';
import { Image } from '@unpic/react';
import { IconCircleArrowDown, IconCircleArrowRight } from '@tabler/icons-react';
import FeaturedProjects from './featured-projects';

export const getTechStack = createServerFn({ method: 'GET' }).handler(
  async (): Promise<{
    data: TechStack[];
    error: { message: string } | null;
  }> => {
    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase.from('tech_stack').select('*');

    if (error) throw new Error(error.message);
    return { data, error };
  },
);

export default function BentoGridSection() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['techStack'],
    queryFn: () => getTechStack(),
  });

  if (isLoading)
    return (
      <Section id='about' className='py-0! space-y-6'>
        <div className='text-fg grid w-full grid-cols-1 grid-rows-2 gap-2 sm:grid-cols-2 lg:grid-cols-12 xl:gap-6'>
          <BentoBox className='col-span-9 row-span-2 flex h-[576px] flex-col justify-between'>
            <div></div>
          </BentoBox>
          <BentoBox className='col-span-3 row-span-1 flex h-[276px] flex-col justify-between'>
            <div></div>
          </BentoBox>
          <BentoBox className='col-span-3 row-span-1 flex h-[276px] flex-col justify-between'>
            <div></div>
          </BentoBox>
        </div>
        <div className='text-fg grid w-full grid-flow-col grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-12 xl:gap-6'>
          <BentoBox className='col-span-3 row-span-1 h-[180px]'>div</BentoBox>
          <BentoBox className='col-span-3 row-span-1 h-[204px]'>
            <div></div>
          </BentoBox>
          <BentoBox className='col-span-3 row-span-1 h-36'>
            <div></div>
          </BentoBox>
          <BentoBox className='col-span-9 row-span-3 flex h-[576px] flex-col justify-between'>
            <div></div>
          </BentoBox>
        </div>
      </Section>
    );
  if (error) return <p>Error loading tech stack</p>;

  const techStack = data?.data ?? techStackBackup;

  return (
    <Section id='about' className='py-0! space-y-6'>
      <div className='text-fg grid w-full grid-flow-row grid-cols-1 grid-rows-4 gap-4 sm:grid-cols-2 sm:grid-rows-2 md:grid-cols-3 lg:grid-cols-12 lg:grid-rows-2 xl:gap-6'>
        <BentoBox className='col-span-1 row-span-2 flex h-[576px] flex-col justify-between sm:col-span-2 lg:col-span-9'>
          <div className='space-y-6'>
            <Image
              src='/abam-working.jpg'
              layout='fullWidth'
              className='max-h-[356px] w-[736px] rounded-xl object-cover object-[25%_75%]'
            />
            <p className='text-justify'>
              Name’s Zulfa Fatah Akbar Ahmad. You can call me Abam, Frontend
              Developer with 3+ years of experience building production-grade
              web applications using React, Next.js, TypeScript and any other
              frontend technologies. Passionate about crafting seamless user
              experiences and writing clean, efficient code.
            </p>
            {/* <p className='text-justify'>
              Name’s Zulfa Fatah Akbar Ahmad. You can call me Abam. I have 3+
              years of experience as a Frontend Developer. I build primarily
              with React, Next.js, and TailwindCSS. I build reactive,
              progressive, responsive, and most importantly cool websites (also
              mobile apps using React Native 🤫)
            </p> */}
          </div>
          <button className='border-fg flex items-center gap-0.5 self-end rounded-full border py-1 pl-2 pr-1 text-sm'>
            Resume{' '}
            <span>
              <IconCircleArrowDown size={22} strokeWidth={1.5} />
            </span>
          </button>
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
                  <p>2025 - Now</p>
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
          <button className='border-fg flex items-center gap-0.5 self-end rounded-full border py-1 pl-2 pr-1 text-sm'>
            Full Journey{' '}
            <span>
              <IconCircleArrowRight size={22} strokeWidth={1.5} />
            </span>
          </button>
        </BentoBox>
        <BentoBox className='col-span-1 row-span-1 flex h-[276px] flex-col justify-between lg:col-span-3'>
          <h6 className='font-medium'>Tech Stack</h6>
          <TechStackBox techStack={techStack} />
        </BentoBox>
      </div>
      <div className='text-fg grid w-full grid-flow-row auto-rows-min grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-flow-col lg:grid-cols-12 xl:gap-6'>
        <BentoBox className='col-span-1 row-span-1 flex h-[180px] flex-col justify-between lg:col-span-3'>
          <h6 className='font-medium'>Latest Strava Activity</h6>
          <div className='space-y-5'>
            <div className='flex items-start gap-2'>
              <Image src='/icons/run.svg' width={20} height={20} />
              <div>
                <p className='text-sm'>Outdoor Running</p>
                <p className='text-fg/80 text-[10px]'>
                  14 Sept 2025 at 6:00 AM
                </p>
              </div>
            </div>
            <div className='flex justify-around'>
              <div>
                <p className='text-fg/80 text-[11px]'>Distance</p>
                <p className='text-sm font-medium'>5.00 km</p>
              </div>
              <div>
                <p className='text-fg/80 text-[11px]'>Pace</p>
                <p className='text-sm font-medium'>6:18 /km</p>
              </div>
              <div>
                <p className='text-fg/80 text-[11px]'>Time</p>
                <p className='text-sm font-medium'>31m 25s</p>
              </div>
            </div>
          </div>
        </BentoBox>
        <BentoBox className='col-span-1 row-span-1 h-[180px] lg:col-span-3 lg:h-[204px]'>
          image
        </BentoBox>
        <BentoBox className='col-span-1 row-span-1 h-[180px] lg:col-span-3 lg:h-36'>
          Contact
        </BentoBox>
        <BentoBox className='col-span-3 row-span-4 flex h-[576px] flex-col justify-between lg:col-span-9 lg:row-span-3'>
          <div>
            <h6 className='font-medium'>Featured Projects</h6>
            <div className='w-full'>
              <FeaturedProjects />
            </div>
          </div>
          <button className='border-fg flex items-center gap-0.5 self-end rounded-full border py-1 pl-2 pr-1 text-sm'>
            Projects{' '}
            <span>
              <IconCircleArrowRight size={22} strokeWidth={1.5} />
            </span>
          </button>
        </BentoBox>
      </div>
    </Section>
  );
}
