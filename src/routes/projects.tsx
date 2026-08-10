import { useState } from 'react';
import ErrorContent from '@/components/error-content';
import Section from '@/components/section';
import ProjectItem from '@/components/ui/project-item';
import { BottomSheet } from '@/components/ui/bottom-sheet';
import { getProjects } from '@/lib/server/project';
import { createFileRoute } from '@tanstack/react-router';
import { Project } from 'types';
import { Image } from '@unpic/react';
import { IconBrandGithub, IconExternalLink } from '@tabler/icons-react';

type ProjectData = Omit<Project, 'tech_stack'> & {
  tech_stack: { id: number; name: string }[];
};

export const Route = createFileRoute('/projects')({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      { title: 'Abams Projects' },
      {
        name: 'description',
        content:
          'Various projects I built, from day one I learn Frontend Development until now. Some I built it solo, some collaborated with other devs during my office work. Please take a look',
      },
    ],
  }),
  errorComponent: ({ reset }) => (
    <div className='bg-bg relative flex min-h-screen w-full items-center'>
      <Section
        id='error-projects'
        className='flex flex-col items-center justify-center gap-2'
      >
        <ErrorContent reset={() => reset()} />
      </Section>
    </div>
  ),
  component: Projects,
  loader: () => getProjects(),
});

function Projects() {
  const { data, error } = Route.useLoaderData();
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const projects: ProjectData[] = data
    ?.sort((a, b) => {
      return b.created_at!.localeCompare(a.created_at!);
    })
    ?.map((d: Project) => ({
      ...d,
      tech_stack: d.tech_stack.map((stack) => ({
        id: stack.id,
        name: stack.tech_stack.name,
      })),
    }));

  return (
    <div className='bg-bg relative min-h-screen w-full'>
      <Section id='projects' className='relative z-10'>
        <div className='py-10 lg:py-20'>
          <h2 className='text-text mb-4 max-w-4xl text-2xl md:text-4xl'>
            My Projects
          </h2>
          <p className='text-muted max-w-md text-sm md:text-base'>
            Various projects I built, from day one I learn Frontend Development
            until now. Some I built it solo, some collaborated with other devs
            during my office work. Please take a look.
          </p>
        </div>
        <div className='flex flex-col'>
          {error ? (
            <p className='text-center text-red-400'>
              {error?.message ?? 'Something when wrong!'}
            </p>
          ) : (
            projects?.map((p) => (
              <ProjectItem
                key={p.id}
                {...p}
                onClick={() => {
                  setSelectedProject(p);
                  setIsBottomSheetOpen(true);
                }}
              />
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
                    src={
                      selectedProject.image
                        ? selectedProject.image
                        : '/no-image.svg'
                    }
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
                    {selectedProject.tech_stack?.map((tech) => (
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
      </Section>
    </div>
  );
}
