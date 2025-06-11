"use client";

import React, { useState } from "react";
import ChallengeContent from "@/components/ChallengeContent";
import CheckAnagramTestInput from "./CheckAnagramTestInput";
import CheckAnagramTestRunner from "./CheckAnagramTestRunner";
import type { Example, TestCase, Solution } from "@/types/challenge";

interface CheckAnagramTestRunnerProps {
  testCases: TestCase[];
  code: string;
  onRunTests: () => void;
}

interface CheckAnagramChallengeContentProps {
  title: string;
  description: string;
  examples: Example[];
  testCases: TestCase[];
  solutions: Solution[];
  initialCode: string;
}

export default function CheckAnagramChallengeContent({
  title,
  description,
  examples,
  testCases,
  solutions,
  initialCode,
}: CheckAnagramChallengeContentProps) {
  const [inputValue, setInputValue] = useState("");

  const handleExampleClick = (example: Example) => {
    setInputValue(example.input);
  };

  return (
    <ChallengeContent<CheckAnagramTestRunnerProps>
      title={title}
      description={description}
      examples={examples}
      testCases={testCases}
      solutions={solutions}
      initialCode={initialCode}
      TestRunner={CheckAnagramTestRunner}
      customTestComponent={
        <CheckAnagramTestInput
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      }
      onExampleClick={handleExampleClick}
    />
  );
}
