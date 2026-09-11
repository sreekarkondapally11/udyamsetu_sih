import type { FinancialPlan, FinancialScheme, RepaymentRow } from '../types';

export const MICRO_FINANCE_SCHEME: FinancialScheme = {
  id: 'micro_finance',
  name: 'Micro Finance Scheme',
  maxProjectCostText: '≤ ₹1.40 Lakh',
  maxLoanText: '₹1.25 Lakh',
  interestRate: 6.5,
  tenureYears: 3,
  moratoriumMonths: 3,
  disclaimer: 'Scheme parameters are based on configured project rules and should be verified against official scheme guidelines before application.'
};

export const TERM_LOAN_SCHEME: FinancialScheme = {
  id: 'term_loan',
  name: 'Term Loan Scheme',
  maxProjectCostText: '> ₹1.40 Lakh & ≤ ₹50 Lakh',
  maxLoanText: '₹45 Lakh',
  interestRate: 8.0,
  tenureYears: 7,
  moratoriumMonths: 6,
  disclaimer: 'Scheme parameters are based on configured project rules and should be verified against official scheme guidelines before application.'
};

/**
 * Route applicable scheme based on Project Cost
 */
export function determineScheme(projectCost: number): FinancialScheme {
  // If <= 1,40,000 INR
  if (projectCost <= 140000) {
    return MICRO_FINANCE_SCHEME;
  }
  // Default Term Loan Scheme for > 1.40 Lakh (up to 50 Lakh)
  return TERM_LOAN_SCHEME;
}

/**
 * Calculate Monthly EMI using standard formula:
 * EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
 */
export function calculateMonthlyEMI(principal: number, annualInterestRate: number, tenureYears: number): number {
  if (principal <= 0) return 0;
  const monthlyRate = annualInterestRate / 12 / 100;
  const totalMonths = tenureYears * 12;

  if (monthlyRate === 0) return principal / totalMonths;

  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
              (Math.pow(1 + monthlyRate, totalMonths) - 1);
  return Math.round(emi);
}

/**
 * Generate Quarterly Repayment Schedule considering Moratorium Period
 */
export function generateQuarterlySchedule(
  loanAmount: number,
  annualInterestRate: number,
  tenureYears: number,
  moratoriumMonths: number
): { schedule: RepaymentRow[]; totalInterest: number; totalRepayment: number } {
  const totalQuarters = tenureYears * 4;
  const moratoriumQuarters = Math.floor(moratoriumMonths / 3);
  const activeQuarters = totalQuarters - moratoriumQuarters;
  const quarterlyRate = annualInterestRate / 4 / 100;

  // Equal principal repayment per active quarter
  const principalPerQuarter = activeQuarters > 0 ? loanAmount / activeQuarters : 0;

  let currentBalance = loanAmount;
  let totalInterest = 0;
  const schedule: RepaymentRow[] = [];

  for (let q = 1; q <= totalQuarters; q++) {
    const openingBalance = Math.round(currentBalance);
    const interest = Math.round(openingBalance * quarterlyRate);
    
    let principal = 0;
    if (q > moratoriumQuarters && openingBalance > 0) {
      principal = q === totalQuarters ? openingBalance : Math.round(principalPerQuarter);
      // Clamp principal to balance
      if (principal > openingBalance) principal = openingBalance;
    }

    const payment = principal + interest;
    const closingBalance = Math.max(0, openingBalance - principal);
    currentBalance = closingBalance;
    totalInterest += interest;

    schedule.push({
      quarter: q,
      openingBalance,
      principal,
      interest,
      payment,
      closingBalance
    });
  }

  const totalRepayment = loanAmount + totalInterest;

  return { schedule, totalInterest, totalRepayment };
}

export interface CustomSchemeParams {
  interestRate?: number;
  tenureYears?: number;
  moratoriumMonths?: number;
  maxLoanText?: string;
}

/**
 * Main deterministic financial plan calculator
 * Supports flexible capital structuring & fully customizable scheme parameters
 */
export function calculateFinancialPlan(
  ownContribution: number,
  customProjectCost?: number,
  customEquityPercent?: number,
  customSchemeParams?: CustomSchemeParams
): FinancialPlan {
  const safeEquity = Math.max(1000, ownContribution);
  let projectCost: number;
  let ownContributionPercent: number;

  if (customProjectCost && customProjectCost > safeEquity) {
    // Case 1: Custom Total Project Cost specified directly
    projectCost = Math.round(customProjectCost);
    ownContributionPercent = Math.round((safeEquity / projectCost) * 1000) / 10; // 1 decimal place
  } else if (customEquityPercent && customEquityPercent > 0 && customEquityPercent < 100) {
    // Case 2: Custom Equity Percentage specified (e.g. 15%)
    ownContributionPercent = customEquityPercent;
    projectCost = Math.round(safeEquity / (ownContributionPercent / 100));
  } else {
    // Case 3: Standard default (Equity = 10% of Project Cost)
    ownContributionPercent = 10;
    projectCost = Math.round(safeEquity / 0.10);
  }

  const loanAmount = Math.max(0, projectCost - safeEquity);
  const loanPercent = Math.round((100 - ownContributionPercent) * 10) / 10;

  // Base Scheme Router based on total Project Cost
  const baseScheme = determineScheme(projectCost);

  // Apply user-customized scheme parameters if provided
  const activeScheme: FinancialScheme = {
    ...baseScheme,
    interestRate: (customSchemeParams?.interestRate !== undefined && customSchemeParams.interestRate > 0)
      ? customSchemeParams.interestRate
      : baseScheme.interestRate,
    tenureYears: (customSchemeParams?.tenureYears !== undefined && customSchemeParams.tenureYears > 0)
      ? customSchemeParams.tenureYears
      : baseScheme.tenureYears,
    moratoriumMonths: (customSchemeParams?.moratoriumMonths !== undefined && customSchemeParams.moratoriumMonths >= 0)
      ? customSchemeParams.moratoriumMonths
      : baseScheme.moratoriumMonths,
    maxLoanText: customSchemeParams?.maxLoanText?.trim() || baseScheme.maxLoanText,
  };

  // Calculate EMI with active scheme parameters
  const monthlyEMI = calculateMonthlyEMI(loanAmount, activeScheme.interestRate, activeScheme.tenureYears);
  const quarterlyPayment = monthlyEMI * 3;

  // Generate schedule with active scheme parameters
  const { schedule, totalInterest, totalRepayment } = generateQuarterlySchedule(
    loanAmount,
    activeScheme.interestRate,
    activeScheme.tenureYears,
    activeScheme.moratoriumMonths
  );

  return {
    ownContribution: safeEquity,
    ownContributionPercent,
    projectCost,
    loanAmount,
    loanPercent,
    scheme: activeScheme,
    monthlyEMI,
    quarterlyPayment,
    totalInterest,
    totalRepayment,
    schedule
  };
}
