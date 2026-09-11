import React, { useState } from 'react';
import { Sprout, LayoutDashboard, PlusCircle, FileText, Calculator, Key, Sparkles, Home } from 'lucide-react';
import { getApiKey, setApiKey } from '../services/aiService';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onNavigate }) => {
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [inputKey, setInputKey] = useState(getApiKey() || '');
  const activeKey = getApiKey();

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    setApiKey(inputKey.trim() || null);
    setShowKeyModal(false);
  };

  const handleClearKey = () => {
    setApiKey(null);
    setInputKey('');
    setShowKeyModal(false);
  };

  return (
    <>
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div 
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-extrabold text-xl tracking-tight text-white flex items-center gap-2">
                  RuralBiz <span className="text-emerald-400">AI</span>
                </div>
                <div className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
                  Rural Entrepreneur Advisory
                </div>
              </div>
            </div>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center space-x-1">
              <button
                onClick={() => onNavigate('landing')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  currentTab === 'landing'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Home className="w-4 h-4" /> Home
              </button>

              <button
                onClick={() => onNavigate('dashboard')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  currentTab === 'dashboard'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </button>

              <button
                onClick={() => onNavigate('new-analysis')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  currentTab === 'new-analysis'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <PlusCircle className="w-4 h-4" /> New Analysis
              </button>

              <button
                onClick={() => onNavigate('calculator')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  currentTab === 'calculator'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Calculator className="w-4 h-4" /> Financial Router
              </button>

              <button
                onClick={() => onNavigate('my-reports')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  currentTab === 'my-reports'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4" /> My Reports
              </button>
            </nav>

            {/* AI Mode & Key Settings */}
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                {activeKey ? 'Live AI Mode' : 'Demo AI (Offline)'}
              </span>

              <button
                onClick={() => setShowKeyModal(true)}
                title="AI Settings & API Key"
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors border border-slate-700"
              >
                <Key className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center justify-around bg-slate-950 py-2 border-t border-slate-800 text-xs">
          <button 
            onClick={() => onNavigate('dashboard')}
            className={`p-1.5 flex flex-col items-center gap-0.5 ${currentTab === 'dashboard' ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}
          >
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </button>
          <button 
            onClick={() => onNavigate('new-analysis')}
            className={`p-1.5 flex flex-col items-center gap-0.5 ${currentTab === 'new-analysis' ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}
          >
            <PlusCircle className="w-4 h-4" /> Analyze
          </button>
          <button 
            onClick={() => onNavigate('calculator')}
            className={`p-1.5 flex flex-col items-center gap-0.5 ${currentTab === 'calculator' ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}
          >
            <Calculator className="w-4 h-4" /> Finance
          </button>
          <button 
            onClick={() => onNavigate('my-reports')}
            className={`p-1.5 flex flex-col items-center gap-0.5 ${currentTab === 'my-reports' ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}
          >
            <FileText className="w-4 h-4" /> Reports
          </button>
        </div>
      </header>

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 text-white shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Key className="w-5 h-5 text-emerald-400" /> AI Provider Settings
            </h3>
            <p className="text-sm text-slate-300 mb-4">
              RuralBiz AI runs <strong>100% offline</strong> using predefined rural enterprise intelligence templates. Optionally enter an API Key below to activate live responses.
            </p>

            <form onSubmit={handleSaveKey} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  API Key (Optional)
                </label>
                <input
                  type="password"
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  placeholder="Paste AI API Key or leave empty for Demo AI"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleClearKey}
                  className="text-xs text-rose-400 hover:underline"
                >
                  Use Demo AI (Offline)
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowKeyModal(false)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 shadow"
                  >
                    Save Preference
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
