import React from "react";
import TestRunner, { BaseTestCase, TestResult } from "@/components/TestRunner";

interface StringTestCase extends BaseTestCase {
  input: string;
  expected: string;
  description?: string;
}

type StringFunction = (input: string) => string;

interface StringTestRunnerProps {
  testCases: StringTestCase[];
  code: string;
  onRunTests: () => void;
  className?: string;
  functionName?: string;
}

export default function StringTestRunner({
  testCases,
  code,
  onRunTests,
  className,
  functionName = "reverseString",
}: StringTestRunnerProps) {
  const runTest = (
    testCase: StringTestCase,
    fn: StringFunction
  ): TestResult<string, string> => {
    const actual = fn(testCase.input);
    return {
      passed: actual === testCase.expected,
      actual,
      expected: testCase.expected,
      description: testCase.description,
    };
  };

  const formatInput = (testCase: StringTestCase): string => {
    return `"${testCase.input}"`;
  };

  return (
    <TestRunner<StringTestCase, StringFunction>
      testCases={testCases}
      code={code}
      onRunTests={onRunTests}
      className={className}
      functionName={functionName}
      runTest={runTest}
      formatInput={formatInput}
    />
  );
}
