"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Typography from "@/components/Typography";
import TestCase from "./TestCase";
import { BaseTestCase, TestResult, TestRunnerProps } from "./types";

export default function TestRunner<
  T extends BaseTestCase,
  TFn extends (...args: never[]) => unknown
>({
  testCases,
  code,
  onRunTests,
  className = "",
  functionName = "solution",
  runTest,
  formatInput,
}: TestRunnerProps<T, TFn>) {
  const [results, setResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runTests = async () => {
    setIsRunning(true);
    onRunTests();

    try {
      // Create a function from the code string
      const fn = new Function(`
        ${code}
        return ${functionName};
      `)() as TFn;

      const newResults = testCases.map((testCase) => {
        try {
          return runTest(testCase, fn);
        } catch (error) {
          const result = runTest(testCase, fn);
          return {
            passed: false,
            error: error instanceof Error ? error.message : "Unknown error",
            expected: result.expected,
            description: testCase.description,
          };
        }
      });

      setResults(newResults);
    } catch (error) {
      const defaultResults = testCases.map((testCase) => {
        const result = runTest(testCase, (() => undefined) as TFn);
        return {
          passed: false,
          error: error instanceof Error ? error.message : "Unknown error",
          expected: result.expected,
          description: testCase.description,
        };
      });
      setResults(defaultResults);
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
            <TestCase
              key={index}
              result={result}
              testCase={testCases[index]}
              index={index}
              functionName={functionName}
              formatInput={formatInput}
            />
          ))}
        </div>
      )}
    </div>
  );
}
