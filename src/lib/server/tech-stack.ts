import { createServerFn } from '@tanstack/react-start';
import { getSupabaseServerClient } from '@/lib/supabase/server';

interface TechStack {
  id: number;
  name: string;
}

export const getTechStack = createServerFn({ method: 'GET' }).handler(
  async (): Promise<{
    data: TechStack[];
    error: { message: string } | null;
  }> => {
    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase
      .from('tech_stack')
      .select('*')
      .eq('is_main_tech', true);

    if (error) throw new Error(error.message);
    return { data, error };
  },
);
