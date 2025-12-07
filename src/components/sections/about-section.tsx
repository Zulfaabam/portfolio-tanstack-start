import Section from '../section';
import { techStack as techStackBackup } from '@/lib/consts';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import TechStackBox, { TechStack } from '../about/tech-stack-box';
import AboutMeBox from '../about/about-me-box';
import MyJourneyRing from '../about/my-journey-ring';
import LongDescBox from '../about/long-desc-box';
import LearningBox from '../about/learning-box';
import { createServerFn } from '@tanstack/react-start';
import { useQuery } from '@tanstack/react-query';
import BentoBox from '../bento-box';
import { Image } from '@unpic/react';

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

export default function AboutSection() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['techStack'],
    queryFn: () => getTechStack(),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading tech stack</p>;

  const techStack = data?.data ?? techStackBackup;

  return (
    <Section id='about' className='py-0! space-y-6'>
      <div className='grid w-full grid-cols-1 grid-rows-2 gap-2 text-fg sm:grid-cols-2 lg:grid-cols-12 xl:gap-6'>
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
          <button className='block self-end rounded-full border border-fg py-1 pl-2 pr-1'>
            Resume
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
          <button className='block self-end rounded-full border border-fg py-1 pl-2 pr-1'>
            Resume
          </button>
        </BentoBox>
        <BentoBox className='col-span-3 row-span-1 flex h-[276px] flex-col justify-between'>
          <h6>Tech Stack</h6>
        </BentoBox>
      </div>
      <div className='grid w-full grid-flow-col grid-cols-1 gap-2 text-fg sm:grid-cols-2 lg:grid-cols-12 xl:gap-6'>
        <BentoBox className='col-span-3 row-span-1 h-[180px]'>sds</BentoBox>
        <BentoBox className='col-span-3 row-span-1 h-[204px]'>sds</BentoBox>
        <BentoBox className='col-span-3 row-span-1 h-36'>sds</BentoBox>
        <BentoBox className='col-span-9 row-span-3 h-[576px]'>sds</BentoBox>
      </div>
      {/* <TechStackBox techStack={techStack} />
      <AboutMeBox />
      <MyJourneyRing />
      <LongDescBox />
      <LearningBox /> */}
    </Section>
  );
}
