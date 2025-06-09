import React from "react";
import Typography from "@/components/Typography";

interface ComplexityProps {
  time: string;
  space: string;
  description?: string;
  className?: string;
}

export default function ComplexityInfo({
  time,
  space,
  description,
  className = "",
}: ComplexityProps) {
  return (
    <div
      className={`bg-gradient-to-br from-slate-800 to-slate-900/90 backdrop-blur-xl p-6 rounded-xl border border-slate-700/50 shadow-lg ${className}`}
    >
      {description && (
        <Typography className="text-base text-slate-300 mb-4">
          {description}
        </Typography>
      )}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-slate-700/50 rounded-lg">
            <svg
              className="w-4 h-4 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <Typography className="text-sm font-medium text-slate-300">
            Time: <span className="text-slate-200">{time}</span>
          </Typography>
        </div>
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-slate-700/50 rounded-lg">
            <svg
              className="w-4 h-4 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
              />
            </svg>
          </div>
          <Typography className="text-sm font-medium text-slate-300">
            Space: <span className="text-slate-200">{space}</span>
          </Typography>
        </div>
      </div>
    </div>
  );
}
