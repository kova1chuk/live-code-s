import React from "react";
import Typography from "@/components/Typography";

interface InfoSectionProps {
  title: string;
  items: string[];
  variant: "info" | "success" | "warning";
  className?: string;
}

export default function InfoSection({
  title,
  items,
  variant,
  className = "",
}: InfoSectionProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "info":
        return {
          container:
            "bg-indigo-900/10 dark:bg-indigo-900/30 border-indigo-100/20 dark:border-indigo-800/30",
          icon: "bg-indigo-100/20 dark:bg-indigo-800/30 text-indigo-500 dark:text-indigo-400",
          text: "text-indigo-900 dark:text-indigo-100",
          marker: "marker:text-indigo-500 dark:marker:text-indigo-400",
        };
      case "success":
        return {
          container:
            "bg-emerald-900/10 dark:bg-emerald-900/30 border-emerald-100/20 dark:border-emerald-800/30",
          icon: "bg-emerald-100/20 dark:bg-emerald-800/30 text-emerald-500 dark:text-emerald-400",
          text: "text-emerald-900 dark:text-emerald-100",
          marker: "marker:text-emerald-500 dark:marker:text-emerald-400",
        };
      case "warning":
        return {
          container:
            "bg-rose-900/10 dark:bg-rose-900/30 border-rose-100/20 dark:border-rose-800/30",
          icon: "bg-rose-100/20 dark:bg-rose-800/30 text-rose-500 dark:text-rose-400",
          text: "text-rose-900 dark:text-rose-100",
          marker: "marker:text-rose-500 dark:marker:text-rose-400",
        };
    }
  };

  const getIcon = () => {
    switch (variant) {
      case "info":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        );
      case "success":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        );
      case "warning":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        );
    }
  };

  const styles = getVariantStyles();

  return (
    <div
      className={`backdrop-blur-sm rounded-xl p-6 border ${styles.container} ${className}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${styles.icon}`}>
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {getIcon()}
          </svg>
        </div>
        <Typography
          variant="h3"
          className={`text-lg font-medium ${styles.text}`}
        >
          {title}
        </Typography>
      </div>
      <ul
        className={`list-disc pl-6 space-y-2 ${styles.text} ${styles.marker}`}
      >
        {items.map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
