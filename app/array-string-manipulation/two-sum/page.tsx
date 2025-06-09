"use client";
import { useState } from "react";
import TwoSumChallengeContent from "@/features/array-string-manipulation/two-sum/components/TwoSumChallengeContent";
import TwoSumTestRunner from "@/features/array-string-manipulation/two-sum/components/TwoSumTestRunner";
import data from "@/features/array-string-manipulation/two-sum/data.json";

export default function TwoSum() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number[] | null>(null);
  const [code, setCode] = useState<string>(data.initialCode);

  const twoSum = (nums: number[], target: number): number[] => {
    const map = new Map<number, number>();

    for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i];

      if (map.has(complement)) {
        return [map.get(complement)!, i];
      }

      map.set(nums[i], i);
    }

    return [];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Parse input string to get array and target
      const match = input.match(/\[(.*?)\],\s*(\d+)/);
      if (!match) {
        throw new Error("Invalid input format. Please use format: [1,2,3], 9");
      }

      const nums = JSON.parse(`[${match[1]}]`);
      const target = parseInt(match[2], 10);

      if (!Array.isArray(nums)) {
        throw new Error("Invalid array format");
      }

      if (isNaN(target)) {
        throw new Error("Target must be a number");
      }

      const result = twoSum([...nums], target);
      setResult(result);
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleExampleClick = (example: { input: string; output: string }) => {
    setInput(example.input.replace("nums = ", ""));
    // Extract nums and target from the example input
    const match = example.input.match(/\[(.*?)\],\s*target\s*=\s*(\d+)/);
    if (match) {
      const nums = JSON.parse(`[${match[1]}]`);
      const target = parseInt(match[2], 10);
      setResult(twoSum([...nums], target));
    }
  };

  return (
    <TwoSumChallengeContent
      description={data.description}
      examples={data.examples}
      testCases={data.testCases}
      solutions={data.solutions}
      initialCode={code}
      onCodeChange={setCode}
      TestRunner={TwoSumTestRunner}
      inputValue={input}
      onInputChange={setInput}
      onInputSubmit={handleSubmit}
      result={result}
      onExampleClick={handleExampleClick}
    />
  );
}
