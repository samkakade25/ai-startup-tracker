export interface Startup {
    id: number;
    name: string;
    slug: string;
    description: string;
    website: string;
    headquarters_city: string;
    headquarters_country: string;
    founded_year: number | null;
    employee_count: number | null;
    sector: string;
    stage: string;
    status: string;
    is_ai_company: boolean;
    created_at: string;
    updated_at: string;
  }
  
  export interface Investor {
    id: number;
    name: string;
    slug: string;
    investor_type: string;
    description: string;
    website: string;
    headquarters_city: string;
    headquarters_country: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface SourceArticle {
    id: number;
    title: string;
    url: string;
    source_name: string;
    author: string;
    published_at: string | null;
    fetched_at: string;
    content: string;
    summary: string;
    processing_status: string;
    content_hash: string | null;
    error_message: string;
    ai_processed_at: string | null;
    created_at: string;
    updated_at: string;
  }
  
  export interface FundingInvestor {
    id: number;
    funding_round: number;
    investor: string;
    role: string;
    investment_amount: string | null;
  }
  
  export interface FundingRound {
    id: number;
    startup: string;
    round_type: string;
    announced_date: string;
    amount: string;
    currency: string;
    amount_usd: string | null;
    post_money_valuation: string | null;
    source_article: number | null;
    investments: FundingInvestor[];
    created_at: string;
    updated_at: string;
  }
  
  export interface JobOpening {
    id: number;
    startup: number | null;
    title: string;
    location: string;
    employment_type: string;
    url: string;
    source_name: string;
    published_at: string | null;
    description: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  }
  
  export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
  }