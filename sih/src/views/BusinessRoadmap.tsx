import React, { useState } from 'react';
import { CheckCircle2, BookmarkCheck, Printer, ArrowLeft, Landmark, PieChart, Sparkles } from 'lucide-react';
import type { AnalysisInput, FeasibilityReport, FinancialPlan, SavedReport } from '../types';
import { saveReport } from '../services/storageService';

interface BusinessRoadmapProps {
  input: AnalysisInput;
  feasibility: FeasibilityReport;
  financial: FinancialPlan;
  onNavigateHome: () => void;
  onViewMyReports: () => void;
}

export const BusinessRoadmap: React.FC<BusinessRoadmapProps> = ({
  input,
  feasibility,
  financial,
  onNavigateHome,
  onViewMyReports
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const businessName = input.customBusinessName || input.businessType;
  const locationSummary = `${input.location.village}, ${input.location.mandal}, ${input.location.district}`;

  const handleSaveReport = () => {
    const newReport: SavedReport = {
      id: `report-${Date.now()}`,
      createdAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      businessName,
      locationSummary,
      ownCapital: financial.ownContribution,
      feasibilityScore: feasibility.score,
      schemeName: financial.scheme.name,
      input,
      feasibility,
      financial
    };

    saveReport(newReport);
    setIsSaved(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-10 py-6 max-w-4xl mx-auto">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 print:border-none print:shadow-none">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
            FINAL EXECUTIVE ROADMAP
          </span>
          <h1 className="text-3xl font-black text-white mt-2">Your Business Roadmap</h1>
          <p className="text-slate-300 text-sm mt-1">
            Consolidated Rural Enterprise Advisory & Financial Scheme Blueprint
          </p>
        </div>

        <div className="flex items-center gap-3 print:hidden">
          <button
            onClick={handleSaveReport}
            disabled={isSaved}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow transition-all ${
              isSaved
                ? 'bg-emerald-800 text-emerald-200 cursor-default'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 cursor-pointer'
            }`}
          >
            <BookmarkCheck className="w-4 h-4" /> {isSaved ? 'Saved in My Reports!' : 'Save Report'}
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" /> Print / Export
          </button>
        </div>
      </div>

      {/* SUMMARY OVERVIEW GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Business & Feasibility Summary Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-sm border-b border-slate-100 pb-3">
            <PieChart className="w-5 h-5" /> Module 1: Feasibility Summary
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Proposed Venture:</span>
              <strong className="text-slate-900">{businessName}</strong>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Target Location:</span>
              <strong className="text-slate-900">{locationSummary}</strong>
            </div>

            <div className="flex justify-between py-1 items-center">
              <span className="text-slate-500 font-medium">Feasibility Score:</span>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-black rounded-full text-xs border border-emerald-200">
                {feasibility.score} / 100 — {feasibility.statusText}
              </span>
            </div>
          </div>
        </div>

        {/* Financial Summary Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-teal-700 font-extrabold text-sm border-b border-slate-100 pb-3">
            <Landmark className="w-5 h-5" /> Module 2: Financial Summary
          </div>

          <div className="space-y-2 text-xs font-medium">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Own Capital ({financial.ownContributionPercent}%):</span>
              <strong className="text-slate-900">₹{financial.ownContribution.toLocaleString('en-IN')}</strong>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Calculated Project Cost:</span>
              <strong className="text-slate-900">₹{financial.projectCost.toLocaleString('en-IN')}</strong>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Bank Loan ({financial.loanPercent}%):</span>
              <strong className="text-teal-700">₹{financial.loanAmount.toLocaleString('en-IN')}</strong>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Recommended Scheme:</span>
              <strong className="text-slate-900">{financial.scheme.name}</strong>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-slate-500">Interest / Tenure / Moratorium:</span>
              <strong className="text-slate-900">
                {financial.scheme.interestRate}% &bull; {financial.scheme.tenureYears} yrs &bull; {financial.scheme.moratoriumMonths}m
              </strong>
            </div>
          </div>
        </div>

      </div>

      {/* FINAL RECOMMENDATION & WHY SECTION (Requirement 20) */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            EXECUTIVE CONCLUSION
          </span>
          <h2 className="text-2xl font-black text-white mt-1">
            Recommendation: {feasibility.recommendation.headline}
          </h2>
        </div>

        <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-3">
          <h4 className="font-bold text-emerald-400 text-sm">Key Evaluation Factors (Why?):</h4>
          <ul className="space-y-2 text-xs text-slate-300">
            {feasibility.recommendation.whyList.map((reason, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* NEXT STEPS NUMBERED CHECKLIST (Requirement 20) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-600" /> Actionable Next Steps Checklist
        </h3>

        <div className="space-y-3">
          <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center justify-center text-xs shrink-0">1</span>
            <div>
              <div className="font-bold text-slate-900 text-sm">Validate local demand</div>
              <p className="text-xs text-slate-600 mt-0.5">Speak with 10 nearby households or buyers to confirm interest in {businessName}.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center justify-center text-xs shrink-0">2</span>
            <div>
              <div className="font-bold text-slate-900 text-sm">Check nearby competitors</div>
              <p className="text-xs text-slate-600 mt-0.5">Observe current retail pricing and service gaps within {input.location.radius} km radius.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center justify-center text-xs shrink-0">3</span>
            <div>
              <div className="font-bold text-slate-900 text-sm">Confirm scheme eligibility</div>
              <p className="text-xs text-slate-600 mt-0.5">Visit local bank branch to verify document requirements for {financial.scheme.name}.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center justify-center text-xs shrink-0">4</span>
            <div>
              <div className="font-bold text-slate-900 text-sm">Prepare required documents</div>
              <p className="text-xs text-slate-600 mt-0.5">Organize Aadhaar card, PAN, land/shop proof, and bank statement copies.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center justify-center text-xs shrink-0">5</span>
            <div>
              <div className="font-bold text-slate-900 text-sm">Start at an appropriate scale</div>
              <p className="text-xs text-slate-600 mt-0.5">Deploy ₹{financial.ownContribution.toLocaleString('en-IN')} initial capital to launch phase 1.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER ACTIONS */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 print:hidden">
        <button
          onClick={onNavigateHome}
          className="px-5 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-2xl text-xs flex items-center gap-2 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <button
          onClick={onViewMyReports}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-xs flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
        >
          View All Saved Reports
        </button>
      </div>

    </div>
  );
};
