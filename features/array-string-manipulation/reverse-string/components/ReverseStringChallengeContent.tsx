"use client";

import React, { useState } from "react";
import ChallengeContent from "@/components/ChallengeContent";
import ReverseStringTestInput from "./ReverseStringTestInput";
import ReverseStringTestRunner from "./ReverseStringTestRunner";
import type { Example, TestCase, Solution } from "@/types/challenge";

interface ReverseStringTestRunnerProps {
  testCases: TestCase[];
  code: string;
  onRunTests: () => void;
}

interface ReverseStringChallengeContentProps {
  title: string;
  description: string;
  examples: Example[];
  testCases: TestCase[];
  solutions: Solution[];
  initialCode: string;
}

export default function ReverseStringChallengeContent({
  title,
  description,
  examples,
  testCases,
  solutions,
  initialCode,
}: ReverseStringChallengeContentProps) {
  const [inputValue, setInputValue] = useState("");

  const handleExampleClick = (example: Example) => {
    setInputValue(example.input);
  };

  return (
    <ChallengeContent<ReverseStringTestRunnerProps>
      title={title}
      description={description}
      examples={examples}
      testCases={testCases}
      solutions={solutions}
      initialCode={initialCode}
      TestRunner={ReverseStringTestRunner}
      customTestComponent={
        <ReverseStringTestInput
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      }
      onExampleClick={handleExampleClick}
    />
  );
}
