// Portfolio Data Types for localStorage-based CMS

export interface HeroData {
  name: string;
  subtitle: string;
  photoUrl: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  techStack: string[];
}

export interface Skill {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface AboutData {
  bio: string;
  mission: string;
  skills: Skill[];
  stats: { label: string; value: string }[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  image: string;
  youtubeUrl?: string;
  tags: string[];
  status: 'published' | 'draft';
  order: number;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  order: number;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  visible: boolean;
}

export interface ContactData {
  email: string;
  location: string;
  socialLinks: SocialLink[];
}

export interface ChatSettings {
  webhookUrl: string;
  enabled: boolean;
  welcomeMessage: string;
  botName: string;
}

export interface FAQQuestion {
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  category: string;
  icon: string;
  questions: FAQQuestion[];
}

export interface FooterData {
  copyright: string;
  tagline: string;
  logoText: string;
}

export interface AdminAuth {
  passwordHash: string;
  isLoggedIn: boolean;
}

export interface PortfolioData {
  hero: HeroData;
  about: AboutData;
  projects: Project[];
  services: Service[];
  contact: ContactData;
  chatSettings: ChatSettings;
  footer: FooterData;
  faq: FAQCategory[];
}
