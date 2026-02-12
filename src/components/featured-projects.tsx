import { useQuery } from '@tanstack/react-query';
import { getFeaturedProjects } from '@/lib/server/project';
import { Project, ProjectTechStack } from 'types';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { DirectionAwareHover } from './ui/direction-aware-hover';
import { motion } from 'motion/react';
import { IconBrandGithub, IconExternalLink } from '@tabler/icons-react';

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
      const itemWidth = isMobile ? 280 : 472;
      const index = Math.round(scrollLeft / itemWidth);
      setActiveIndex(index);
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const isMobile = window.innerWidth < 768;
      const itemWidth = isMobile ? 280 : 472;
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
        <h6 className='font-semibold'>Featured Projects</h6>
        <div className='flex justify-center gap-2'>
          {projects?.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className={cn(
                'h-2 cursor-pointer rounded-full transition-all duration-300',
                activeIndex === idx
                  ? 'bg-fg w-8'
                  : 'bg-fg/20 hover:bg-fg/40 w-2',
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
            <DirectionAwareHover
              key={p.id}
              imageUrl={p.image}
              className='h-[340px] w-[280px] shrink-0 sm:h-[295px] sm:w-[472px]'
              imageClassName='object-left sm:object-center'
              childrenClassName='inset-0! p-4 flex flex-col justify-between'
            >
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
                <h6 className='text-fg text-xl'>{p.title}</h6>
              </div>
              <div className='space-y-2'>
                <p className='text-fg line-clamp-3 text-sm'>{p.description}</p>
                <div className='h-px w-full bg-[#d9d9d9]'></div>
                <div className='flex items-center justify-between gap-1 text-xs uppercase lg:gap-2'>
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
              </div>
            </DirectionAwareHover>
          ))
        )}
      </div>
    </div>
  );
}
