"use client";
import LongestSubstringChallengeContent from "@/features/array-string-manipulation/longest-substring/components/LongestSubstringChallengeContent";
import data from "@/features/array-string-manipulation/longest-substring/data.json";

export default function LongestSubstring() {
  return (
    <LongestSubstringChallengeContent
      title={data.title}
      description={data.description}
      examples={data.examples}
      testCases={data.testCases}
      solutions={data.solutions}
      initialCode={data.initialCode}
    />
  );
}
