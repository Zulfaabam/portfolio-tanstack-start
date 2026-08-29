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
        `*,
        project_tech_stack (
          tech_stack (
            id,
            name
          )
        )`,
      )
      .eq('is_featured', true);

    if (error) throw new Error(error.message);
    return { data, error };
  },
);

export const getProjects = createServerFn({ method: 'GET' }).handler(
  async (): Promise<{ data: Project[]; error: { message: string } | null }> => {
    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase.from('projects').select(
      `*,
        project_tech_stack (
          tech_stack (
            id,
            name
          )
        )
      `,
    );

    if (error) throw new Error(error.message);
    return { data, error };
  },
);
