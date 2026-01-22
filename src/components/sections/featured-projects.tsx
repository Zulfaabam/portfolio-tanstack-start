import ProjectCard from '../ui/project-card';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { createServerFn } from '@tanstack/react-start';
import { useQuery } from '@tanstack/react-query';

export const getFeaturedProjects = createServerFn({ method: 'GET' }).handler(
  async () => {
    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase
      .from('projects')
      .select(
        `*, tech_stack:project_tech_stack(id:tech_stack_id, tech_stack(name))`,
      )
      .eq('is_featured', true);

    if (error) throw new Error(error.message);
    return { data, error };
  },
);

export default function FeaturedProjects() {
  const { data, error } = useQuery({
    queryKey: ['featuredProjects'],
    queryFn: () => getFeaturedProjects(),
  });

  const projects = data?.data
    ?.sort((a, b) => {
      return b.created_at!.localeCompare(a.created_at!);
    })
    .map((d) => ({
      ...d,
      tech_stack: d.tech_stack.map(
        (stack: { id: number; tech_stack: { name: string } }) => ({
          id: stack.id,
          name: stack.tech_stack.name,
        }),
      ),
    }));

  return (
    <div className='flex w-full snap-x snap-mandatory gap-3 overflow-x-scroll py-6 pl-1 scrollbar-hide *:snap-center lg:gap-4'>
      {error ? (
        <p className='text-center text-red-400 sm:col-span-2'>
          {error.message}
        </p>
      ) : (
        projects?.map((p, idx) => (
          <ProjectCard key={p.id} idx={idx + 1} {...p} />
        ))
      )}
    </div>
  );
}
