import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Landmark, ArrowRight, Info, ShieldCheck } from 'lucide-react';
import type { FinancialPlan } from '../types';
import { calculateFinancialPlan } from '../services/financialEngine';

interface FinancialCalculatorProps {
  initialCapital: number;
  onProceedToRoadmap: (plan: FinancialPlan) => void;
}

export const FinancialCalculator: React.FC<FinancialCalculatorProps> = ({
  initialCapital,
  onProceedToRoadmap
}) => {
  const [ownContribution, setOwnContribution] = useState<number>(initialCapital || 100000);
  const [customProjectCost, setCustomProjectCost] = useState<number>(initialCapital ? Math.round(initialCapital / 0.10) : 1000000);
  const [useCustomCost, setUseCustomCost] = useState<boolean>(false);

  // User customizable scheme parameters
  const [customInterestRate, setCustomInterestRate] = useState<number | undefined>(undefined);
  const [customTenureYears, setCustomTenureYears] = useState<number | undefined>(undefined);
  const [customMoratoriumMonths, setCustomMoratoriumMonths] = useState<number | undefined>(undefined);
  const [customMaxLoanText, setCustomMaxLoanText] = useState<string | undefined>(undefined);

  // Calculate financial plan dynamically based on user input & custom scheme overrides
  const plan: FinancialPlan = calculateFinancialPlan(
    ownContribution,
    useCustomCost ? customProjectCost : undefined,
    undefined,
    {
      interestRate: customInterestRate,
      tenureYears: customTenureYears,
      moratoriumMonths: customMoratoriumMonths,
      maxLoanText: customMaxLoanText,
    }
  );

  const handleCapitalChange = (val: number) => {
    const safeVal = Math.max(1000, val);
    setOwnContribution(safeVal);
    if (!useCustomCost) {
      setCustomProjectCost(Math.round(safeVal / 0.10));
    }
  };

  const handleProjectCostChange = (val: number) => {
    const safeVal = Math.max(ownContribution + 1000, val);
    setCustomProjectCost(safeVal);
    setUseCustomCost(true);
  };

  const handleResetSchemeDefaults = () => {
    setCustomInterestRate(undefined);
    setCustomTenureYears(undefined);
    setCustomMoratoriumMonths(undefined);
    setCustomMaxLoanText(undefined);
  };

  const hasCustomSchemeParams = customInterestRate !== undefined ||
    customTenureYears !== undefined ||
    customMoratoriumMonths !== undefined ||
    customMaxLoanText !== undefined;

  // Prepare chart datasets for Recharts
  const balanceTrendData = plan.schedule.map((row) => ({
    quarter: `Q${row.quarter}`,
    balance: row.closingBalance,
    payment: row.payment
  }));

  const pieData = [
    { name: 'Principal Loan Amount', value: plan.loanAmount, color: '#0d9488' },
    { name: 'Total Interest Payable', value: plan.totalInterest, color: '#f59e0b' }
  ];

  return (
    <div className="space-y-10 py-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-teal-400 bg-teal-950 px-3 py-1 rounded-full border border-teal-800">
            MODULE 2 — SMART FINANCIAL CALCULATOR & SCHEME ROUTER
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-2">Financial Structuring Engine</h1>
          <p className="text-slate-300 text-sm mt-1">
            Dynamic capital structuring, scheme routing, and customizable loan amortization parameters.
          </p>
        </div>

        <div className="px-4 py-2 bg-slate-800/90 rounded-2xl border border-slate-700 text-right">
          <div className="text-xs text-slate-400">Selected Financial Scheme</div>
          <div className="text-lg font-bold text-teal-400">{plan.scheme.name}</div>
        </div>
      </div>

      {/* SECTION 1: CAPITAL BREAKDOWN */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Capital & Project Structuring</h2>
            <p className="text-xs text-slate-500">Dynamic Capital Ratio ({plan.ownContributionPercent}% Equity / {plan.loanPercent}% Loan)</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Own Contribution (₹):
              </label>
              <input
                type="number"
                min="1000"
                step="5000"
                value={ownContribution}
                onFocus={(e) => e.target.select()}
                onChange={(e) => handleCapitalChange(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 font-bold text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Total Project Cost (₹):
              </label>
              <input
                type="number"
                min={ownContribution + 1000}
                step="10000"
                value={useCustomCost ? customProjectCost : plan.projectCost}
                onFocus={(e) => e.target.select()}
                onChange={(e) => handleProjectCostChange(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 font-bold text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        </div>

        {/* Visual Capital Split (Dynamic Percentages) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-5 text-center space-y-1 shadow-sm">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800">
              YOUR CAPITAL ({plan.ownContributionPercent}%)
            </span>
            <div className="text-3xl font-black text-emerald-950">₹{plan.ownContribution.toLocaleString('en-IN')}</div>
            <div className="text-[11px] text-emerald-700">Equity / Savings Investment</div>
          </div>

          <div className="hidden md:flex justify-center text-slate-400 font-extrabold text-2xl">+</div>

          <div className="bg-teal-50 border-2 border-teal-300 rounded-2xl p-5 text-center space-y-1 shadow-sm">
            <span className="text-xs font-extrabold uppercase tracking-wider text-teal-800">
              LOAN ({plan.loanPercent}%)
            </span>
            <div className="text-3xl font-black text-teal-950">₹{plan.loanAmount.toLocaleString('en-IN')}</div>
            <div className="text-[11px] text-teal-700">Bank / Scheme Financing</div>
          </div>

        </div>

        <div className="bg-slate-900 text-white rounded-2xl p-5 text-center space-y-1 border border-slate-800 shadow-md">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">TOTAL PROJECT COST</span>
          <div className="text-4xl font-black text-emerald-400">₹{plan.projectCost.toLocaleString('en-IN')}</div>
        </div>
      </section>

      {/* SECTION 2: SCHEME ROUTER (Interactive & Editable Scheme Parameters) */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-teal-500/20 text-teal-300 rounded-2xl border border-teal-400/30">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">SCHEME PARAMETERS (EDITABLE)</span>
              <h3 className="text-2xl font-bold text-white">Recommended Scheme: {plan.scheme.name}</h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {hasCustomSchemeParams && (
              <button
                type="button"
                onClick={handleResetSchemeDefaults}
                className="px-3 py-1 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-400/30 text-xs font-bold rounded-full transition-colors cursor-pointer"
              >
                Reset Defaults
              </button>
            )}
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-extrabold rounded-full">
              {hasCustomSchemeParams ? 'Customized' : 'Auto-Selected'}
            </span>
          </div>
        </div>

        {/* Editable Scheme Parameters Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Interest Rate Input */}
          <div className="bg-slate-800/90 p-4 rounded-2xl border border-emerald-500/40 hover:border-emerald-400 transition-colors shadow-md space-y-1">
            <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider flex items-center justify-between">
              <span>Interest Rate (% p.a.)</span>
              <span className="text-[10px] text-slate-400 font-normal">Editable</span>
            </div>
            <input
              type="number"
              step="0.1"
              min="1"
              max="30"
              value={customInterestRate !== undefined ? customInterestRate : plan.scheme.interestRate}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setCustomInterestRate(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-2xl font-black text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Tenure Input */}
          <div className="bg-slate-800/90 p-4 rounded-2xl border border-teal-500/40 hover:border-teal-400 transition-colors shadow-md space-y-1">
            <div className="text-xs text-teal-400 font-bold uppercase tracking-wider flex items-center justify-between">
              <span>Tenure (Years)</span>
              <span className="text-[10px] text-slate-400 font-normal">Editable</span>
            </div>
            <input
              type="number"
              min="1"
              max="30"
              step="1"
              value={customTenureYears !== undefined ? customTenureYears : plan.scheme.tenureYears}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setCustomTenureYears(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-2xl font-black text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Moratorium Input */}
          <div className="bg-slate-800/90 p-4 rounded-2xl border border-amber-500/40 hover:border-amber-400 transition-colors shadow-md space-y-1">
            <div className="text-xs text-amber-400 font-bold uppercase tracking-wider flex items-center justify-between">
              <span>Moratorium (Months)</span>
              <span className="text-[10px] text-slate-400 font-normal">Editable</span>
            </div>
            <input
              type="number"
              min="0"
              max="36"
              step="1"
              value={customMoratoriumMonths !== undefined ? customMoratoriumMonths : plan.scheme.moratoriumMonths}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setCustomMoratoriumMonths(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-2xl font-black text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Max Scheme Loan Input */}
          <div className="bg-slate-800/90 p-4 rounded-2xl border border-emerald-500/40 hover:border-emerald-400 transition-colors shadow-md space-y-1">
            <div className="text-xs text-emerald-300 font-bold uppercase tracking-wider flex items-center justify-between">
              <span>Max Scheme Loan</span>
              <span className="text-[10px] text-slate-400 font-normal">Editable</span>
            </div>
            <input
              type="text"
              value={customMaxLoanText !== undefined ? customMaxLoanText : plan.scheme.maxLoanText}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setCustomMaxLoanText(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xl font-extrabold text-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

        </div>

        {/* Mandatory Disclaimer (Requirement 16) */}
        <div className="flex items-start gap-2 bg-slate-800/60 p-4 rounded-xl border border-slate-700 text-xs text-slate-300 italic">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>“{plan.scheme.disclaimer}”</span>
        </div>
      </section>

      {/* SECTION 3: EMI & REPAYMENT SUMMARY (Requirement 17) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">Deterministic EMI & Interest Summary</h3>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
            Standard Financial Formula
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="text-xs text-slate-500 font-medium">Monthly EMI</div>
            <div className="text-2xl font-black text-slate-900 mt-1">₹{plan.monthlyEMI.toLocaleString('en-IN')}</div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="text-xs text-slate-500 font-medium">Quarterly Repayment</div>
            <div className="text-2xl font-black text-teal-700 mt-1">₹{plan.quarterlyPayment.toLocaleString('en-IN')}</div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="text-xs text-slate-500 font-medium">Total Interest Payable</div>
            <div className="text-2xl font-black text-amber-600 mt-1">₹{plan.totalInterest.toLocaleString('en-IN')}</div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="text-xs text-slate-500 font-medium">Total Repayment Amount</div>
            <div className="text-2xl font-black text-emerald-600 mt-1">₹{plan.totalRepayment.toLocaleString('en-IN')}</div>
          </div>
        </div>
      </section>

      {/* SECTION 4: MORATORIUM EXPLANATION (Requirement 18) */}
      <section className="bg-amber-50 border border-amber-200 rounded-3xl p-6 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-lg">
          <ShieldCheck className="w-5 h-5 text-amber-700" /> Moratorium Period Explanation ({plan.scheme.moratoriumMonths} Months)
        </div>
        <p className="text-amber-950 text-sm leading-relaxed">
          “A moratorium is an initial period during which repayment is deferred according to the configured loan terms. Interest treatment should be verified for the selected scheme.”
        </p>
      </section>

      {/* SECTION 5: VISUAL RECHARTS GRAPHS (Requirement 19) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Outstanding Balance Trend */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg space-y-4">
          <h4 className="font-bold text-slate-900 text-base">Outstanding Loan Balance Over Time</h4>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={balanceTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="balanceColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="quarter" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', border: 'none' }} />
                <Area type="monotone" dataKey="balance" stroke="#0d9488" fillOpacity={1} fill="url(#balanceColor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Principal vs Interest Breakdown */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg space-y-4">
          <h4 className="font-bold text-slate-900 text-base">Principal vs Total Interest Ratio</h4>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', border: 'none' }} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </section>

      {/* SECTION 6: QUARTERLY REPAYMENT SCHEDULE TABLE (Requirement 19) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Quarterly Repayment Amortization Schedule</h3>
        <p className="text-xs text-slate-500">Complete quarter-by-quarter repayment breakdown.</p>

        <div className="overflow-x-auto max-h-96">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-100 font-bold uppercase tracking-wider text-slate-600 sticky top-0 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Quarter</th>
                <th className="py-3 px-4">Opening Balance</th>
                <th className="py-3 px-4">Principal Paid</th>
                <th className="py-3 px-4">Interest Paid</th>
                <th className="py-3 px-4">Quarterly Payment</th>
                <th className="py-3 px-4">Closing Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {plan.schedule.map((row) => (
                <tr key={row.quarter} className="hover:bg-slate-50">
                  <td className="py-2.5 px-4 font-bold text-slate-900">Q{row.quarter}</td>
                  <td className="py-2.5 px-4">₹{row.openingBalance.toLocaleString('en-IN')}</td>
                  <td className="py-2.5 px-4 text-emerald-700 font-semibold">₹{row.principal.toLocaleString('en-IN')}</td>
                  <td className="py-2.5 px-4 text-amber-700 font-semibold">₹{row.interest.toLocaleString('en-IN')}</td>
                  <td className="py-2.5 px-4 font-bold text-slate-900">₹{row.payment.toLocaleString('en-IN')}</td>
                  <td className="py-2.5 px-4 font-semibold text-slate-600">₹{row.closingBalance.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* PROCEED TO FINAL ROADMAP CTA */}
      <div className="pt-4 text-center">
        <button
          onClick={() => onProceedToRoadmap(plan)}
          className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-extrabold text-lg rounded-2xl shadow-xl hover:shadow-emerald-600/25 transition-all flex items-center justify-center gap-3 mx-auto cursor-pointer"
        >
          Generate Final Business Roadmap <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
