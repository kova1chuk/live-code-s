import React from "react";
import Challenge from "@/components/Challenge";

interface Example {
  input: string;
  output: string;
}

interface TestCase {
  input: string;
  expected: string;
  description?: string;
}

interface Solution {
  id: string;
  label: string;
  description: string;
  complexity: { time: string; space: string };
  howItWorks: string[];
  advantages: string[];
  disadvantages: string[];
  jsCode: string;
  tsCode: string;
}

interface ChallengeContentProps {
  title: string;
  description: string;
  examples: Example[];
  testCases: TestCase[];
  solutions: Solution[];
  initialCode: string;
  onCodeChange: (code: string) => void;
  TestRunner: React.ComponentType<{
    testCases: TestCase[];
    code: string;
    onRunTests: () => void;
  }>;
  inputValue: string;
  onInputChange: (value: string) => void;
  onInputSubmit: (e: React.FormEvent) => void;
  result: string | null;
  onExampleClick: (example: Example) => void;
  inputLabel?: string;
  inputPlaceholder?: string;
  submitButtonText?: string;
  customTestComponent?: React.ReactNode;
}

export default function ChallengeContent(props: ChallengeContentProps) {
  const { TestRunner, ...rest } = props;
  return (
    <Challenge
      {...rest}
      TestRunner={TestRunner as React.ComponentType<Record<string, unknown>>}
    />
  );
}
