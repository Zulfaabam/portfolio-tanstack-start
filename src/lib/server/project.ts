import { createServerFn } from '@tanstack/react-start';
import { getSupabaseServerClient } from '../supabase/server';
import { Project } from 'types';

export const getFeaturedProjects = createServerFn({ method: 'GET' }).handler(
  async (): Promise<{
    data: Project[];
    error: { message: string } | null;
  }> => {
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
