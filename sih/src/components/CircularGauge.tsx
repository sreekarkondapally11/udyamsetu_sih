import React from 'react';

interface CircularGaugeProps {
  score: number;
  statusText: string;
  size?: number;
  dark?: boolean;
}

export const CircularGauge: React.FC<CircularGaugeProps> = ({ score, statusText, size = 180, dark = false }) => {
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let strokeColor = '#22c55e'; // green
  if (score < 65) strokeColor = '#eab308'; // yellow
  if (score < 50) strokeColor = '#ef4444'; // red

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={dark ? '#334155' : '#e2e8f0'}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Content */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className={`text-4xl font-extrabold tracking-tight ${dark ? 'text-white' : 'text-slate-800'}`}>
            {score}
          </span>
          <span className={`text-[10px] font-semibold uppercase tracking-widest ${dark ? 'text-slate-400' : 'text-slate-400'}`}>
            out of 100
          </span>
        </div>
      </div>

      <div className="mt-3 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
        {statusText}
      </div>
    </div>
  );
};

