import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Sparkles, ArrowRight, ShieldAlert, CheckCircle, TrendingUp, DollarSign, Layers, Compass, HelpCircle } from 'lucide-react';
import type { AnalysisInput, FeasibilityReport as FeasibilityReportType } from '../types';
import { CircularGauge } from '../components/CircularGauge';
import { IllustrativeMap } from '../components/IllustrativeMap';

interface FeasibilityReportProps {
  input: AnalysisInput;
  report: FeasibilityReportType;
  onProceedToFinancials: () => void;
}

export const FeasibilityReport: React.FC<FeasibilityReportProps> = ({
  input,
  report,
  onProceedToFinancials
}) => {
  const businessName = input.customBusinessName || input.businessType;
  const locationLabel = `${input.location.village}, ${input.location.mandal}, ${input.location.district}`;

  return (
    <div className="space-y-10 py-6">

      {/* AI Error Warning Toast/Notice if Key Failed */}
      {report.aiErrorMessage && (
        <div className="bg-rose-900/90 border border-rose-700 text-white rounded-2xl p-4 text-xs shadow-xl flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-rose-300 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-rose-100 font-extrabold text-sm block">
              Google Gemini AI Key Notice
            </strong>
            <p className="text-rose-200">
              The AI request with your API Key encountered an error: <code className="bg-rose-950 px-1.5 py-0.5 rounded text-rose-300">{report.aiErrorMessage}</code>.
            </p>
            <p className="text-rose-300/80">
              Fell back to spatial geometry calculations. Click the key icon (🔑) in the top navigation bar to check or update your key.
            </p>
          </div>
        </div>
      )}
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
              MODULE 1 — HYPER-LOCAL FEASIBILITY
            </span>
            {report.isRealAI ? (
              <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> ✨ Live AI Predicted Data
              </span>
            ) : report.isRealGPSData ? (
              <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 bg-teal-500/20 text-teal-300 border border-teal-500/40 rounded-full shadow-sm">
                <Compass className="w-3.5 h-3.5 text-teal-400" /> 📍 Spatial GPS Predicted Data
              </span>
            ) : (
              <span className="text-xs font-semibold px-3 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-full">
                Demo / Estimated Data (Offline)
              </span>
            )}
          </div>

          <h1 className="text-3xl font-extrabold text-white mt-1">{businessName}</h1>
          <p className="text-slate-300 text-sm mt-1">
            Feasibility Evaluation for <strong>{locationLabel}</strong> ({input.location.radius} km radius)
          </p>
        </div>

        <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 flex items-center gap-4">
          <CircularGauge score={report.score} statusText={report.statusText} size={130} dark={true} />
        </div>
      </div>

      {/* SECTION 1: MARKET REACH (Requirement 8) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-emerald-600" />
          <h2 className="text-2xl font-bold text-slate-900">Estimated Market Reach</h2>
        </div>
        <IllustrativeMap
          marketReach={report.marketReach}
          locationName={input.location.village}
          mandal={input.location.mandal}
          district={input.location.district}
          state={input.location.state}
          lat={input.location.lat}
          lng={input.location.lng}
        />
      </section>

      {/* SECTION 2: OPPORTUNITY ANALYSIS (Requirement 9) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" /> Local Market Opportunity
          </h3>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-extrabold rounded-full">
            Opportunity Score: {report.opportunityAnalysis.opportunityScore}/100
          </span>
        </div>

        <p className="text-slate-700 text-base leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
          “{report.opportunityAnalysis.summary}”
        </p>
      </section>

      {/* SECTION 3: COMPETITOR ANALYSIS (Requirement 10) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Competitor Density Analysis</h3>
            <p className="text-xs text-slate-500">Evaluated within {input.location.radius} km business radius.</p>
          </div>
          {report.isRealAI ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-full w-fit">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Live Gemini AI Predicted
            </span>
          ) : report.isRealGPSData ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold px-3 py-1 bg-teal-50 text-teal-800 border border-teal-300 rounded-full w-fit">
              <Compass className="w-3.5 h-3.5 text-teal-600" /> OSM Spatial GPS Data
            </span>
          ) : (
            <span className="text-xs font-semibold px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full w-fit">
              {report.dataSourceLabel || 'Demo / Estimated Data'}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="text-xs text-slate-500 font-medium">Competitors in Radius</div>
            <div className="text-2xl font-black text-slate-900 mt-1">{report.competitorInfo.countWithinRadius}</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="text-xs text-slate-500 font-medium">Competition Level</div>
            <div className="text-2xl font-black text-amber-600 mt-1">{report.competitorInfo.competitionLevel}</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="text-xs text-slate-500 font-medium">Market Density</div>
            <div className="text-2xl font-black text-teal-600 mt-1">{report.competitorInfo.marketDensity}</div>
          </div>
        </div>

        {/* Competitors Recharts Bar Chart */}
        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={report.competitorInfo.chartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', border: 'none' }}
                cursor={{ fill: '#f1f5f9' }}
              />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {report.competitorInfo.chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : index === 1 ? '#0d9488' : '#f59e0b'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* SECTION 4: PRODUCT PRICING (Requirement 11) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-4">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-emerald-600" /> Suggested Product Pricing
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200">
            <div className="text-xs text-emerald-800 font-medium">Estimated Market Range</div>
            <div className="text-lg font-bold text-emerald-950 mt-1">{report.pricingInfo.marketRange}</div>
          </div>

          <div className="p-4 bg-teal-50/60 rounded-2xl border border-teal-200">
            <div className="text-xs text-teal-800 font-medium">Suggested Starting Price</div>
            <div className="text-lg font-extrabold text-teal-950 mt-1">{report.pricingInfo.suggestedStartingPrice}</div>
          </div>

          <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200">
            <div className="text-xs text-amber-800 font-medium">Potential Gross Margin</div>
            <div className="text-lg font-extrabold text-amber-950 mt-1">{report.pricingInfo.potentialGrossMargin}</div>
          </div>
        </div>

        <p className="text-xs text-slate-500 italic bg-slate-50 p-3 rounded-xl border border-slate-200">
          “{report.pricingInfo.explanation} Pricing is an estimate based on configured regional assumptions and should be validated locally.”
        </p>
      </section>

      {/* SECTION 5: SWOT ANALYSIS (Requirement 12 - 2x2 Grid) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-600" /> SWOT Analysis (2×2 Matrix)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strengths */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-base">
              <span className="w-3 h-3 rounded-full bg-emerald-600" /> Strengths (S)
            </div>
            <ul className="space-y-2 text-xs font-medium text-emerald-950">
              {report.swot.strengths.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-extrabold text-base">
              <span className="w-3 h-3 rounded-full bg-amber-600" /> Weaknesses (W)
            </div>
            <ul className="space-y-2 text-xs font-medium text-amber-950">
              {report.swot.weaknesses.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Opportunities */}
          <div className="bg-teal-50/70 border border-teal-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-teal-900 font-extrabold text-base">
              <span className="w-3 h-3 rounded-full bg-teal-600" /> Opportunities (O)
            </div>
            <ul className="space-y-2 text-xs font-medium text-teal-950">
              {report.swot.opportunities.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Threats */}
          <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-rose-900 font-extrabold text-base">
              <span className="w-3 h-3 rounded-full bg-rose-600" /> Threats (T)
            </div>
            <ul className="space-y-2 text-xs font-medium text-rose-950">
              {report.swot.threats.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 6: RISK ANALYSIS (Requirement 13) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-600" /> Risk Evaluation & Mitigation Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-100 font-bold uppercase tracking-wider text-slate-600 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Identified Risk</th>
                <th className="py-3 px-4">Probability</th>
                <th className="py-3 px-4">Impact</th>
                <th className="py-3 px-4">Recommended Mitigation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {report.risks.map((r, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{r.risk}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded font-extrabold text-[11px] ${
                      r.probability === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {r.probability}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded font-extrabold text-[11px] ${
                      r.impact === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {r.impact}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">{r.mitigation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 7: AI RECOMMENDATION & ALTERNATIVES (Requirement 14) */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
            AI BUSINESS RECOMMENDATION
          </span>
          <h3 className="text-2xl font-bold text-white mt-2">
            “{report.recommendation.headline}”
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* Why? */}
          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-3">
            <h4 className="font-bold text-emerald-400 text-sm">Why this recommendation?</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {report.recommendation.whyList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Steps */}
          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-3">
            <h4 className="font-bold text-teal-400 text-sm">Recommended Next Actions</h4>
            <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside">
              {report.recommendation.actionSteps.map((step, idx) => (
                <li key={idx} className="leading-relaxed">
                  <span className="font-semibold text-white">{step}</span>
                </li>
              ))}
            </ol>
          </div>

        </div>

        {/* Alternative Business Ideas suitable for capital */}
        <div className="pt-4 space-y-3 border-t border-slate-800">
          <h4 className="font-bold text-sm text-slate-300">
            Alternative Business Ideas Suitable for ₹{input.ownCapital.toLocaleString('en-IN')} Own Capital:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {report.recommendation.alternatives.map((alt, idx) => (
              <div key={idx} className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 space-y-1">
                <div className="font-bold text-emerald-300 text-sm">{alt.title}</div>
                <div className="text-xs text-slate-400 line-clamp-2">{alt.description}</div>
                <div className="text-[11px] font-mono text-amber-400 pt-1">Est. Cap: {alt.estimatedCapital}</div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* PROCEED TO MODULE 2 CTA */}
      <div className="pt-4 text-center">
        <button
          onClick={onProceedToFinancials}
          className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-lg rounded-2xl shadow-xl hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-3 mx-auto cursor-pointer"
        >
          Proceed to Module 2: Financial Plan & Scheme Router <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
