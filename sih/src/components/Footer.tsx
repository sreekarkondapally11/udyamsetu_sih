import React from 'react';
import { Sprout } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 py-8 px-4 mt-12 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="flex items-center gap-2">
          <Sprout className="w-5 h-5 text-emerald-500" />
          <span className="font-bold text-white">RuralBiz AI</span>
          <span className="text-xs bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800 font-mono">
            College Project Prototype
          </span>
        </div>
        <p className="text-xs text-slate-400">
          AI-Driven Hyper-Local Business Advisory and Financial Structuring Assistant for Rural Micro-Entrepreneurs.
        </p>
        <div className="text-xs text-slate-400">
          Lightweight Prototype &bull; Local Storage Persistence
        </div>
      </div>
    </footer>
  );
};
