import React, { useState } from "react";
import ChallengeContent from "@/components/ChallengeContent";
import CheckAnagramTestInput from "./CheckAnagramTestInput";

interface Example {
  input: string;
  output: string;
}

interface TestCase {
  input: [string, string];
  expected: boolean;
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

interface CheckAnagramChallengeContentProps {
  title: string;
  description: string;
  examples: Example[];
  testCases: TestCase[];
  solutions: Solution[];
  initialCode: string;
}

export default function CheckAnagramChallengeContent(
  props: CheckAnagramChallengeContentProps
) {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<string | null>(null);

  // Placeholder TestRunner component
  const TestRunner = () => null;

  // Map testCases to the format expected by ChallengeContent
  const mappedTestCases = props.testCases.map((tc) => ({
    input: Array.isArray(tc.input) ? tc.input.join(", ") : tc.input,
    expected: String(tc.expected),
    description: tc.description,
  }));

  return (
    <ChallengeContent
      {...props}
      testCases={mappedTestCases}
      onCodeChange={() => {}}
      TestRunner={TestRunner}
      inputValue={inputValue}
      onInputChange={setInputValue}
      onInputSubmit={() => {}}
      result={result}
      onExampleClick={() => {}}
      customTestComponent={<CheckAnagramTestInput setResult={setResult} />}
    />
  );
}
