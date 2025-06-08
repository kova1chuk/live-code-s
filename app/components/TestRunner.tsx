"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Typography from "@/components/Typography";

interface TestCase {
  input: [string, string];
  expected: boolean;
  description?: string;
}

interface TestRunnerProps {
  testCases: TestCase[];
  code: string;
  onRunTests: () => void;
  className?: string;
}

interface TestResult {
  passed: boolean;
  error?: string;
  actual?: boolean;
  expected: boolean;
  input: [string, string];
  description?: string;
}

export default function TestRunner({
  testCases,
  code,
  onRunTests,
  className = "",
}: TestRunnerProps) {
  const [results, setResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runTests = async () => {
    setIsRunning(true);
    onRunTests();

    try {
      // Create a function from the code string
      const fn = new Function(`
        ${code}
        return isAnagram;
      `)();

      const newResults = testCases.map((testCase) => {
        try {
          const actual = fn(...testCase.input);
          return {
            passed: actual === testCase.expected,
            actual,
            expected: testCase.expected,
            input: testCase.input,
            description: testCase.description,
          };
        } catch (error) {
          return {
            passed: false,
            error: error instanceof Error ? error.message : "Unknown error",
            expected: testCase.expected,
            input: testCase.input,
            description: testCase.description,
          };
        }
      });

      setResults(newResults);
    } catch (error) {
      setResults(
        testCases.map((testCase) => ({
          passed: false,
          error: error instanceof Error ? error.message : "Unknown error",
          expected: testCase.expected,
          input: testCase.input,
          description: testCase.description,
        }))
      );
    }

    setIsRunning(false);
  };

  const passedCount = results.filter((r) => r.passed).length;
  const totalCount = results.length;

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <Button
          onClick={runTests}
          className="w-full sm:w-auto"
          disabled={isRunning}
        >
          {isRunning ? "Running Tests..." : "Run Tests"}
        </Button>
        {results.length > 0 && (
          <Typography className="text-sm">
            Passed: {passedCount}/{totalCount}
          </Typography>
        )}
      </div>

      {results.length > 0 && (
        <div className="space-y-2">
          {results.map((result, index) => (
            <div
              key={index}
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
                    Input: isAnagram(&quot;{result.input[0]}&quot;, &quot;
                    {result.input[1]}&quot;)
                  </Typography>
                  <Typography className="text-sm text-gray-600 dark:text-gray-400">
                    Expected: {result.expected.toString()}
                  </Typography>
                  {!result.error && (
                    <Typography className="text-sm text-gray-600 dark:text-gray-400">
                      Actual: {result.actual?.toString()}
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
          ))}
        </div>
      )}
    </div>
  );
}
