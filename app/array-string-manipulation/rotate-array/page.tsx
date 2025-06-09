"use client";
import { useState } from "react";
import RotateArrayChallengeContent from "@/features/array-string-manipulation/components/RotateArrayChallengeContent";
import RotateArrayTestRunner from "@/features/array-string-manipulation/components/RotateArrayTestRunner";
import data from "@/features/array-string-manipulation/rotate-array/data.json";

export default function RotateArray() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number[] | null>(null);
  const [code, setCode] = useState<string>(data.initialCode);

  const rotate = (nums: number[], k: number): number[] => {
    k = k % nums.length; // Normalize k

    // Helper function to reverse array portion
    function reverse(arr: number[], start: number, end: number): void {
      while (start < end) {
        [arr[start], arr[end]] = [arr[end], arr[start]];
        start++;
        end--;
      }
    }

    // Reverse entire array
    reverse(nums, 0, nums.length - 1);
    // Reverse first k elements
    reverse(nums, 0, k - 1);
    // Reverse remaining elements
    reverse(nums, k, nums.length - 1);

    return nums;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Parse input string to get array and k
      const match = input.match(/\[(.*?)\],\s*(\d+)/);
      if (!match) {
        throw new Error("Invalid input format. Please use format: [1,2,3], 2");
      }

      const nums = JSON.parse(`[${match[1]}]`);
      const k = parseInt(match[2], 10);

      if (!Array.isArray(nums)) {
        throw new Error("Invalid array format");
      }

      if (isNaN(k) || k < 0) {
        throw new Error("k must be a non-negative number");
      }

      const result = rotate([...nums], k);
      setResult(result);
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleExampleClick = (example: { input: string; output: string }) => {
    setInput(example.input.replace("nums = ", ""));
    // Extract nums and k from the example input
    const match = example.input.match(/\[(.*?)\],\s*k\s*=\s*(\d+)/);
    if (match) {
      const nums = JSON.parse(`[${match[1]}]`);
      const k = parseInt(match[2], 10);
      setResult(rotate([...nums], k));
    }
  };

  return (
    <RotateArrayChallengeContent
      title="Rotate Array"
      description="Given an integer array nums, rotate the array to the right by k steps, where k is non-negative. Try to come up with as many solutions as possible. There are at least three different ways to solve this problem. Could you do it in-place with O(1) extra space?"
      examples={data.examples}
      testCases={data.testCases}
      solutions={data.solutions}
      initialCode={code}
      onCodeChange={setCode}
      TestRunner={RotateArrayTestRunner}
      inputValue={input}
      onInputChange={setInput}
      onInputSubmit={handleSubmit}
      result={result}
      onExampleClick={handleExampleClick}
    />
  );
}
