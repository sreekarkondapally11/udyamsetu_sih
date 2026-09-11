import React from 'react';
import { MapPin, Coins, Store, Cpu, PieChart, Landmark, ArrowRight, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
  onExploreDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, onExploreDemo }) => {
  return (
    <div className="space-y-16 py-6">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-14 border border-slate-800 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-emerald-400" /> College Project Prototype
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            RuralBiz <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">AI</span>
          </h1>

          <p className="text-xl sm:text-2xl font-semibold text-emerald-100/90 leading-snug">
            AI-Powered Business & Financial Advisory for Rural Entrepreneurs
          </p>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            “Evaluate local business opportunities, understand market conditions, and build a practical financial roadmap using AI.”
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={onStart}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center gap-3 transform hover:-translate-y-0.5"
            >
              Start Business Analysis <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onExploreDemo}
              className="px-6 py-4 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-base rounded-2xl transition-all"
            >
              Explore Demo Reports
            </button>
          </div>
        </div>

        {/* ILLUSTRATIVE FLOW DIAGRAM (Requirement 4) */}
        <div className="mt-14 pt-10 border-t border-slate-800/80 relative z-10">
          <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-6 text-center">
            How RuralBiz AI Works (Simple 2-Step Module Journey)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
            
            {/* Step 1: Input */}
            <div className="bg-slate-800/90 border border-slate-700/70 rounded-2xl p-4 text-center space-y-2 hover:border-emerald-500/50 transition-colors shadow-lg">
              <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-white">📍 Location</div>
              <div className="text-[11px] text-slate-400">Village, Mandal & Radius</div>
            </div>

            <div className="hidden md:flex justify-center text-slate-500 font-black">+</div>

            {/* Step 2: Capital & Idea */}
            <div className="bg-slate-800/90 border border-slate-700/70 rounded-2xl p-4 text-center space-y-2 hover:border-emerald-500/50 transition-colors shadow-lg">
              <div className="w-10 h-10 mx-auto rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                <Coins className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-white">💰 Capital + Idea</div>
              <div className="text-[11px] text-slate-400">Own Funds & Business Choice</div>
            </div>

            <div className="hidden md:flex justify-center text-slate-500 font-black">↓</div>

            {/* Step 3: Output */}
            <div className="bg-gradient-to-br from-emerald-900/90 to-teal-900/90 border border-emerald-500/50 rounded-2xl p-4 text-center space-y-2 col-span-1 md:col-span-1 shadow-xl">
              <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-400/20 flex items-center justify-center text-emerald-300">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-white">🤖 AI Analysis</div>
              <div className="text-[11px] text-emerald-200 font-medium">
                📊 Feasibility + 💰 Financial Plan
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CORE MODULES OVERVIEW */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Two Core Advisory Modules
          </h2>
          <p className="text-slate-600 text-sm">
            Everything a rural entrepreneur needs to validate demand and secure scheme financing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Module 1 Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl hover:shadow-2xl transition-shadow space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <PieChart className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                MODULE 1
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">
                Hyper-Local Business Feasibility
              </h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Answers <strong>“Is this business suitable for my local area?”</strong> with score gauges, market reach estimates, competitor analysis, pricing suggestions, SWOT, and risk mitigations.
            </p>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Dynamic Feasibility Score (0 - 100)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Geographic Market Reach & Competitor Chart
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 2×2 SWOT Matrix & Risk Mitigation Matrix
              </li>
            </ul>
          </div>

          {/* Module 2 Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl hover:shadow-2xl transition-shadow space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                MODULE 2
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">
                Smart Financial Calculator & Scheme Router
              </h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Answers <strong>“How much can I invest, how much can I borrow, which scheme applies, and how much do I need to repay?”</strong>
            </p>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" /> 10% Capital & 90% Loan Structuring
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" /> Auto Scheme Router (Micro Finance vs Term Loan)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" /> EMI & Quarterly Repayment Amortization Schedule
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* PROTOTYPE ADVANTAGES */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <ShieldCheck className="w-8 h-8 mx-auto text-emerald-400" />
            <h4 className="font-bold text-base">100% Offline Compatible</h4>
            <p className="text-xs text-slate-400">Works seamlessly out of the box with zero external API requirements.</p>
          </div>
          <div className="space-y-2">
            <Coins className="w-8 h-8 mx-auto text-amber-400" />
            <h4 className="font-bold text-base">Deterministic Formulas</h4>
            <p className="text-xs text-slate-400">Financial calculations follow exact banking rules and project cost equations.</p>
          </div>
          <div className="space-y-2">
            <Store className="w-8 h-8 mx-auto text-teal-400" />
            <h4 className="font-bold text-base">Local Report Persistence</h4>
            <p className="text-xs text-slate-400">Reports save directly to browser localStorage for instant retrieval.</p>
          </div>
        </div>
      </section>

    </div>
  );
};
