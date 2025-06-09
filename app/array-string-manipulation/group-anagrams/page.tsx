"use client";
import { useState } from "react";
import GroupAnagramsChallengeContent from "@/features/array-string-manipulation/components/GroupAnagramsChallengeContent";
import GroupAnagramsTestRunner from "@/features/array-string-manipulation/components/GroupAnagramsTestRunner";
import data from "@/features/array-string-manipulation/group-anagrams/data.json";

interface TestCase {
  input: string[];
  expected: string[][];
  description?: string;
}

export default function GroupAnagrams() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string[][]>([]);
  const [code, setCode] = useState<string>(data.initialCode);

  const testCases = data.testCases.map((test) => ({
    ...test,
    input: test.input as string[],
    expected: test.expected as string[][],
  })) as TestCase[];

  const groupAnagrams = (strs: string[]): string[][] => {
    const groups = new Map<string, string[]>();
    for (const str of strs) {
      const sorted = str.split("").sort().join("");
      if (!groups.has(sorted)) {
        groups.set(sorted, []);
      }
      groups.get(sorted)!.push(str);
    }
    return Array.from(groups.values());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const words = input.split(",").map((word) => word.trim());
      setResult(groupAnagrams(words));
    } catch {
      setResult([]);
    }
  };

  const handleExampleClick = (example: { input: string; output: string }) => {
    setInput(example.input);
    setResult(JSON.parse(example.output));
  };

  return (
    <GroupAnagramsChallengeContent
      title="Group Anagrams"
      description="Write a function that groups anagrams together. Given an array of strings, group the strings that are anagrams of each other. The order of the groups and the order of strings within each group does not matter."
      examples={data.examples}
      testCases={testCases}
      solutions={data.solutions}
      initialCode={code}
      onCodeChange={setCode}
      TestRunner={GroupAnagramsTestRunner}
      inputValue={input}
      onInputChange={setInput}
      onInputSubmit={handleSubmit}
      result={result}
      onExampleClick={handleExampleClick}
    />
  );
}
