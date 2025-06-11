"use client";

import React from "react";
import Challenge from "@/components/Challenge";
import type { Example, Solution, TestCase } from "@/types/challenge";

interface BaseTestRunnerProps {
  testCases: TestCase[];
  code: string;
  onRunTests: () => void;
}

interface ChallengeContentProps<
  TestRunnerProps extends BaseTestRunnerProps = BaseTestRunnerProps
> {
  title: string;
  description: string;
  examples: Example[];
  testCases: TestCase[];
  solutions: Solution[];
  initialCode: string;
  TestRunner?: React.ComponentType<TestRunnerProps>;
  customTestComponent?: React.ReactNode;
  onCodeChange?: (code: string) => void;
  onExampleClick?: (example: Example) => void;
}

export default function ChallengeContent<
  TestRunnerProps extends BaseTestRunnerProps = BaseTestRunnerProps
>({
  title,
  description,
  examples,
  testCases,
  solutions,
  initialCode,
  TestRunner,
  customTestComponent,
  onCodeChange,
  onExampleClick,
}: ChallengeContentProps<TestRunnerProps>) {
  return (
    <Challenge<TestRunnerProps>
      title={title}
      description={description}
      examples={examples}
      testCases={testCases}
      solutions={solutions}
      initialCode={initialCode}
      TestRunner={TestRunner}
      customTestComponent={customTestComponent}
      onCodeChange={onCodeChange}
      onExampleClick={onExampleClick}
    />
  );
}
