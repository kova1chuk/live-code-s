"use client";
import { useState } from "react";
import ReverseStringChallengeContent from "@/features/array-string-manipulation/components/ReverseStringChallengeContent";
import ReverseStringTestRunner from "@/features/array-string-manipulation/components/ReverseStringTestRunner";
import data from "@/features/array-string-manipulation/reverse-string/data.json";

export default function ReverseString() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [code, setCode] = useState<string>(data.initialCode);

  const reverseString = (s: string) => {
    const chars = s.split("");
    let left = 0;
    let right = chars.length - 1;

    while (left < right) {
      // Swap characters
      [chars[left], chars[right]] = [chars[right], chars[left]];
      left++;
      right--;
    }

    return chars.join("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!input.trim()) {
        throw new Error("Please enter a string to reverse");
      }
      setResult(reverseString(input));
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleExampleClick = (example: { input: string; output: string }) => {
    setInput(example.input);
    setResult(reverseString(example.input));
  };

  return (
    <ReverseStringChallengeContent
      title="Reverse String"
      description="Write a function that reverses a string. The input string is given as an array of characters. Do the reversal in-place, that is, modify the input array directly. Do not allocate extra space for another array."
      examples={data.examples}
      testCases={data.testCases}
      solutions={data.solutions}
      initialCode={code}
      onCodeChange={setCode}
      TestRunner={ReverseStringTestRunner}
      inputValue={input}
      onInputChange={setInput}
      onInputSubmit={handleSubmit}
      result={result}
      onExampleClick={handleExampleClick}
    />
  );
}
