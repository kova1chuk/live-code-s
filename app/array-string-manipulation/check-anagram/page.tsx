"use client";
import { useState } from "react";
import AnagramChallengeContent from "@/features/array-string-manipulation/components/AnagramChallengeContent";
import AnagramTestRunner from "@/features/array-string-manipulation/components/AnagramTestRunner";
import data from "@/features/array-string-manipulation/check-anagram/data.json";

interface TestCase {
  input: [string, string];
  expected: boolean;
  description: string;
}

export default function CheckAnagram() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [result, setResult] = useState<string>("");
  const [code, setCode] = useState<string>(data.initialCode);

  const testCases = data.testCases.map((test) => ({
    ...test,
    input: test.input as [string, string],
  })) as TestCase[];

  const isAnagram = (str1: string, str2: string) => {
    const normalize = (str: string) =>
      str
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
        .split("")
        .sort()
        .join("");
    return normalize(str1) === normalize(str2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(isAnagram(input1, input2).toString());
  };

  const handleExampleClick = (example: { input: string; output: string }) => {
    const [str1, str2] = example.input.split(",").map((s) => s.trim());
    setInput1(str1);
    setInput2(str2);
    setResult(example.output);
  };

  return (
    <AnagramChallengeContent
      title="Check for Anagram"
      description="Write a function that determines if two strings are anagrams of each other. An anagram is a word or phrase formed by rearranging the letters of another. The function should be case-insensitive and ignore spaces and punctuation."
      examples={data.examples}
      testCases={testCases}
      solutions={data.solutions}
      initialCode={code}
      onCodeChange={setCode}
      TestRunner={AnagramTestRunner}
      input1Value={input1}
      input2Value={input2}
      onInput1Change={setInput1}
      onInput2Change={setInput2}
      onInputSubmit={handleSubmit}
      result={result}
      onExampleClick={handleExampleClick}
    />
  );
}
