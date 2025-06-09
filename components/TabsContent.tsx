"use client";

import { useState } from "react";
import Typography from "@/components/Typography";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  complexity?: {
    time: string;
    space: string;
  };
  description?: string;
}

interface TabsContentProps {
  tabs: Tab[];
  className?: string;
}

export default function TabsContent({
  tabs,
  className = "",
}: TabsContentProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all duration-200 
              ${
                activeTab === tab.id
                  ? "bg-blue-500 text-white"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`space-y-4 ${activeTab === tab.id ? "block" : "hidden"}`}
        >
          {(tab.complexity || tab.description) && (
            <div className="bg-gradient-to-br from-slate-800 to-slate-900/90 backdrop-blur-xl p-6 rounded-xl border border-slate-700/50 shadow-lg">
              {tab.description && tab.complexity && (
                <Typography className="text-base text-slate-300 mb-4">
                  {tab.description}
                </Typography>
              )}
              {tab.complexity && (
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
                      Time:{" "}
                      <span className="text-slate-200">
                        {tab.complexity.time}
                      </span>
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
                      Space:{" "}
                      <span className="text-slate-200">
                        {tab.complexity.space}
                      </span>
                    </Typography>
                  </div>
                </div>
              )}
            </div>
          )}
          {tab.content}
        </div>
      ))}
    </div>
  );
}
