"use client";
import { useState } from "react";
import MissingNumberChallengeContent from "@/features/array-string-manipulation/components/MissingNumberChallengeContent";
import MissingNumberTestRunner from "@/features/array-string-manipulation/components/MissingNumberTestRunner";
import data from "@/features/array-string-manipulation/missing-number/data.json";

export default function MissingNumber() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [code, setCode] = useState<string>(data.initialCode);

  const findMissingNumber = (nums: number[]) => {
    const n = nums.length;
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = nums.reduce((sum, num) => sum + num, 0);
    return expectedSum - actualSum;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const nums = input.split(",").map((num) => parseInt(num.trim(), 10));
      if (nums.some(isNaN)) {
        throw new Error("Invalid input: please enter comma-separated numbers");
      }
      setResult(findMissingNumber(nums));
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleExampleClick = (example: { input: string; output: string }) => {
    setInput(example.input);
    const nums = example.input
      .split(",")
      .map((num) => parseInt(num.trim(), 10));
    setResult(findMissingNumber(nums));
  };

  return (
    <MissingNumberChallengeContent
      title="Find Missing Number in Range"
      description="Given an array nums containing n distinct numbers in the range [0, n], write a function that finds the missing number in the range. The function should return the missing number. The array may be in any order."
      examples={data.examples}
      testCases={data.testCases}
      solutions={data.solutions}
      initialCode={code}
      onCodeChange={setCode}
      TestRunner={MissingNumberTestRunner}
      inputValue={input}
      onInputChange={setInput}
      onInputSubmit={handleSubmit}
      result={result}
      onExampleClick={handleExampleClick}
    />
  );
}
