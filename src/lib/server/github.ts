import { createServerFn } from '@tanstack/react-start';
import { GithubCommits } from 'types/github';

export const getThisRepoCommits = createServerFn({ method: 'GET' }).handler(
  async (): Promise<{
    data: GithubCommits[];
    error: Error | null;
  }> => {
    let data, error;

    try {
      const resp = await fetch(
        'https://api.github.com/repos/Zulfaabam/portfolio-tanstack-start/commits?per_page=1',
        {
          method: 'GET',
        },
      );
      data = await resp.json();
      error = null;
    } catch (err) {
      error = err as Error;
    }

    if (error) throw new Error(error.message);
    return { data, error };
  },
);
