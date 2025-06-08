import React from "react";
import Typography from "@/components/Typography";
import CodeBlock from "@/components/CodeBlock";

interface SolutionContentProps {
  howItWorks: string[];
  advantages: string[];
  disadvantages: string[];
  jsCode: string;
  tsCode: string;
}

export default function SolutionContent({
  howItWorks,
  advantages,
  disadvantages,
  jsCode,
  tsCode,
}: SolutionContentProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <CodeBlock jsCode={jsCode} tsCode={tsCode} />
        <div className="bg-indigo-900/10 dark:bg-indigo-900/30 backdrop-blur-sm rounded-xl p-6 border border-indigo-100/20 dark:border-indigo-800/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-100/20 dark:bg-indigo-800/30 rounded-lg">
              <svg
                className="w-5 h-5 text-indigo-500 dark:text-indigo-400"
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
            <Typography
              variant="h3"
              className="text-lg font-medium text-indigo-900 dark:text-indigo-100"
            >
              How it works:
            </Typography>
          </div>
          <ul className="list-disc pl-6 space-y-2 text-indigo-900 dark:text-indigo-100 marker:text-indigo-500 dark:marker:text-indigo-400">
            {howItWorks.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-emerald-900/10 dark:bg-emerald-900/30 backdrop-blur-sm rounded-xl p-6 border border-emerald-100/20 dark:border-emerald-800/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-100/20 dark:bg-emerald-800/30 rounded-lg">
                <svg
                  className="w-5 h-5 text-emerald-500 dark:text-emerald-400"
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
              <Typography
                variant="h3"
                className="text-lg font-medium text-emerald-900 dark:text-emerald-100"
              >
                Advantages:
              </Typography>
            </div>
            <ul className="list-disc pl-6 space-y-2 text-emerald-900 dark:text-emerald-100 marker:text-emerald-500 dark:marker:text-emerald-400">
              {advantages.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-rose-900/10 dark:bg-rose-900/30 backdrop-blur-sm rounded-xl p-6 border border-rose-100/20 dark:border-rose-800/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-rose-100/20 dark:bg-rose-800/30 rounded-lg">
                <svg
                  className="w-5 h-5 text-rose-500 dark:text-rose-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <Typography
                variant="h3"
                className="text-lg font-medium text-rose-900 dark:text-rose-100"
              >
                Disadvantages:
              </Typography>
            </div>
            <ul className="list-disc pl-6 space-y-2 text-rose-900 dark:text-rose-100 marker:text-rose-500 dark:marker:text-rose-400">
              {disadvantages.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
