"use client";
import FlattenArrayChallengeContent from "@/features/array-string-manipulation/flatten-array/components/FlattenArrayChallengeContent";
import data from "@/features/array-string-manipulation/flatten-array/data.json";

export default function FlattenArrayPage() {
  return (
    <FlattenArrayChallengeContent
      title={data.title}
      description={data.description}
      examples={data.examples}
      testCases={data.testCases}
      solutions={data.solutions}
      initialCode={data.initialCode}
    />
  );
}
