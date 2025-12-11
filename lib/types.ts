export type ProjectStatus = 'Live' | 'WIP' | 'Idea';

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  tags: string[];
  status: ProjectStatus;
  timeline?: string;
  links?: {
    github?: string;
    live?: string;
    demo?: string;
  };
  featured?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon?: string;
  skills: {
    name: string;
    description?: string;
    proficiency?: 'Expert' | 'Advanced' | 'Intermediate';
  }[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
