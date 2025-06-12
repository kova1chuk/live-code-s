import React, { useState } from "react";
import ChallengeContent from "@/components/ChallengeContent";
import GroupAnagramsTestInput from "./GroupAnagramsTestInput";
import GroupAnagramsTestRunner from "./GroupAnagramsTestRunner";

interface Example {
  input: string;
  output: string;
}

interface GroupAnagramsTestCase {
  input: string[];
  expected: string[][];
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

interface GroupAnagramsChallengeContentProps {
  title: string;
  description: string;
  examples: Example[];
  testCases: GroupAnagramsTestCase[];
  solutions: Solution[];
  initialCode: string;
}

export default function GroupAnagramsChallengeContent({
  title,
  description,
  examples,
  testCases,
  solutions,
  initialCode,
}: GroupAnagramsChallengeContentProps) {
  const [inputValue, setInputValue] = useState("");

  const handleExampleClick = (example: Example) => {
    setInputValue(example.input);
  };

  return (
    <ChallengeContent<{
      testCases: GroupAnagramsTestCase[];
      code: string;
      onRunTests: () => void;
    }>
      title={title}
      description={description}
      examples={examples}
      testCases={testCases}
      solutions={solutions}
      initialCode={initialCode}
      TestRunner={GroupAnagramsTestRunner}
      customTestComponent={
        <GroupAnagramsTestInput
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      }
      onExampleClick={handleExampleClick}
    />
  );
}
