import React, { useState } from "react";
import Typography from "@/components/ui/Typography";
import Button from "@/components/ui/Button";

interface TestCase {
  input: string;
  expected: string;
  description?: string;
}

interface TestResult {
  passed: boolean;
  input: string;
  expected: string;
  actual: string;
  description?: string;
}

interface ReverseStringTestRunnerProps {
  testCases: TestCase[];
  code: string;
  onRunTests: () => void;
}

export default function ReverseStringTestRunner({
  testCases,
  code,
  onRunTests,
}: ReverseStringTestRunnerProps) {
  const [results, setResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runTests = () => {
    setIsRunning(true);
    onRunTests();

    try {
      // Create a function from the code string
      const reverseString = new Function(code + "\nreturn reverseString;")();

      const testResults = testCases.map((testCase) => {
        try {
          const actual = reverseString(testCase.input);
          const passed = actual === testCase.expected;

          return {
            passed,
            input: JSON.stringify(testCase.input),
            expected: JSON.stringify(testCase.expected),
            actual: JSON.stringify(actual),
            description: testCase.description,
          };
        } catch (error) {
          return {
            passed: false,
            input: JSON.stringify(testCase.input),
            expected: JSON.stringify(testCase.expected),
            actual: "Error: " + (error as Error).message,
            description: testCase.description,
          };
        }
      });

      setResults(testResults);
    } catch (error) {
      setResults([
        {
          passed: false,
          input: "N/A",
          expected: "N/A",
          actual: "Error: " + (error as Error).message,
          description: "Failed to compile the code",
        },
      ]);
    }

    setIsRunning(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Typography variant="h3" className="text-lg font-semibold">
          Test Cases
        </Typography>
        <Button
          onClick={runTests}
          disabled={isRunning}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isRunning ? "Running..." : "Run Tests"}
        </Button>
      </div>

      {results.length > 0 && (
        <div className="space-y-4">
          {results.map((result, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                result.passed
                  ? "bg-green-100 dark:bg-green-900/20"
                  : "bg-red-100 dark:bg-red-900/20"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {result.passed ? (
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
                ) : (
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
                )}
                <Typography
                  className={`font-medium ${
                    result.passed ? "text-green-700" : "text-red-700"
                  } dark:text-white`}
                >
                  Test Case {index + 1}{" "}
                  {result.description ? `- ${result.description}` : ""}
                </Typography>
              </div>
              <div className="space-y-1 text-sm">
                <div>
                  <span className="font-medium">Input:</span> {result.input}
                </div>
                <div>
                  <span className="font-medium">Expected:</span>{" "}
                  {result.expected}
                </div>
                <div>
                  <span className="font-medium">Actual:</span> {result.actual}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
