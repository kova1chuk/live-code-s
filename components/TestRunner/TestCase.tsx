import React from "react";
import Typography from "@/components/Typography";
import { BaseTestCase, TestResult } from "./types";

interface TestCaseProps<T extends BaseTestCase> {
  result: TestResult;
  testCase: T;
  index: number;
  functionName: string;
  formatInput: (testCase: T) => string;
}

export default function TestCase<T extends BaseTestCase>({
  result,
  testCase,
  index,
  functionName,
  formatInput,
}: TestCaseProps<T>) {
  return (
    <div
      className={`p-4 rounded-lg ${
        result.passed
          ? "bg-green-50 dark:bg-green-900/20"
          : "bg-red-50 dark:bg-red-900/20"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <Typography className="font-medium">
            Test Case {index + 1}
            {result.description && `: ${result.description}`}
          </Typography>
          <Typography className="text-sm text-gray-600 dark:text-gray-400">
            Input: {functionName}({formatInput(testCase)})
          </Typography>
          <Typography className="text-sm text-gray-600 dark:text-gray-400">
            Expected: {JSON.stringify(result.expected)}
          </Typography>
          {!result.error && (
            <Typography className="text-sm text-gray-600 dark:text-gray-400">
              Actual: {JSON.stringify(result.actual)}
            </Typography>
          )}
          {result.error && (
            <Typography className="text-sm text-red-600 dark:text-red-400">
              Error: {result.error}
            </Typography>
          )}
        </div>
        <div
          className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
            result.passed
              ? "bg-green-100 dark:bg-green-900/40"
              : "bg-red-100 dark:bg-red-900/40"
          }`}
        >
          {result.passed ? (
            <svg
              className="h-4 w-4 text-green-600 dark:text-green-400"
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
          ) : (
            <svg
              className="h-4 w-4 text-red-600 dark:text-red-400"
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
          )}
        </div>
      </div>
    </div>
  );
}
