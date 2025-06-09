import React from "react";

interface ExampleCardProps {
  index: number;
  input: string;
  output: string;
  onTryClick: () => void;
  className?: string;
}

export default function ExampleCard({
  index,
  input,
  output,
  onTryClick,
  className = "",
}: ExampleCardProps) {
  return (
    <div
      className={`group bg-slate-50/80 dark:bg-slate-900/40 backdrop-blur-sm rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 p-4 ${className}`}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
              <svg
                className="w-4 h-4 text-slate-600 dark:text-slate-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Example {index + 1}
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Input:
              </span>
              <code className="px-2 py-1 bg-white dark:bg-slate-800 rounded-md text-sm font-mono text-slate-800 dark:text-slate-200">
                {input}
              </code>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Output:
              </span>
              <code className="px-2 py-1 bg-white dark:bg-slate-800 rounded-md text-sm font-mono text-slate-800 dark:text-slate-200">
                {output}
              </code>
            </div>
          </div>
        </div>
        <button
          onClick={onTryClick}
          className="ml-4 px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors duration-200"
        >
          Try this
        </button>
      </div>
    </div>
  );
}
