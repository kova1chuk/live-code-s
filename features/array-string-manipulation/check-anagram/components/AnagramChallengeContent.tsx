import React from "react";
import ChallengeContent from "@/components/ChallengeContent";
import CheckAnagramTestInput from "./CheckAnagramTestInput";
import type { Example, TestCase, Solution } from "@/types/challenge";

interface AnagramChallengeContentProps {
  title: string;
  description: string;
  examples: Example[];
  testCases: TestCase[];
  solutions: Solution[];
  initialCode: string;
}

export default function AnagramChallengeContent({
  title,
  description,
  examples,
  testCases,
  solutions,
  initialCode,
}: AnagramChallengeContentProps) {
  return (
    <ChallengeContent
      title={title}
      description={description}
      examples={examples}
      testCases={testCases}
      solutions={solutions}
      initialCode={initialCode}
      TestRunner={() => null}
      customTestComponent={<CheckAnagramTestInput />}
      onCodeChange={() => {}}
      inputValue={""}
      onInputChange={() => {}}
      onInputSubmit={() => {}}
      result={null}
      onExampleClick={() => {}}
    />
  );
}
