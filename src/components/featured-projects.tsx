import ProjectCard from './ui/project-card';
import { useQuery } from '@tanstack/react-query';
import { getFeaturedProjects } from '@/lib/server/project';
import { DirectionAwareHover } from './ui/direction-aware-hover';
import { Project } from 'types';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type FeaturedProject = Omit<Project, 'tech_stack'> & {
  tech_stack: {
    id: number;
    name: string;
  }[];
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
      const itemWidth = 472 + 16;
      const index = Math.round(scrollLeft / itemWidth);
      setActiveIndex(index);
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const itemWidth = 472 + 16;
      scrollRef.current.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth',
      });
      setActiveIndex(index);
    }
  };

  return (
    <div className='flex w-full flex-col gap-4'>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className='flex w-full snap-x snap-mandatory gap-3 overflow-x-scroll pl-1 scrollbar-hide *:snap-center lg:gap-4'
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
              className='h-[265px]! w-[472px]! shrink-0'
              imageClassName='object-cover'
            >
              <p className='font-medium'>{p.title}</p>
              <p className='max-w-[400px] text-sm'>{p.description}</p>
            </DirectionAwareHover>
          ))
        )}
      </div>

      <div className='flex justify-center gap-2'>
        {projects?.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToIndex(idx)}
            className={cn(
              'h-2 cursor-pointer rounded-full transition-all duration-300',
              activeIndex === idx ? 'bg-fg w-8' : 'bg-fg/20 hover:bg-fg/40 w-2',
            )}
            aria-label={`Go to project ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
