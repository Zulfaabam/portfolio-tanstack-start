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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading tech stack</p>;

  const techStack = data?.data ?? techStackBackup;

  return (
    <Section id='about' className='py-0! space-y-6'>
      <div className='text-fg grid w-full grid-cols-1 grid-rows-2 gap-2 sm:grid-cols-2 lg:grid-cols-12 xl:gap-6'>
        <BentoBox className='col-span-9 row-span-2 flex h-[576px] flex-col justify-between'>
          <div className='space-y-6'>
            <Image
              src='/abam-working.jpg'
              layout='fullWidth'
              className='max-h-[356px] w-[736px] rounded-xl object-cover object-[25%_75%]'
            />
            <p className='text-justify'>
              Name’s Zulfa Fatah Akbar Ahmad. You can call me Abam. I have 3+
              years of experience as a Frontend Developer. I build primarily
              with React, Next.js, and TailwindCSS. I build reactive,
              progressive, responsive, and most importantly cool websites (also
              mobile apps using React Native 🤫)
            </p>
          </div>
          <button className='border-fg flex items-center gap-0.5 self-end rounded-full border py-1 pl-2 pr-1 text-sm'>
            Resume{' '}
            <span>
              <IconCircleArrowDown size={22} strokeWidth={1.5} />
            </span>
          </button>
        </BentoBox>
        <BentoBox className='col-span-3 row-span-1 flex h-[276px] flex-col justify-between'>
          <div className='space-y-6'>
            <h6>Journey</h6>
            <div>
              <div>
                <p>dsds</p>
                <p>sdsdsd</p>
              </div>
              <div>
                <p>dsds</p>
                <p>sdsdsd</p>
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
        <BentoBox className='col-span-3 row-span-1 flex h-[276px] flex-col justify-between'>
          <h6>Tech Stack</h6>
          <TechStackBox techStack={techStack} />
        </BentoBox>
      </div>
      <div className='text-fg grid w-full grid-flow-col grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-12 xl:gap-6'>
        <BentoBox className='col-span-3 row-span-1 h-[180px]'>
          <h6>Latest Strava Activity</h6>
        </BentoBox>
        <BentoBox className='col-span-3 row-span-1 h-[204px]'>image</BentoBox>
        <BentoBox className='col-span-3 row-span-1 h-36'>Contact</BentoBox>
        <BentoBox className='col-span-9 row-span-3 flex h-[576px] flex-col justify-between'>
          <div>
            <h6>Featured Projects</h6>
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
