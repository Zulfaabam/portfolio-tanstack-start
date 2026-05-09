import { useQuery } from '@tanstack/react-query';
import { getFeaturedProjects } from '@/lib/server/project';
import { Project, ProjectTechStack } from 'types';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { DirectionAwareHover } from './ui/direction-aware-hover';
import { motion } from 'motion/react';
import {
  IconBrandGithub,
  IconExternalLink,
  IconCube,
} from '@tabler/icons-react';
import { Image } from '@unpic/react';

type FeaturedProject = Omit<Project, 'tech_stack'> & {
  tech_stack: ProjectTechStack[];
};

export default function FeaturedProjects() {
  const { data, error } = useQuery({
    queryKey: ['featuredProjects'],
    queryFn: () => getFeaturedProjects(),
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const projects: FeaturedProject[] | undefined = data?.data
    ?.sort((a, b) => {
      return b.created_at!.localeCompare(a.created_at!);
    })
    .map((p) => ({
      ...p,
      tech_stack: p.tech_stack.map((ts) => ({
        id: ts.id,
        name: ts.tech_stack.name,
      })),
    }));

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const isMobile = window.innerWidth < 768;
      const itemWidth = isMobile ? 280 : 1200;
      const index = Math.round(scrollLeft / itemWidth);
      setActiveIndex(index);
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const isMobile = window.innerWidth < 768;
      const itemWidth = isMobile ? 280 : 1200;
      scrollRef.current.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth',
      });
      setActiveIndex(index);
    }
  };

  return (
    <div className='flex w-full flex-col gap-[23px]'>
      <div className='flex items-center justify-between px-4'>
        <div className='text-text flex items-center gap-2'>
          <IconCube size={20} />
          <h6 className='text-lg font-semibold'>Featured Projects</h6>
        </div>
        <div className='flex justify-center gap-2'>
          {projects?.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className={cn(
                'h-2 cursor-pointer rounded-full transition-all duration-300',
                activeIndex === idx
                  ? 'bg-text/90 w-8'
                  : 'bg-muted/70 hover:bg-fg/40 w-2',
              )}
              aria-label={`Go to project ${idx + 1}`}
            />
          ))}
        </div>
      </div>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className='flex w-full snap-x snap-mandatory gap-4 overflow-x-scroll px-4 py-px scrollbar-hide *:snap-center'
      >
        {error ? (
          <p className='text-center text-red-400 sm:col-span-2'>
            {error.message}
          </p>
        ) : (
          projects?.map((p) => (
            <div className='group flex h-full w-full shrink-0 gap-4 overflow-hidden rounded-lg'>
              <div className='relative flex aspect-video w-full items-center justify-center gap-6 rounded-lg bg-neutral-900 p-4'>
                <div className='mx-auto w-[90%]'>
                  <Image
                    alt='image'
                    className='group-hover:scale-103 size-full select-none rounded-lg object-contain transition-transform duration-700'
                    layout='fullWidth'
                    src={p.image}
                  />
                </div>

                {/* <div className='w-[20%]'>
                  <div className='flex items-center'>
                    {p.tech_stack?.map((tech, idx) => (
                      <p
                        key={tech.id}
                        className='text-fg space-x-1 text-[10px] uppercase'
                      >
                        <span>{tech.name}</span>
                        {idx !== p.tech_stack.length - 1 && (
                          <span className='mr-1'>/</span>
                        )}
                      </p>
                    ))}
                  </div>
                  <p className='font-semibold'>{p.title}</p>
                </div> */}
              </div>

              {/* <div className='flex h-full flex-col gap-6 rounded-md border pl-4'>
                <div className='space-y-0.5'>
                  <div className='flex items-center'>
                    {p.tech_stack?.map((tech, idx) => (
                      <p
                        key={tech.id}
                        className='text-fg space-x-1 text-[10px] uppercase'
                      >
                        <span>{tech.name}</span>
                        {idx !== p.tech_stack.length - 1 && (
                          <span className='mr-1'>/</span>
                        )}
                      </p>
                    ))}
                  </div>
                  <p className='font-semibold'>{p.title}</p>
                </div>
                <p className='text-fg min-w-[300px] max-w-[300px] text-sm'>
                  {p.description}
                </p>
                <div className='flex items-center justify-between gap-1 justify-self-end text-xs uppercase lg:gap-2'>
                  {!p.github_url && !p.live_url && (
                    <p className='text-fg'>Privated</p>
                  )}
                  {p.github_url && (
                    <motion.a
                      whileHover={{ translateY: -2 }}
                      href={p.github_url}
                      className='text-fg flex cursor-pointer items-center justify-center'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <span className='flex items-center gap-1'>
                        Github <IconBrandGithub strokeWidth={1.5} size={16} />
                      </span>
                    </motion.a>
                  )}
                  {p.live_url && (
                    <motion.a
                      whileHover={{ translateY: -2 }}
                      href={p.live_url}
                      className='text-fg flex cursor-pointer items-center justify-center'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <span className='flex items-center gap-1'>
                        Live Demo{' '}
                        <IconExternalLink strokeWidth={1.5} size={16} />
                      </span>
                    </motion.a>
                  )}
                </div>
              </div> */}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
