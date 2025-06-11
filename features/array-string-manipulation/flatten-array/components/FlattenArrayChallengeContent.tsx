import React, { useState } from "react";
import ChallengeContent from "@/components/ChallengeContent";
import FlattenArrayTestInput from "./FlattenArrayTestInput";
import FlattenArrayTestRunner from "./FlattenArrayTestRunner";
import type { Example, Solution, TestCase } from "@/types/challenge";

interface FlattenArrayChallengeContentProps {
  title: string;
  description: string;
  examples: Example[];
  testCases: TestCase[];
  solutions: Solution[];
  initialCode: string;
}

export default function FlattenArrayChallengeContent({
  title,
  description,
  examples,
  testCases,
  solutions,
  initialCode,
}: FlattenArrayChallengeContentProps) {
  const [inputValue, setInputValue] = useState("");

  const handleExampleClick = (example: Example) => {
    setInputValue(example.input);
  };

  return (
    <ChallengeContent<{
      testCases: TestCase[];
      code: string;
      onRunTests: () => void;
    }>
      title={title}
      description={description}
      examples={examples}
      testCases={testCases}
      solutions={solutions}
      initialCode={initialCode}
      TestRunner={FlattenArrayTestRunner}
      customTestComponent={
        <FlattenArrayTestInput
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      }
      onExampleClick={handleExampleClick}
    />
  );
}
