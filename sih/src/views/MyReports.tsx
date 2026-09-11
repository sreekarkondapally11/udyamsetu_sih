import React from 'react';
import { FileText, Eye, Trash2, PlusCircle, Calendar, MapPin, Coins, Award } from 'lucide-react';
import type { SavedReport } from '../types';

interface MyReportsProps {
  reports: SavedReport[];
  onViewReport: (report: SavedReport) => void;
  onDeleteReport: (id: string) => void;
  onNewAnalysis: () => void;
}

export const MyReports: React.FC<MyReportsProps> = ({
  reports,
  onViewReport,
  onDeleteReport,
  onNewAnalysis
}) => {
  return (
    <div className="space-y-8 py-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950 p-6 rounded-3xl text-white border border-slate-800 shadow-xl">
        <div>
          <h1 className="text-3xl font-extrabold text-white">My Saved Reports</h1>
          <p className="text-slate-300 text-sm mt-1">
            Persisted locally in browser localStorage ({reports.length} Reports Saved)
          </p>
        </div>
        <button
          onClick={onNewAnalysis}
          className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
        >
          <PlusCircle className="w-5 h-5" /> Start New Analysis
        </button>
      </div>

      {reports.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-lg space-y-4">
          <FileText className="w-16 h-16 mx-auto text-slate-300" />
          <h3 className="text-xl font-bold text-slate-800">No Reports Saved Yet</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Generate a feasibility & financial analysis for your rural business idea to save it here for future reference.
          </p>
          <button
            onClick={onNewAnalysis}
            className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-2xl text-sm shadow hover:bg-emerald-500 transition-colors"
          >
            Create First Report
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-lg hover:shadow-xl transition-all p-6 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {report.createdAt}
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 mt-1">{report.businessName}</h3>
                  </div>

                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-black text-xs rounded-full border border-emerald-200">
                    {report.feasibilityScore} / 100
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="truncate">{report.locationSummary}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Own Capital: <strong>₹{report.ownCapital?.toLocaleString('en-IN')}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Scheme: <strong>{report.schemeName}</strong></span>
                  </div>
                </div>
              </div>

              {/* Actions: View / Delete */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onViewReport(report)}
                  className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye className="w-4 h-4" /> View Report
                </button>

                <button
                  onClick={() => onDeleteReport(report.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                  title="Delete Report"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
