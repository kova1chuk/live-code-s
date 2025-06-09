"use client";
import { useState } from "react";
import MoveZeroesChallengeContent from "@/features/array-string-manipulation/components/MoveZeroesChallengeContent";
import MoveZeroesTestRunner from "@/features/array-string-manipulation/components/MoveZeroesTestRunner";
import data from "@/features/array-string-manipulation/move-zeroes/data.json";

export default function MoveZeroes() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number[] | null>(null);
  const [code, setCode] = useState<string>(data.initialCode);

  const moveZeroes = (nums: number[]) => {
    let nonZeroIndex = 0;

    // Move all non-zero elements to front
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] !== 0) {
        // Swap elements
        [nums[nonZeroIndex], nums[i]] = [nums[i], nums[nonZeroIndex]];
        nonZeroIndex++;
      }
    }

    return nums;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const nums = input.split(",").map((num) => parseInt(num.trim(), 10));
      if (nums.some(isNaN)) {
        throw new Error("Invalid input: please enter comma-separated numbers");
      }
      setResult(moveZeroes([...nums])); // Create a copy to avoid modifying original
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleExampleClick = (example: { input: string; output: string }) => {
    setInput(example.input);
    const nums = example.input
      .split(",")
      .map((num) => parseInt(num.trim(), 10));
    setResult(moveZeroes([...nums]));
  };

  return (
    <MoveZeroesChallengeContent
      title="Move Zeroes"
      description="Given an array nums, write a function that moves all zeroes to the end of the array while maintaining the relative order of the non-zero elements. The function should modify the array in-place without making a copy of the array."
      examples={data.examples}
      testCases={data.testCases}
      solutions={data.solutions}
      initialCode={code}
      onCodeChange={setCode}
      TestRunner={MoveZeroesTestRunner}
      inputValue={input}
      onInputChange={setInput}
      onInputSubmit={handleSubmit}
      result={result}
      onExampleClick={handleExampleClick}
    />
  );
}
