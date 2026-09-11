import type { FeasibilityReport } from '../types';

export const BUSINESS_TEMPLATES: Record<string, Partial<FeasibilityReport>> = {
  'Dairy Farming': {
    score: 78,
    statusText: '🟢 Good Potential',
    opportunityAnalysis: {
      summary: 'High daily demand for fresh milk and dairy products in rural and semi-urban clusters. Direct household supply along with value-added products like curd, paneer, and ghee provides consistent daily cash flow and higher margins.',
      opportunityScore: 82
    },
    competitorInfo: {
      countWithinRadius: 18,
      competitionLevel: 'Medium',
      marketDensity: 'Moderate',
      chartData: [
        { name: 'Local Milk Vendors', count: 10 },
        { name: 'Cooperative Hubs', count: 5 },
        { name: 'Private Dairies', count: 3 }
      ]
    },
    pricingInfo: {
      marketRange: '₹45 – ₹65 per Liter',
      suggestedStartingPrice: '₹55 per Liter',
      potentialGrossMargin: '22% – 28%',
      explanation: 'Milk pricing is determined by fat/SNF content and local cooperative collection rates. Direct-to-consumer delivery commands a 15-20% premium.'
    },
    swot: {
      strengths: [
        'Constant daily cash flow and household demand',
        'Abundant agricultural fodder availability in village radius',
        'Government subsidy eligibility under dairy development schemes'
      ],
      weaknesses: [
        'High initial livestock acquisition capital',
        'Requires 365-day active management without breaks',
        'Vulnerability to animal health and milk yield drops'
      ],
      opportunities: [
        'Processing surplus milk into high-margin paneer and curd',
        'Organic cattle manure sale to local organic farmers',
        'Bulk supply to tea stalls, sweet shops, and eateries'
      ],
      threats: [
        'Sudden rise in commercial green/dry cattle feed costs',
        'Seasonal milk yield fluctuations during peak summer',
        'Outbreak of cattle diseases (FMD / Lumpy virus)'
      ]
    },
    risks: [
      { risk: 'Feed & Fodder Price Spike', probability: 'Medium', impact: 'High', mitigation: 'Grow green fodder locally on leased land and store silage for dry months.' },
      { risk: 'Livestock Disease Outbreak', probability: 'Medium', impact: 'High', mitigation: 'Strict vaccination schedules and comprehensive cattle insurance.' },
      { risk: 'Price Undercutting by Cooperatives', probability: 'Low', impact: 'Medium', mitigation: 'Focus on direct door-to-door fresh supply and paneer making.' },
      { risk: 'Cold Chain / Perishability Risk', probability: 'Medium', impact: 'Medium', mitigation: 'Invest in simple solar-powered milk chilling tanks or quick morning distribution.' }
    ],
    recommendation: {
      headline: 'Proceed with planned operational modifications.',
      whyList: [
        'Steady daily demand in local village cluster with 2,400+ estimated buyer households.',
        'High synergy with local agricultural byproduct feed.',
        'Manageable initial livestock scale with high loan recovery rate.'
      ],
      actionSteps: [
        'Start at a moderate scale (2 to 4 high-yield crossbred cows/buffaloes).',
        'Build direct relationships with morning delivery households and local sweet shops.',
        'Tie up with local veterinary doctor for routine preventive health checkups.',
        'Maintain a 3-month working capital reserve specifically for commercial feed.'
      ],
      alternatives: [
        { title: 'Goat Farming', description: 'Lower initial investment, high meat demand, and easier stall-fed management.', estimatedCapital: '₹50,000 - ₹1,50,000' },
        { title: 'Poultry Layer Unit', description: 'Fast egg production cycle with high daily local market absorption.', estimatedCapital: '₹1,00,000 - ₹3,00,000' },
        { title: 'Value-Added Dairy Processing', description: 'Focus purely on making paneer, butter, and sweets from purchased raw milk.', estimatedCapital: '₹75,000 - ₹2,00,000' }
      ]
    }
  },

  'Poultry': {
    score: 75,
    statusText: '🟢 Good Potential',
    opportunityAnalysis: {
      summary: 'Consistent demand for fresh table eggs and broiler meat in local village markets and nearby mandis. Integration with contract farming integrators reduces market price risk.',
      opportunityScore: 78
    },
    competitorInfo: {
      countWithinRadius: 14,
      competitionLevel: 'Medium',
      marketDensity: 'Moderate',
      chartData: [
        { name: 'Independent Farms', count: 8 },
        { name: 'Integrator Contracts', count: 4 },
        { name: 'Retail Meat Outlets', count: 2 }
      ]
    },
    pricingInfo: {
      marketRange: '₹140 – ₹180 per kg (Broiler)',
      suggestedStartingPrice: '₹160 per kg',
      potentialGrossMargin: '18% – 24%',
      explanation: 'Broiler meat prices fluctuate based on weekly mandi rates. Egg production yields steadier profit margins.'
    },
    swot: {
      strengths: [
        'Short production cycle (40-45 days per broiler batch)',
        'High protein consumption trend across rural households',
        'Option to join contract farming with guaranteed buyback'
      ],
      weaknesses: [
        'High sensitivity to ambient temperature and ventilation',
        'Strict biosecurity requirement to avoid flock mortality',
        'Dependence on commercial feed prices'
      ],
      opportunities: [
        'Direct supply to local dhabas, hotels, and weekly village markets',
        'Deep litter manure sale as organic fertilizer for vegetable crops',
        'Desi / Backyard country chicken premium pricing segment'
      ],
      threats: [
        'Avian flu outbreaks leading to mass culling',
        'Extreme summer heatwaves causing bird mortality',
        'Volatile maize and soybean feed raw material prices'
      ]
    },
    risks: [
      { risk: 'Disease Transmission', probability: 'High', impact: 'High', mitigation: 'Strict farm biosecurity, foot baths, and bird vaccination.' },
      { risk: 'Summer Mortality Heat Stress', probability: 'Medium', impact: 'High', mitigation: 'Install foggers, thatched roofs, and adequate ventilation fans.' },
      { risk: 'Feed Cost Spikes', probability: 'High', impact: 'Medium', mitigation: 'Enter long-term contracts with regional poultry feed suppliers.' }
    ],
    recommendation: {
      headline: 'Proceed with robust biosecurity planning.',
      whyList: [
        'Quick 45-day cash turnover cycle.',
        'High regional protein demand with active local market buyers.',
        'Scalable shed design allowing expansion as profits re-invest.'
      ],
      actionSteps: [
        'Construct well-ventilated east-west oriented shed.',
        'Partner with established chick and feed suppliers.',
        'Implement strict sanitation protocols before stocking first batch.'
      ],
      alternatives: [
        { title: 'Desi Country Chicken Farm', description: 'Higher market price per bird with lower mortality rates.', estimatedCapital: '₹60,000 - ₹1,80,000' },
        { title: 'Quail / Duck Farming', description: 'Niche local market with fast maturity and low space requirement.', estimatedCapital: '₹40,000 - ₹1,20,000' }
      ]
    }
  },

  'Grocery Store': {
    score: 61,
    statusText: '🟡 Moderate Feasibility',
    opportunityAnalysis: {
      summary: 'Steady retail demand for daily Kirana staples, FMCG products, and packaged foods. Competition is high due to multiple existing village shops, requiring sharp inventory management and credit control.',
      opportunityScore: 65
    },
    competitorInfo: {
      countWithinRadius: 28,
      competitionLevel: 'High',
      marketDensity: 'Dense',
      chartData: [
        { name: 'Small Kirana Shops', count: 18 },
        { name: 'General Stores', count: 7 },
        { name: 'Supermarts / Wholesale', count: 3 }
      ]
    },
    pricingInfo: {
      marketRange: 'MRP with 8% - 18% Retail Margin',
      suggestedStartingPrice: 'Standard Competitive Retail MRP',
      potentialGrossMargin: '12% – 16%',
      explanation: 'FMCG goods have fixed retail margins. Profitability relies on inventory turnover speed and minimal credit bad debt.'
    },
    swot: {
      strengths: [
        'Universal daily requirement for every village household',
        'Low technical skill barrier to launch',
        'All-season resistant business model'
      ],
      weaknesses: [
        'High local market saturation and price wars',
        'Working capital locked up in customer credit (Khata)',
        'Low overall gross margin percentages'
      ],
      opportunities: [
        'Adding digital services (recharge, mini-ATM, bill payment)',
        'Home delivery for senior citizens in the village',
        'Direct sourcing of grains from local farmers to cut middleman costs'
      ],
      threats: [
        'Unrecovered customer credit (Udhaar) draining cash flow',
        'Competition from nearby town mini-supermarkets',
        'Inventory spoilage or rodent damage'
      ]
    },
    risks: [
      { risk: 'Cash Flow Lock in Credit', probability: 'High', impact: 'High', mitigation: 'Cap individual customer credit limits and enforce strict 15-day settlement.' },
      { risk: 'High Local Competition', probability: 'High', impact: 'Medium', mitigation: 'Differentiate with home delivery and complementary digital financial services.' },
      { risk: 'Slow Inventory Turnover', probability: 'Medium', impact: 'Medium', mitigation: 'Stock fast-moving essential goods first before expanding product range.' }
    ],
    recommendation: {
      headline: 'Proceed with strict credit limits & service differentiation.',
      whyList: [
        'Evergreen daily household consumption pattern.',
        'Location near village bus stand or central chowk provides steady footfall.',
        'Opportunity to upsell digital financial transaction services.'
      ],
      actionSteps: [
        'Select high footfall location (Main Road / Bus stop area).',
        'Implement strict inventory tracking to avoid dead stock.',
        'Set up UPI and digital payment options from day 1.'
      ],
      alternatives: [
        { title: 'Specialty Spice & Flour Mill', description: 'Combine retail Kirana with custom grain grinding services.', estimatedCapital: '₹1,20,000 - ₹2,50,000' },
        { title: 'Vegetable & Fruit Retail Shop', description: 'Faster inventory turnover with direct wholesale mandi sourcing.', estimatedCapital: '₹30,000 - ₹80,000' }
      ]
    }
  },

  'Tailoring': {
    score: 72,
    statusText: '🟢 Good Potential',
    opportunityAnalysis: {
      summary: 'Growing demand for custom stitching, blouse designing, school uniform orders, and garment alterations in rural and semi-urban clusters.',
      opportunityScore: 74
    },
    competitorInfo: {
      countWithinRadius: 11,
      competitionLevel: 'Low',
      marketDensity: 'Sparse',
      chartData: [
        { name: 'Home Tailors', count: 7 },
        { name: 'Boutiques', count: 2 },
        { name: 'Uniform Contractors', count: 2 }
      ]
    },
    pricingInfo: {
      marketRange: '₹150 – ₹450 per garment alteration/stitching',
      suggestedStartingPrice: '₹200 Basic / ₹350 Designer Stitching',
      potentialGrossMargin: '55% – 70%',
      explanation: 'High service margin business as prime cost is personal skill labor and thread/trim consumables.'
    },
    swot: {
      strengths: [
        'Very high service profit margin (50%+)',
        'Low capital requirement for machinery and scissors/tables',
        'Festival and wedding season demand spikes'
      ],
      weaknesses: [
        'Capacity bound by owner manual stitching speed',
        'Seasonal demand fluctuations (peak during festivals)',
        'Requires skilled stitching labor'
      ],
      opportunities: [
        'Bulk contracts for local school and worker uniforms',
        'Readymade fashion alterations and embroidery add-ons',
        'Training assistant apprentices to expand shop capacity'
      ],
      threats: [
        'Rising popularity of cheap readymade garments',
        'Power outages slowing down electric sewing machines',
        'Machine breakdown during peak festival season'
      ]
    },
    risks: [
      { risk: 'Seasonal Income Dip', probability: 'Medium', impact: 'Medium', mitigation: 'Take up school uniform bulk orders during non-festival off-seasons.' },
      { risk: 'Power Disruption', probability: 'Medium', impact: 'Medium', mitigation: 'Use heavy-duty manual treadle machines alongside electric motors.' }
    ],
    recommendation: {
      headline: 'Highly feasible low-capital service enterprise.',
      whyList: [
        'Excellent return on small capital investment.',
        'High gross margins with minimal recurring raw material costs.',
        'Strong referral-based customer acquisition in village communities.'
      ],
      actionSteps: [
        'Procure 2 reliable sewing machines (1 motor-driven + 1 manual/interlock).',
        'Create sample catalog of recent blouse and suit designs.',
        'Approach local schools for annual uniform stitching contracts.'
      ],
      alternatives: [
        { title: 'Embroidery & Zardosi Unit', description: 'Higher margin specialized designer garment enhancement.', estimatedCapital: '₹40,000 - ₹90,000' },
        { title: 'Readymade Clothing Retailer', description: 'Selling pre-stitched everyday wear sourced from regional hubs.', estimatedCapital: '₹1,50,000 - ₹3,00,000' }
      ]
    }
  },

  'Food Processing': {
    score: 81,
    statusText: '🟢 High Potential',
    opportunityAnalysis: {
      summary: 'Value addition to locally grown crops (papad, pickles, pulse milling, chili/turmeric grinding, oil extraction). Excellent potential for local retail and town supply.',
      opportunityScore: 85
    },
    competitorInfo: {
      countWithinRadius: 9,
      competitionLevel: 'Low',
      marketDensity: 'Sparse',
      chartData: [
        { name: 'Cottage Units', count: 5 },
        { name: 'Flour/Spice Mills', count: 3 },
        { name: 'Packaged Brands', count: 1 }
      ]
    },
    pricingInfo: {
      marketRange: '₹120 – ₹260 per kg processed product',
      suggestedStartingPrice: '₹180 per kg',
      potentialGrossMargin: '30% – 45%',
      explanation: 'Substantial margin gain achieved by purchasing raw farm produce during harvest season at low prices.'
    },
    swot: {
      strengths: [
        'Abundant raw material availability directly from local farmers',
        'Long shelf-life of processed goods (spices, pickles, papad)',
        'Government subsidy grants under PM FME scheme'
      ],
      weaknesses: [
        'FSSAI food hygiene and packaging compliance needed',
        'Seasonal raw material price fluctuations',
        'Requires initial grinding/packaging machinery'
      ],
      opportunities: [
        'Selling branded hygienic products in regional town shops',
        'Supply to self-help group (SHG) food distribution networks',
        'Exporting organic powdered spices to city organic stores'
      ],
      threats: [
        'Quality deterioration due to improper moisture sealing',
        'Competition from large commercial national food brands',
        'Pest infestation during raw crop storage'
      ]
    },
    risks: [
      { risk: 'FSSAI & Quality Non-compliance', probability: 'Low', impact: 'High', mitigation: 'Obtain standard basic FSSAI registration and maintain strict hygienic packaging.' },
      { risk: 'Moisture Spoilage in Storage', probability: 'Medium', impact: 'Medium', mitigation: 'Use sealed polythene bags and nitrogen/dehumidifier storage.' }
    ],
    recommendation: {
      headline: 'Excellent growth potential with value addition.',
      whyList: [
        'Transforms low-cost local crops into premium packaged goods.',
        'High subsidy eligibility under rural food processing initiatives.',
        'Scalable from cottage level to commercial brand.'
      ],
      actionSteps: [
        'Select 2 flagship products (e.g. Pure Turmeric Powder & Handmade Papad).',
        'Acquire basic grinding machine and heat impulse sealer.',
        'Register for basic FSSAI license and SHG market linkage.'
      ],
      alternatives: [
        { title: 'Cold-Pressed Mustard/Groundnut Oil Mill', description: 'High demand for pure unadulterated cooking oil.', estimatedCapital: '₹2,00,000 - ₹5,00,000' },
        { title: 'Fruit Jam & Pickle Cottage Unit', description: 'Seasonal fruit preservation with long shelf-life retail sales.', estimatedCapital: '₹50,000 - ₹1,50,000' }
      ]
    }
  }
};

/**
 * Fallback template for any business not explicitly listed above
 */
export const DEFAULT_GENERIC_TEMPLATE: Partial<FeasibilityReport> = {
  score: 70,
  statusText: '🟢 Feasible Concept',
  opportunityAnalysis: {
    summary: 'The proposed local enterprise addresses a steady community demand within the 10 km service radius. Leveraging local workforce and personal capital ensures manageable overheads.',
    opportunityScore: 72
  },
  competitorInfo: {
    countWithinRadius: 12,
    competitionLevel: 'Medium',
    marketDensity: 'Moderate',
    chartData: [
      { name: 'Direct Competitors', count: 6 },
      { name: 'Indirect Competitors', count: 4 },
      { name: 'Town Suppliers', count: 2 }
    ]
  },
  pricingInfo: {
    marketRange: 'Configured Local Market Standard',
    suggestedStartingPrice: 'Competitive Regional Rate',
    potentialGrossMargin: '20% – 35%',
    explanation: 'Pricing should reflect local purchasing power while maintaining a minimum 20% margin to cover financing costs.'
  },
  swot: {
    strengths: [
      'Low operational overhead in village location',
      'Direct owner involvement and quick decision making',
      'Leverages personal capital to minimize debt burden'
    ],
    weaknesses: [
      'Limited immediate customer radius without transport',
      'Initial brand awareness building required',
      'Working capital dependence on early cash flow'
    ],
    opportunities: [
      'Expanding supply to neighboring mandal villages',
      'Utilizing digital payments and WhatsApp ordering',
      'Applying for rural micro-entrepreneurship financial schemes'
    ],
    threats: [
      'Fluctuations in raw material or wholesale costs',
      'Unexpected local economic slowdowns',
      'New competitor entry in immediate vicinity'
    ]
  },
  risks: [
    { risk: 'Delayed Market Adoption', probability: 'Medium', impact: 'Medium', mitigation: 'Offer introductory promotional rates and active local word-of-mouth marketing.' },
    { risk: 'Working Capital Shortage', probability: 'Medium', impact: 'High', mitigation: 'Maintain emergency cash buffer equal to 2 months of operational expenses.' }
  ],
  recommendation: {
    headline: 'Proceed with controlled step-by-step rollout.',
    whyList: [
      'Positive alignment with local demand patterns.',
      'Manageable initial financial liability.',
      'Scalable model based on customer feedback.'
    ],
    actionSteps: [
      'Validate exact pricing with 10 local prospective customers.',
      'Procure primary equipment and establish vendor supply contracts.',
      'Set up simple daily income and expense book-keeping.'
    ],
    alternatives: [
      { title: 'Local Transport & Delivery Service', description: 'Providing cargo tricycle or auto goods transport for local mandis.', estimatedCapital: '₹1,00,000 - ₹2,50,000' },
      { title: 'Solar Powered Repair & Charging Shop', description: 'Repairing agricultural equipment and solar appliances.', estimatedCapital: '₹60,000 - ₹1,50,000' }
    ]
  }
};
