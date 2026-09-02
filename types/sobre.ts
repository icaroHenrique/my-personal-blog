export interface SobreProject {
  id: string;
  name: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface SobreExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  location?: string;
  description?: string;
  projects?: SobreProject[];
  highlights?: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
}

export interface SobreData {
  name: string;
  fullTitle: string;
  hero: {
    title: string;
    subtitle: string;
  };
  summary: string[];
  location: string;
  contacts: {
    email: string;
    github: string;
    linkedin: string;
  };
  sectionTitles: {
    skills: string;
    experience: string;
    education: string;
  };
  labels: {
    projectsAndAllocations: string;
    expand: string;
    collapse: string;
  };
  contactCTA: {
    title: string;
    description: string;
    buttonText: string;
  };
  skillCategories: SkillCategory[];
  experiences: SobreExperience[];
  education: Education[];
}
