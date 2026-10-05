export interface Professional {
  id: string;
  name: string;
  avatar?: string | null;
  avatarUrl?: string | null;
  specialty: string;
  description: string;
  bio?: string | null;
  rating: number;
  reviewCount: number;
  yearsOfExperience: number;
  certifications: string[];
  portfolio: PortfolioItem[];
  testimonials: Testimonial[];
  categories?: string[];
  phone?: string;
  email?: string;
  location?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  year: number;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  content: string;
  rating: number;
}

export interface Budget {
  id: string;
  projectId?: string;
  description: string;
  location: string;
  projectType: string;
  budgetRange: string;
  desiredCompletionDate: string;
  attachments: string[];
}

export type BudgetRange = '$1k-5k' | '$5k-10k' | '$10k-25k' | '$25k+';
