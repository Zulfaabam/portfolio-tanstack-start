import ErrorContent from '@/components/error-content';
import Section from '@/components/section';
import ProjectCard from '@/components/ui/project-card';
import { getProjects } from '@/lib/server/project';
import { createFileRoute } from '@tanstack/react-router';
import { Project } from 'types';

type ProjectData = Omit<Project, 'tech_stack'> & {
  tech_stack: { id: number; name: string }[];
};

export const Route = createFileRoute('/projects')({
  errorComponent: ({ reset }) => (
    <div className='bg-dark relative flex min-h-screen w-full items-center'>
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
    <div className='bg-dark relative min-h-screen w-full'>
      <Section id='projects'>
        <div className='py-10 lg:py-20'>
          <h2 className='text-fg mb-4 max-w-4xl text-2xl md:text-4xl'>
            My Projects
          </h2>
          <p className='text-fg max-w-md text-sm md:text-base'>
            Various projects I built, from day one I learn Frontend Development
            until now. Some I built it solo, some collaborated with other devs
            during my office work. Please take a look.
          </p>
        </div>
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-6'>
          {error ? (
            <p className='text-center text-red-400 sm:col-span-2'>
              {error?.message ?? 'Something when wrong!'}
            </p>
          ) : (
            projects?.map((p, idx) => (
              <ProjectCard
                key={p.id}
                idx={idx + 1}
                className='h-[380px] sm:h-[480px]'
                imageClassName='max-[768px]:h-[200px]'
                {...p}
              />
            ))
          )}
        </div>
      </Section>
    </div>
  );
}
