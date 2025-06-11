import Typography from "@/components/ui/Typography";
import React from "react";

interface CustomTestInputProps {
  form: React.ReactNode;
  result?: string | null;
}

export default function CustomTestInput(props: CustomTestInputProps) {
  return (
    <div className="mt-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-xl border border-slate-700/50 shadow-lg p-6">
      <Typography
        variant="h3"
        className="text-xl font-medium text-slate-100 mb-6"
      >
        Test with your own input:
      </Typography>
      {props.form}
      {props.result !== null && props.result !== undefined && (
        <div
          className={`mt-6 p-4 rounded-xl border flex items-center gap-3 ${
            props.result.toLowerCase().includes("not")
              ? "bg-red-100 text-red-700 border-red-300 dark:bg-red-900/20"
              : "bg-green-100 text-green-700 border-green-300 dark:bg-green-900/20"
          }`}
        >
          {props.result.toLowerCase().includes("not") ? (
            <svg
              className="w-5 h-5 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
          <Typography className="text-lg font-medium">
            Result: {props.result}
          </Typography>
        </div>
      )}
    </div>
  );
}
