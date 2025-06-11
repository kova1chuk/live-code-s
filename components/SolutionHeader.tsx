import React from "react";
import Typography from "@/components/ui/Typography";

interface SolutionHeaderProps {
  title: string;
  complexity: {
    time: string;
    space: string;
  };
  className?: string;
}

export default function SolutionHeader({
  title,
  complexity,
  className = "",
}: SolutionHeaderProps) {
  return (
    <div className={`bg-[#1a1f2e] rounded-lg p-6 ${className}`}>
      <Typography className="text-gray-200 text-lg mb-4">{title}</Typography>
      <div className="flex gap-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-[#1e2334] rounded-lg">
          <svg
            className="w-5 h-5 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-gray-300">Time: {complexity.time}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-[#1e2334] rounded-lg">
          <svg
            className="w-5 h-5 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
            />
          </svg>
          <span className="text-gray-300">Space: {complexity.space}</span>
        </div>
      </div>
    </div>
  );
}
