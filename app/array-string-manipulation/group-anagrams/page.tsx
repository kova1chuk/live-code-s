"use client";
import { useState } from "react";
import GroupAnagramsChallengeContent from "@/features/array-string-manipulation/group-anagrams/components/GroupAnagramsChallengeContent";
import GroupAnagramsTestRunner from "@/features/array-string-manipulation/group-anagrams/components/GroupAnagramsTestRunner";
import data from "@/features/array-string-manipulation/group-anagrams/data.json";

interface TestCase {
  input: string[];
  expected: string[][];
  description?: string;
}

export default function GroupAnagrams() {
  return (
    <GroupAnagramsChallengeContent
      title={data.title}
      description={data.description}
      examples={data.examples}
      testCases={data.testCases}
      solutions={data.solutions}
      initialCode={data.initialCode}
    />
  );
}
