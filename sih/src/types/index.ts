export interface LocationData {
  village: string;
  mandal: string;
  district: string;
  state: string;
  radius: number; // in km
  lat?: number; // GPS Latitude
  lng?: number; // GPS Longitude
}

export type BusinessType = 
  | 'Dairy Farming'
  | 'Poultry'
  | 'Goat Farming'
  | 'Grocery Store'
  | 'Tailoring'
  | 'Food Processing'
  | 'Agriculture'
  | 'Handicrafts'
  | 'Small Manufacturing'
  | 'Other';

export interface AnalysisInput {
  location: LocationData;
  ownCapital: number;
  businessType: string; // BusinessType or custom string
  customBusinessName?: string;
  experience?: string;
  availableLand?: string;
  employees?: number;
  expectedScale?: string;
}

export interface MarketReach {
  population: number;
  households: number;
  potentialCustomers: number;
  radius: number;
}

export interface CompetitorInfo {
  countWithinRadius: number;
  competitionLevel: 'Low' | 'Medium' | 'High';
  marketDensity: 'Sparse' | 'Moderate' | 'Dense';
  chartData: { name: string; count: number }[];
}

export interface PricingInfo {
  marketRange: string;
  suggestedStartingPrice: string;
  potentialGrossMargin: string;
  explanation: string;
}

export interface SWOT {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface RiskItem {
  risk: string;
  probability: 'Low' | 'Medium' | 'High';
  impact: 'Low' | 'Medium' | 'High';
  mitigation: string;
}

export interface BusinessAlternative {
  title: string;
  description: string;
  estimatedCapital: string;
}

export interface FeasibilityReport {
  score: number;
  statusText: string; // e.g. "🟢 Good Potential"
  isRealAI?: boolean;
  isRealGPSData?: boolean;
  dataSourceLabel?: string;
  aiErrorMessage?: string;
  marketReach: MarketReach;
  opportunityAnalysis: {
    summary: string;
    opportunityScore: number;
  };
  competitorInfo: CompetitorInfo;
  pricingInfo: PricingInfo;
  swot: SWOT;
  risks: RiskItem[];
  recommendation: {
    headline: string; // e.g. "Proceed with modifications"
    whyList: string[];
    actionSteps: string[];
    alternatives: BusinessAlternative[];
  };
}

export interface FinancialScheme {
  id: 'micro_finance' | 'term_loan';
  name: string;
  maxProjectCostText: string;
  maxLoanText: string;
  interestRate: number; // in percentage e.g. 6.5 or 8.0
  tenureYears: number;
  moratoriumMonths: number;
  disclaimer: string;
}

export interface RepaymentRow {
  quarter: number;
  openingBalance: number;
  principal: number;
  interest: number;
  payment: number;
  closingBalance: number;
}

export interface FinancialPlan {
  ownContribution: number;
  ownContributionPercent: number; // e.g. 10, 15, 20
  projectCost: number;
  loanAmount: number;
  loanPercent: number; // e.g. 90, 85, 80
  scheme: FinancialScheme;
  monthlyEMI: number;
  quarterlyPayment: number;
  totalInterest: number;
  totalRepayment: number;
  schedule: RepaymentRow[];
}

export interface SavedReport {
  id: string;
  createdAt: string;
  businessName: string;
  locationSummary: string;
  ownCapital: number;
  feasibilityScore: number;
  schemeName: string;
  input: AnalysisInput;
  feasibility: FeasibilityReport;
  financial: FinancialPlan;
}
