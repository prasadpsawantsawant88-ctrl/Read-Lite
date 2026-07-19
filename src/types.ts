export type CategoryType = "AI" | "Excel" | "Business Analytics" | "MBA" | "Emerging Tech" | "General";

export interface Skill {
  id: string;
  name: string;
  category: CategoryType;
  level: "Expert" | "Advanced" | "Intermediate" | "Beginner";
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: CategoryType;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  keyDeliverables: string[];
  thumbnailUrl?: string;
}

export interface ArticleSource {
  name: string;
  url: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string; // Markdown supported
  category: CategoryType;
  date: string;
  readTime: string;
  sources: ArticleSource[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
  skills: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  period: string;
  achievements: string[];
}

export interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  email: string;
  linkedinUrl?: string;
  githubUrl?: string;
  twitterUrl?: string;
  skills: Skill[];
  projects: Project[];
  articles: Article[];
  experiences: Experience[];
  educations: Education[];
}
