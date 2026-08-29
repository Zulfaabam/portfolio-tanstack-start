export interface Project {
  id: number;
  created_at: string;
  title: string;
  description: string;
  image: string;
  github_url: string;
  live_url: string;
  is_featured: boolean;
  project_tech_stack: ProjectTechStack[];
}

export interface ProjectTechStack {
  tech_stack: TechStack;
}

export interface TechStack {
  id: number;
  name: string;
  is_main_tech?: boolean;
}

export interface JourneyData {
  year: string;
  company: string;
  jobTitle: string;
  duration: string;
  image1: string;
  image2: string;
  image3: string;
  projects: string[];
  tech: string[];
}
