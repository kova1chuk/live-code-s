"use client";
import { useState } from "react";
import LongestSubstringChallengeContent from "@/features/array-string-manipulation/longest-substring/components/LongestSubstringChallengeContent";
import LongestSubstringTestRunner from "@/features/array-string-manipulation/longest-substring/components/LongestSubstringTestRunner";
import data from "@/features/array-string-manipulation/longest-substring/data.json";

export default function LongestSubstring() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{
    length: number;
    substring: string;
  } | null>(null);
  const [code, setCode] = useState<string>(data.initialCode);

  const findLongestSubstring = (str: string) => {
    let maxLength = 0;
    let start = 0;
    let maxStart = 0;
    const charMap = new Map<string, number>();

    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (charMap.has(char) && charMap.get(char)! >= start) {
        start = charMap.get(char)! + 1;
      }
      charMap.set(char, i);

      const currentLength = i - start + 1;
      if (currentLength > maxLength) {
        maxLength = currentLength;
        maxStart = start;
      }
    }

    return {
      length: maxLength,
      substring: str.slice(maxStart, maxStart + maxLength),
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(findLongestSubstring(input));
  };

  const handleExampleClick = (example: { input: string; output: string }) => {
    setInput(example.input);
    setResult(findLongestSubstring(example.input));
  };

  return (
    <LongestSubstringChallengeContent
      title="Longest Substring Without Repeating Characters"
      description="Given a string, write a function that finds the length of the longest substring without repeating characters. The function should return both the length of the substring and the substring itself. A substring is a contiguous sequence of characters within the string."
      examples={data.examples}
      testCases={data.testCases}
      solutions={data.solutions}
      initialCode={code}
      onCodeChange={setCode}
      TestRunner={LongestSubstringTestRunner}
      inputValue={input}
      onInputChange={setInput}
      onInputSubmit={handleSubmit}
      result={result}
      onExampleClick={handleExampleClick}
    />
  );
}
