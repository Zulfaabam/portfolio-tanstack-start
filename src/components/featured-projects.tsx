import { useQuery } from '@tanstack/react-query';
import { getFeaturedProjects } from '@/lib/server/project';
import { Project, ProjectTechStack } from 'types';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  IconBrandGithub,
  IconExternalLink,
  IconCube,
} from '@tabler/icons-react';
import { Image } from '@unpic/react';
import { BottomSheet } from './ui/bottom-sheet';

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
  const [selectedProject, setSelectedProject] =
    useState<FeaturedProject | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

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
      const { scrollLeft, clientWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      setActiveIndex(index);
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.clientWidth;
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
                  : 'bg-muted/70 hover:bg-text/70 w-2',
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
            <div
              key={p.id}
              onClick={() => {
                setSelectedProject(p);
                setIsBottomSheetOpen(true);
              }}
              className='group flex h-full w-full shrink-0 cursor-pointer gap-4 overflow-hidden rounded-lg'
            >
              <div className='bg-surface2 relative flex aspect-video w-full items-center justify-center gap-6 rounded-lg p-4'>
                <div className='mx-auto w-full sm:w-[90%]'>
                  <Image
                    alt='image'
                    className='group-hover:scale-103 border-border size-full select-none rounded-lg border object-contain transition-transform duration-700'
                    layout='fullWidth'
                    src={p.image}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        title='Project Details'
      >
        {selectedProject && (
          <div className='mx-auto flex max-w-6xl flex-col gap-6 py-4'>
            <div className='bg-surface2 border-border relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border'>
              <div className='w-[90%]'>
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  layout='fullWidth'
                  className='h-full w-full rounded-lg object-contain'
                />
              </div>
            </div>

            <div className='space-y-4'>
              <div className='flex flex-col gap-2'>
                <h2 className='text-text text-lg font-bold sm:text-xl'>
                  {selectedProject.title}
                </h2>
                <div className='flex flex-wrap gap-2'>
                  {selectedProject.tech_stack.map((tech) => (
                    <span
                      key={tech.id}
                      className='bg-surface2 text-muted rounded-full px-3 py-1 text-[10px] font-medium sm:text-xs'
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>

              <p className='text-muted text-sm leading-relaxed sm:text-base'>
                {selectedProject.description}
              </p>

              <div className='mt-10 flex items-center gap-2 sm:gap-4'>
                {selectedProject.github_url && (
                  <a
                    href={selectedProject.github_url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='bg-text text-bg flex cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-medium transition-opacity hover:opacity-90 sm:text-sm'
                  >
                    <IconBrandGithub size={16} />
                    <span>View GitHub</span>
                  </a>
                )}
                {selectedProject.live_url && (
                  <a
                    href={selectedProject.live_url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='border-border bg-surface text-text flex items-center gap-2 rounded-lg border px-4 py-2 text-xs font-medium transition-colors hover:bg-white/5 sm:text-sm'
                  >
                    <IconExternalLink size={16} />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </BottomSheet>
    </div>
  );
}
