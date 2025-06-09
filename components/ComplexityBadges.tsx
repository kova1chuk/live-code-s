import React from "react";

interface Complexity {
  time: string;
  space: string;
}

interface ComplexityBadgesProps {
  complexity: Complexity;
  className?: string;
}

export default function ComplexityBadges({
  complexity,
  className = "",
}: ComplexityBadgesProps) {
  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      <div className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
          Time: {complexity.time}
        </span>
      </div>
      <div className="px-3 py-1.5 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
        <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
          Space: {complexity.space}
        </span>
      </div>
    </div>
  );
}
