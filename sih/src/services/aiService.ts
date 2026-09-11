import type { AnalysisInput, FeasibilityReport, MarketReach } from '../types';
import { BUSINESS_TEMPLATES, DEFAULT_GENERIC_TEMPLATE } from '../data/defaultData';
import { fetchRealSpatialMetrics } from './spatialService';

/**
 * AI Service Abstraction Layer
 * Supports both Real AI (when API Key is provided) and instant Demo AI fallback.
 * Requirement 23: Application MUST work offline without an AI API key.
 */

export interface AIServiceConfig {
  apiKey?: string;
  useLiveAI?: boolean;
}

// Global state for optional user API Key
let globalApiKey: string | null = localStorage.getItem('ruralbiz_ai_key') || null;

export function setApiKey(key: string | null) {
  globalApiKey = key;
  if (key) {
    localStorage.setItem('ruralbiz_ai_key', key);
  } else {
    localStorage.removeItem('ruralbiz_ai_key');
  }
}

export function getApiKey(): string | null {
  return globalApiKey;
}

/**
 * Calculate contextual market reach numbers dynamically based on geographic radius
 */
export function calculateMarketReach(radius: number): MarketReach {
  const baseRadius = Math.max(1, radius);
  const factor = Math.pow(baseRadius / 10, 1.4); // non-linear spatial scaling
  
  const population = Math.round(25000 * factor);
  const households = Math.round(8000 * factor);
  const potentialCustomers = Math.round(2400 * factor);

  return {
    population,
    households,
    potentialCustomers,
    radius: baseRadius
  };
}

interface LiveGeminiResult {
  report: FeasibilityReport | null;
  error?: string;
}

/**
 * Call Live Google Gemini API when an API key is configured
 */
async function fetchLiveGeminiAnalysis(
  input: AnalysisInput,
  apiKey: string
): Promise<LiveGeminiResult> {
  const businessName = input.customBusinessName || input.businessType;
  const { village, mandal, district, state, radius } = input.location;

  const prompt = `
You are RuralBiz AI, an expert rural micro-enterprise feasibility and financial structuring assistant in India.
Analyze starting a "${businessName}" business in ${village} village, ${mandal} mandal, ${district} district, ${state} with an operating radius of ${radius} km and own equity capital of ₹${input.ownCapital.toLocaleString('en-IN')}.
Additional Operational Context: Experience: "${input.experience || 'Standard'}", Land: "${input.availableLand || 'Standard'}", Employees: ${input.employees || 2}, Expected Scale: "${input.expectedScale || 'Micro'}".

Predict realistic, hyper-local feasibility data for this specific location.
Return ONLY a raw valid JSON object (no markdown formatting, no code blocks) matching this exact schema:
{
  "score": 82,
  "statusText": "🟢 High Potential",
  "marketReach": {
    "population": 28000,
    "households": 6000,
    "potentialCustomers": 1800,
    "radius": ${radius}
  },
  "opportunityAnalysis": {
    "summary": "Detailed 2-3 sentence hyper-local market analysis specifically for ${businessName} in ${village}, ${mandal}, ${district}, ${state}.",
    "opportunityScore": 85
  },
  "competitorInfo": {
    "countWithinRadius": 14,
    "competitionLevel": "Medium",
    "marketDensity": "Moderate",
    "chartData": [
      { "name": "Local Competitors", "count": 7 },
      { "name": "Mandal Hub Vendors", "count": 4 },
      { "name": "Town Suppliers", "count": 3 }
    ]
  },
  "pricingInfo": {
    "marketRange": "₹50 – ₹70 per unit",
    "suggestedStartingPrice": "₹60 per unit",
    "potentialGrossMargin": "20% – 30%",
    "explanation": "Pricing driver explanation for ${district} region."
  },
  "swot": {
    "strengths": ["Item 1", "Item 2", "Item 3"],
    "weaknesses": ["Item 1", "Item 2"],
    "opportunities": ["Item 1", "Item 2", "Item 3"],
    "threats": ["Item 1", "Item 2"]
  },
  "risks": [
    { "risk": "Risk 1", "probability": "Medium", "impact": "High", "mitigation": "Mitigation 1" },
    { "risk": "Risk 2", "probability": "Low", "impact": "Medium", "mitigation": "Mitigation 2" }
  ],
  "recommendation": {
    "headline": "Proceed with planned operational modifications.",
    "whyList": ["Reason 1", "Reason 2", "Reason 3"],
    "actionSteps": ["Step 1", "Step 2", "Step 3", "Step 4"],
    "alternatives": [
      { "title": "Alternative 1", "description": "Desc 1", "estimatedCapital": "₹50,000" },
      { "title": "Alternative 2", "description": "Desc 2", "estimatedCapital": "₹1,00,000" },
      { "title": "Alternative 3", "description": "Desc 3", "estimatedCapital": "₹1,50,000" }
    ]
  }
}
`;

function extractJsonFromString(text: string): any {
  try {
    const cleanStr = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
    return JSON.parse(cleanStr);
  } catch {
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace > firstBrace) {
      const jsonSub = text.substring(firstBrace, lastBrace + 1);
      return JSON.parse(jsonSub);
    }
    throw new Error('Could not parse valid JSON from AI response');
  }
}

  const models = [
    'gemini-1.5-flash-latest',
    'gemini-1.5-flash',
    'gemini-2.0-flash',
    'gemini-2.0-flash-exp',
    'gemini-2.5-flash',
    'gemini-1.5-pro'
  ];
  let lastErrorMsg = '';

  for (const model of models) {
    // Try payload with and without generationConfig
    const configsToTry = [
      { temperature: 0.3, responseMimeType: 'application/json' },
      { temperature: 0.3 }
    ];

    for (const genConfig of configsToTry) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: genConfig
          })
        });

        if (!response.ok) {
          const errJson = await response.json().catch(() => ({}));
          lastErrorMsg = errJson?.error?.message || `HTTP ${response.status} (${response.statusText})`;
          console.warn(`Gemini API Model ${model} HTTP Error:`, response.status, lastErrorMsg);
          continue;
        }

        const data = await response.json();
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!rawText) continue;

        const parsed = extractJsonFromString(rawText) as FeasibilityReport;
        if (parsed && parsed.score && parsed.swot) {
          return { report: parsed };
        }
      } catch (err: any) {
        lastErrorMsg = err?.message || 'Network / CORS error when connecting to Google Gemini API';
        console.warn(`Gemini API call with ${model} failed:`, err);
      }
    }
  }

  return { report: null, error: lastErrorMsg || 'Unable to connect to Google Gemini API with provided key.' };
}

/**
 * Generate Hyper-Local Business Feasibility Report
 */
export async function generateFeasibilityReport(
  input: AnalysisInput
): Promise<FeasibilityReport> {
  const radius = input.location.radius || 10;
  const lat = input.location.lat || 17.9784;
  const lng = input.location.lng || 79.5941;

  // Fetch real OpenStreetMap Overpass API spatial metrics for the exact radius & coordinates
  const spatialData = await fetchRealSpatialMetrics(lat, lng, radius, input.businessType);
  let aiError: string | undefined = undefined;
  
  // If an API key is saved, try Live Gemini API call first
  if (globalApiKey && globalApiKey.trim().length > 0) {
    const { report: liveReport, error } = await fetchLiveGeminiAnalysis(input, globalApiKey.trim());
    if (liveReport && liveReport.score && liveReport.swot) {
      const isAICompetitorsValid = liveReport.competitorInfo && liveReport.competitorInfo.chartData && liveReport.competitorInfo.chartData.length > 0;

      return {
        ...liveReport,
        isRealAI: true,
        dataSourceLabel: '✨ Live Gemini AI Predicted Data',
        marketReach: liveReport.marketReach || spatialData.marketReach,
        competitorInfo: isAICompetitorsValid ? liveReport.competitorInfo : spatialData.competitorInfo
      };
    } else if (error) {
      aiError = error;
    }
  }

  // Fallback: Offline Engine with real spatial radius metrics
  const template = BUSINESS_TEMPLATES[input.businessType] || DEFAULT_GENERIC_TEMPLATE;

  let score = template.score || 75;
  if (input.ownCapital < 50000) {
    score = Math.max(55, score - 6);
  } else if (input.ownCapital > 200000) {
    score = Math.min(95, score + 4);
  }

  let statusText = '🟢 Good Potential';
  if (score >= 80) statusText = '🟢 High Potential';
  else if (score >= 70) statusText = '🟢 Good Potential';
  else if (score >= 60) statusText = '🟡 Moderate Feasibility';
  else statusText = '🔴 High Risk';

  const locationLabel = `${input.location.village}, ${input.location.mandal}`;
  const baseSummary = template.opportunityAnalysis?.summary || DEFAULT_GENERIC_TEMPLATE.opportunityAnalysis!.summary;
  const customizedSummary = `Targeting ${locationLabel} (${input.location.district} Dist, ${radius} km Service Radius): ${baseSummary}`;

  const dataSourceLabel = spatialData.isRealGPSData
    ? '📍 Real Spatial GPS Data (OpenStreetMap Overpass)'
    : 'Demo / Estimated Data (Offline Mode)';

  const report: FeasibilityReport = {
    score,
    statusText,
    isRealAI: false,
    isRealGPSData: spatialData.isRealGPSData,
    dataSourceLabel,
    aiErrorMessage: aiError,
    marketReach: spatialData.marketReach,
    opportunityAnalysis: {
      summary: customizedSummary,
      opportunityScore: Math.min(99, score + 4)
    },
    competitorInfo: spatialData.competitorInfo,
    pricingInfo: template.pricingInfo || DEFAULT_GENERIC_TEMPLATE.pricingInfo!,
    swot: template.swot || DEFAULT_GENERIC_TEMPLATE.swot!,
    risks: template.risks || DEFAULT_GENERIC_TEMPLATE.risks!,
    recommendation: {
      headline: template.recommendation?.headline || DEFAULT_GENERIC_TEMPLATE.recommendation!.headline,
      whyList: template.recommendation?.whyList || DEFAULT_GENERIC_TEMPLATE.recommendation!.whyList,
      actionSteps: template.recommendation?.actionSteps || DEFAULT_GENERIC_TEMPLATE.recommendation!.actionSteps,
      alternatives: template.recommendation?.alternatives || DEFAULT_GENERIC_TEMPLATE.recommendation!.alternatives
    }
  };

  await new Promise((resolve) => setTimeout(resolve, 400));

  return report;
}
