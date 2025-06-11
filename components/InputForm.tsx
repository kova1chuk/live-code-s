import React from "react";
import Typography from "@/components/ui/Typography";

interface InputFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  result?: string;
  title?: string;
  inputLabel?: string;
  inputPlaceholder?: string;
  submitButtonText?: string;
  className?: string;
}

export default function InputForm({
  value,
  onChange,
  onSubmit,
  result,
  title = "Test with your own input:",
  inputLabel = "Enter a string:",
  inputPlaceholder = "Enter input",
  submitButtonText = "Submit",
  className = "",
}: InputFormProps) {
  return (
    <div
      className={`bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-xl border border-slate-700/50 shadow-lg p-6 ${className}`}
    >
      <Typography
        variant="h3"
        className="text-xl font-medium text-slate-100 mb-6"
      >
        {title}
      </Typography>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="max-w-2xl space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="input"
              className="block text-sm font-medium text-slate-300"
            >
              {inputLabel}
            </label>
            <div className="relative group">
              <input
                id="input"
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={inputPlaceholder}
                className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-600/50 focus:border-blue-500/50 rounded-lg shadow-sm text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200"
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 group"
        >
          <svg
            className="w-5 h-5 mr-2 transform group-hover:scale-110 transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          {submitButtonText}
        </button>
      </form>
      {result && (
        <div className="mt-6 p-4 bg-gradient-to-br from-slate-700/30 to-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-600/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <svg
                className="w-5 h-5 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <Typography className="text-lg font-medium text-slate-200">
              {result}
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
}
