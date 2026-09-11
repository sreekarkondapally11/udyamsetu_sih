import type { SavedReport } from '../types';
import { calculateFinancialPlan } from './financialEngine';

const STORAGE_KEY = 'ruralbiz_saved_reports';

/**
 * Pre-populated demo sample reports for college project demonstration
 */
export const SAMPLE_REPORTS: SavedReport[] = [
  {
    id: 'demo-report-1',
    createdAt: new Date(Date.now() - 86400000 * 2).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    businessName: 'Dairy Farming',
    locationSummary: 'Kothapalli, Karimnagar Dist (TS)',
    ownCapital: 100000,
    feasibilityScore: 78,
    schemeName: 'Term Loan Scheme',
    input: {
      location: { village: 'Kothapalli', mandal: 'Karimnagar Rural', district: 'Karimnagar', state: 'Telangana', radius: 10 },
      ownCapital: 100000,
      businessType: 'Dairy Farming'
    },
    feasibility: {
      score: 78,
      statusText: '🟢 Good Potential',
      marketReach: { population: 25000, households: 8000, potentialCustomers: 2400, radius: 10 },
      opportunityAnalysis: { summary: 'Targeting Kothapalli, Karimnagar Rural: High daily demand for fresh milk and dairy products in rural clusters.', opportunityScore: 82 },
      competitorInfo: { countWithinRadius: 18, competitionLevel: 'Medium', marketDensity: 'Moderate', chartData: [{ name: 'Local Milk Vendors', count: 10 }, { name: 'Cooperative Hubs', count: 5 }, { name: 'Private Dairies', count: 3 }] },
      pricingInfo: { marketRange: '₹45 – ₹65 per Liter', suggestedStartingPrice: '₹55 per Liter', potentialGrossMargin: '22% – 28%', explanation: 'Milk pricing determined by fat content and direct household sales.' },
      swot: {
        strengths: ['Constant daily cash flow', 'Abundant agricultural fodder availability', 'Government dairy subsidy'],
        weaknesses: ['High initial livestock cost', '365-day active management required', 'Vulnerability to animal health'],
        opportunities: ['Processing surplus milk into paneer and curd', 'Organic manure sales', 'Bulk supply to sweet shops'],
        threats: ['Cattle feed price increases', 'Seasonal milk yield drops', 'Livestock disease outbreaks']
      },
      risks: [
        { risk: 'Feed Price Spike', probability: 'Medium', impact: 'High', mitigation: 'Grow green fodder on leased land.' },
        { risk: 'Disease Outbreak', probability: 'Medium', impact: 'High', mitigation: 'Vaccination and cattle insurance.' }
      ],
      recommendation: {
        headline: 'Proceed with planned operational modifications.',
        whyList: ['Steady daily demand in local village cluster.', 'High synergy with local agricultural feed.'],
        actionSteps: ['Start with 2-4 high-yield cows.', 'Build direct morning delivery relationships.'],
        alternatives: [{ title: 'Goat Farming', description: 'Lower initial investment, easy management.', estimatedCapital: '₹50,000 - ₹1,50,000' }]
      }
    },
    financial: calculateFinancialPlan(100000)
  },
  {
    id: 'demo-report-2',
    createdAt: new Date(Date.now() - 86400000 * 5).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    businessName: 'Tailoring',
    locationSummary: 'Peddapalli, Telangana',
    ownCapital: 30000,
    feasibilityScore: 72,
    schemeName: 'Micro Finance Scheme',
    input: {
      location: { village: 'Peddapalli', mandal: 'Peddapalli', district: 'Peddapalli', state: 'Telangana', radius: 8 },
      ownCapital: 30000,
      businessType: 'Tailoring'
    },
    feasibility: {
      score: 72,
      statusText: '🟢 Good Potential',
      marketReach: { population: 18000, households: 5500, potentialCustomers: 1600, radius: 8 },
      opportunityAnalysis: { summary: 'Targeting Peddapalli: Growing demand for custom stitching and school uniforms.', opportunityScore: 74 },
      competitorInfo: { countWithinRadius: 11, competitionLevel: 'Low', marketDensity: 'Sparse', chartData: [{ name: 'Home Tailors', count: 7 }, { name: 'Boutiques', count: 2 }, { name: 'Uniform Contractors', count: 2 }] },
      pricingInfo: { marketRange: '₹150 – ₹450 per garment', suggestedStartingPrice: '₹200 Basic', potentialGrossMargin: '55% – 70%', explanation: 'High service margin with low raw material costs.' },
      swot: {
        strengths: ['High service margin (55%+)', 'Low equipment capital', 'Festival season spikes'],
        weaknesses: ['Capacity limited by manual speed', 'Seasonal demand swings'],
        opportunities: ['School uniform bulk orders', 'Fashion alteration services'],
        threats: ['Inexpensive readymade apparel competition', 'Power outages']
      },
      risks: [
        { risk: 'Seasonal Income Dip', probability: 'Medium', impact: 'Medium', mitigation: 'Take up bulk uniform contracts during off-seasons.' }
      ],
      recommendation: {
        headline: 'Highly feasible low-capital service enterprise.',
        whyList: ['Excellent return on small capital investment.', 'Minimal recurring costs.'],
        actionSteps: ['Procure 2 reliable sewing machines.', 'Approach local schools for uniform contracts.'],
        alternatives: [{ title: 'Embroidery Unit', description: 'Designer garment enhancement.', estimatedCapital: '₹40,000 - ₹90,000' }]
      }
    },
    financial: calculateFinancialPlan(30000)
  },
  {
    id: 'demo-report-3',
    createdAt: new Date(Date.now() - 86400000 * 8).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    businessName: 'Grocery Store',
    locationSummary: 'Ramagundam, Telangana',
    ownCapital: 120000,
    feasibilityScore: 61,
    schemeName: 'Term Loan Scheme',
    input: {
      location: { village: 'Godavarikhani', mandal: 'Ramagundam', district: 'Peddapalli', state: 'Telangana', radius: 10 },
      ownCapital: 120000,
      businessType: 'Grocery Store'
    },
    feasibility: {
      score: 61,
      statusText: '🟡 Moderate Feasibility',
      marketReach: { population: 25000, households: 8000, potentialCustomers: 2400, radius: 10 },
      opportunityAnalysis: { summary: 'Targeting Godavarikhani: High Kirana competition requires strict credit and digital services.', opportunityScore: 65 },
      competitorInfo: { countWithinRadius: 28, competitionLevel: 'High', marketDensity: 'Dense', chartData: [{ name: 'Small Kirana Shops', count: 18 }, { name: 'General Stores', count: 7 }, { name: 'Wholesale Marts', count: 3 }] },
      pricingInfo: { marketRange: 'MRP with 8%-18% margin', suggestedStartingPrice: 'Standard Retail MRP', potentialGrossMargin: '12% – 16%', explanation: 'Relies on inventory turnover speed.' },
      swot: {
        strengths: ['Universal daily household demand', 'All-season resistant'],
        weaknesses: ['High shop saturation', 'Cash locked in customer credit'],
        opportunities: ['Adding mini-ATM & digital recharge', 'Direct grain sourcing'],
        threats: ['Unrecovered customer credit', 'Town supermart competition']
      },
      risks: [
        { risk: 'Credit Cash Flow Lock', probability: 'High', impact: 'High', mitigation: 'Cap individual credit limits strictly.' }
      ],
      recommendation: {
        headline: 'Proceed with strict credit limits & service differentiation.',
        whyList: ['Evergreen daily consumption pattern.', 'High footfall near bus stop.'],
        actionSteps: ['Select high footfall location.', 'Set up UPI digital payments.'],
        alternatives: [{ title: 'Specialty Flour Mill', description: 'Retail Kirana with grain grinding.', estimatedCapital: '₹1,20,000 - ₹2,50,000' }]
      }
    },
    financial: calculateFinancialPlan(120000)
  },
  {
    id: 'demo-report-4',
    createdAt: new Date(Date.now() - 86400000 * 12).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    businessName: 'Poultry',
    locationSummary: 'Jagtial, Telangana',
    ownCapital: 80000,
    feasibilityScore: 75,
    schemeName: 'Term Loan Scheme',
    input: {
      location: { village: 'Dharmapuri', mandal: 'Dharmapuri', district: 'Jagtial', state: 'Telangana', radius: 12 },
      ownCapital: 80000,
      businessType: 'Poultry'
    },
    feasibility: {
      score: 75,
      statusText: '🟢 Good Potential',
      marketReach: { population: 31000, households: 9800, potentialCustomers: 2900, radius: 12 },
      opportunityAnalysis: { summary: 'Targeting Dharmapuri: Steady broiler meat and egg demand in local mandis.', opportunityScore: 78 },
      competitorInfo: { countWithinRadius: 14, competitionLevel: 'Medium', marketDensity: 'Moderate', chartData: [{ name: 'Independent Farms', count: 8 }, { name: 'Integrator Contracts', count: 4 }, { name: 'Meat Outlets', count: 2 }] },
      pricingInfo: { marketRange: '₹140 – ₹180 per kg', suggestedStartingPrice: '₹160 per kg', potentialGrossMargin: '18% – 24%', explanation: 'Broiler prices fluctuate based on weekly mandi rates.' },
      swot: {
        strengths: ['Short 45-day growth cycle', 'High protein consumption demand'],
        weaknesses: ['Sensitivity to ambient heat', 'Biosecurity requirements'],
        opportunities: ['Direct supply to local dhabas', 'Deep litter organic manure sale'],
        threats: ['Avian flu risks', 'Feed cost spikes']
      },
      risks: [
        { risk: 'Disease Transmission', probability: 'High', impact: 'High', mitigation: 'Strict farm biosecurity and vaccination.' }
      ],
      recommendation: {
        headline: 'Proceed with robust biosecurity planning.',
        whyList: ['Quick 45-day turnover cycle.', 'High regional protein demand.'],
        actionSteps: ['Construct well-ventilated shed.', 'Partner with chick suppliers.'],
        alternatives: [{ title: 'Desi Country Chicken', description: 'Higher market price per bird.', estimatedCapital: '₹60,000 - ₹1,80,000' }]
      }
    },
    financial: calculateFinancialPlan(80000)
  },
  {
    id: 'demo-report-5',
    createdAt: new Date(Date.now() - 86400000 * 15).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    businessName: 'Food Processing',
    locationSummary: 'Sircilla, Telangana',
    ownCapital: 150000,
    feasibilityScore: 81,
    schemeName: 'Term Loan Scheme',
    input: {
      location: { village: 'Vemulawada', mandal: 'Vemulawada', district: 'Rajanna Sircilla', state: 'Telangana', radius: 10 },
      ownCapital: 150000,
      businessType: 'Food Processing'
    },
    feasibility: {
      score: 81,
      statusText: '🟢 High Potential',
      marketReach: { population: 25000, households: 8000, potentialCustomers: 2400, radius: 10 },
      opportunityAnalysis: { summary: 'Targeting Vemulawada: Pure spice grinding and papad processing unit with town supply.', opportunityScore: 85 },
      competitorInfo: { countWithinRadius: 9, competitionLevel: 'Low', marketDensity: 'Sparse', chartData: [{ name: 'Cottage Units', count: 5 }, { name: 'Spice Mills', count: 3 }, { name: 'Packaged Brands', count: 1 }] },
      pricingInfo: { marketRange: '₹120 – ₹260 per kg', suggestedStartingPrice: '₹180 per kg', potentialGrossMargin: '30% – 45%', explanation: 'Substantial margin gain by direct crop purchasing.' },
      swot: {
        strengths: ['Abundant raw crop availability', 'Long product shelf life', 'Government FME subsidy'],
        weaknesses: ['FSSAI hygiene compliance needed', 'Seasonal crop price shifts'],
        opportunities: ['Branded sale in regional town shops', 'SHG market network supply'],
        threats: ['Moisture spoilage in storage', 'National brand competition']
      },
      risks: [
        { risk: 'Quality Non-compliance', probability: 'Low', impact: 'High', mitigation: 'Basic FSSAI registration and sealed packaging.' }
      ],
      recommendation: {
        headline: 'Excellent growth potential with value addition.',
        whyList: ['Transforms local raw crops into premium packaged goods.', 'High subsidy eligibility.'],
        actionSteps: ['Acquire basic grinding machine.', 'Register for FSSAI license.'],
        alternatives: [{ title: 'Cold-Pressed Oil Mill', description: 'Pure mustard/groundnut oil mill.', estimatedCapital: '₹2,00,000 - ₹5,00,000' }]
      }
    },
    financial: calculateFinancialPlan(150000)
  }
];

/**
 * Get saved reports from localStorage, falling back to pre-populated sample reports
 */
export function getSavedReports(): SavedReport[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    // Seed with sample reports on first load
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_REPORTS));
    return SAMPLE_REPORTS;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return SAMPLE_REPORTS;
  }
}

/**
 * Save new report to localStorage
 */
export function saveReport(report: SavedReport): void {
  const reports = getSavedReports();
  // Check if exists, replace or prepend
  const existingIndex = reports.findIndex((r) => r.id === report.id);
  if (existingIndex >= 0) {
    reports[existingIndex] = report;
  } else {
    reports.unshift(report);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
}

/**
 * Delete report by ID
 */
export function deleteReport(id: string): SavedReport[] {
  const reports = getSavedReports().filter((r) => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  return reports;
}

/**
 * Get single report by ID
 */
export function getReportById(id: string): SavedReport | undefined {
  const reports = getSavedReports();
  return reports.find((r) => r.id === id);
}
