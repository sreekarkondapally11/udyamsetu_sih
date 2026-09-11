import React from 'react';
import { PlusCircle, FileText, TrendingUp, DollarSign, ArrowRight, Trash2, Eye } from 'lucide-react';
import type { SavedReport } from '../types';

interface DashboardProps {
  reports: SavedReport[];
  onNewAnalysis: () => void;
  onViewReport: (report: SavedReport) => void;
  onDeleteReport: (id: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  reports,
  onNewAnalysis,
  onViewReport,
  onDeleteReport
}) => {
  // Compute Dashboard Card metrics
  const totalAnalyses = reports.length;
  
  const avgFeasibility = totalAnalyses > 0
    ? Math.round(reports.reduce((acc, r) => acc + r.feasibilityScore, 0) / totalAnalyses)
    : 0;

  const totalPlannedInvestment = reports.reduce((acc, r) => acc + (r.financial?.projectCost || 0), 0);

  return (
    <div className="space-y-8 py-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-emerald-950 p-6 rounded-3xl text-white border border-slate-800 shadow-xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">RuralBiz AI Dashboard</h1>
          <p className="text-slate-300 text-sm mt-1">
            Overview of rural entrepreneur advisory sessions and local project feasibility scores.
          </p>
        </div>
        <button
          onClick={onNewAnalysis}
          className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
        >
          <PlusCircle className="w-5 h-5" /> Start New Analysis
        </button>
      </div>

      {/* DASHBOARD CARDS (Requirement 5) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Business Analyses */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2 hover:border-emerald-400 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Business Analyses</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{totalAnalyses}</div>
          <div className="text-xs text-slate-500">Evaluated Rural Ventures</div>
        </div>

        {/* Card 2: Average Feasibility */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2 hover:border-emerald-400 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Average Feasibility</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-600">{avgFeasibility}%</div>
          <div className="text-xs text-slate-500">Local Area Market Potential</div>
        </div>

        {/* Card 3: Total Planned Investment */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2 hover:border-emerald-400 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Investment</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">
            ₹{totalPlannedInvestment.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-slate-500">Combined Project Costs</div>
        </div>

        {/* Card 4: Saved Reports */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2 hover:border-emerald-400 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Saved Reports</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{totalAnalyses}</div>
          <div className="text-xs text-slate-500">Stored in LocalStorage</div>
        </div>

      </div>

      {/* RECENT ANALYSES SECTION (Requirement 5) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">Recent Analyses</h3>
            <p className="text-xs text-slate-500">Review recent advisory reports and scheme routings.</p>
          </div>
          <button
            onClick={onNewAnalysis}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            New Analysis <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {reports.length === 0 ? (
          <div className="text-center py-12 text-slate-500 space-y-3">
            <FileText className="w-12 h-12 mx-auto text-slate-300" />
            <p className="text-sm font-medium">No saved analyses found yet.</p>
            <button
              onClick={onNewAnalysis}
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
            >
              Run First Analysis
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Business</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Own Capital</th>
                  <th className="py-3 px-4">Feasibility</th>
                  <th className="py-3 px-4">Scheme</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-900 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      {report.businessName}
                    </td>
                    <td className="py-4 px-4 text-xs text-slate-600">{report.locationSummary}</td>
                    <td className="py-4 px-4 font-semibold text-slate-900">
                      ₹{report.ownCapital?.toLocaleString('en-IN')}
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {report.feasibilityScore} / 100
                      </span>
                    </td>
                    <td className="py-4 px-4 text-xs font-medium text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 w-fit">
                      {report.schemeName}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onViewReport(report)}
                          className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" /> View
                        </button>
                        <button
                          onClick={() => onDeleteReport(report.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Report"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
