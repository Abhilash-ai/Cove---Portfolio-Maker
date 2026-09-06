export type PortfolioStatus = 'draft' | 'published';

export interface PortfolioSummary {
  id: string;
  userId: string;
  title: string;
  slug: string;
  status: PortfolioStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}
