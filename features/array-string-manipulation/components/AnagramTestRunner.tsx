import React from "react";
import TestRunner, { BaseTestCase, TestResult } from "@/components/TestRunner";

interface AnagramTestCase extends BaseTestCase {
  input: [string, string];
  expected: boolean;
  description: string;
}

type AnagramFunction = (str1: string, str2: string) => boolean;

interface AnagramTestRunnerProps {
  testCases: AnagramTestCase[];
  code: string;
  onRunTests: () => void;
  className?: string;
}

export default function AnagramTestRunner({
  testCases,
  code,
  onRunTests,
  className,
}: AnagramTestRunnerProps) {
  const runTest = (
    testCase: AnagramTestCase,
    fn: AnagramFunction
  ): TestResult<boolean, boolean> => {
    const actual = fn(testCase.input[0], testCase.input[1]);
    return {
      passed: actual === testCase.expected,
      actual,
      expected: testCase.expected,
      description: testCase.description,
    };
  };

  const formatInput = (testCase: AnagramTestCase): string => {
    return `"${testCase.input[0]}", "${testCase.input[1]}"`;
  };

  return (
    <TestRunner<AnagramTestCase, AnagramFunction>
      testCases={testCases}
      code={code}
      onRunTests={onRunTests}
      className={className}
      functionName="isAnagram"
      runTest={runTest}
      formatInput={formatInput}
    />
  );
}
