import React from "react";
import ChallengeContent from "@/components/ChallengeContent";
import ReverseStringTestInput from "./ReverseStringTestInput";

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

interface ReverseStringChallengeContentProps {
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
}

export default function ReverseStringChallengeContent(
  props: ReverseStringChallengeContentProps
) {
  return (
    <ChallengeContent
      {...props}
      customTestComponent={
        <ReverseStringTestInput
          inputValue={props.inputValue}
          onInputChange={props.onInputChange}
          onInputSubmit={props.onInputSubmit}
          result={props.result}
          inputLabel={props.inputLabel}
          inputPlaceholder={props.inputPlaceholder}
          submitButtonText={props.submitButtonText}
        />
      }
    />
  );
}
