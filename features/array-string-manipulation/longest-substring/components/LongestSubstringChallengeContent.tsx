import React, { useState } from "react";
import ChallengeContent from "@/components/ChallengeContent";
import LongestSubstringTestInput from "./LongestSubstringTestInput";
import LongestSubstringTestRunner from "./LongestSubstringTestRunner";

interface Example {
  input: string;
  output: string;
}

interface LongestSubstringTestCase {
  input: string;
  expected: {
    length: number;
    substring: string;
  };
  description?: string;
}

interface Solution {
  id: string;
  label: string;
  description: string;
  complexity: {
    time: string;
    space: string;
  };
  howItWorks: string[];
  advantages: string[];
  disadvantages: string[];
  jsCode: string;
  tsCode: string;
}

interface LongestSubstringChallengeContentProps {
  title: string;
  description: string;
  examples: Example[];
  testCases: LongestSubstringTestCase[];
  solutions: Solution[];
  initialCode: string;
}

export default function LongestSubstringChallengeContent({
  title,
  description,
  examples,
  testCases,
  solutions,
  initialCode,
}: LongestSubstringChallengeContentProps) {
  const [inputValue, setInputValue] = useState("");

  const handleExampleClick = (example: Example) => {
    setInputValue(example.input);
  };

  return (
    <ChallengeContent<{
      testCases: LongestSubstringTestCase[];
      code: string;
      onRunTests: () => void;
    }>
      title={title}
      description={description}
      examples={examples}
      testCases={testCases}
      solutions={solutions}
      initialCode={initialCode}
      TestRunner={LongestSubstringTestRunner}
      customTestComponent={
        <LongestSubstringTestInput
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      }
      onExampleClick={handleExampleClick}
    />
  );
}
