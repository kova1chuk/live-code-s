"use client";
import { useState } from "react";
import RemoveDuplicatesChallengeContent from "@/features/array-string-manipulation/remove-duplicates/components/RemoveDuplicatesChallengeContent";
import RemoveDuplicatesTestRunner from "@/features/array-string-manipulation/remove-duplicates/components/RemoveDuplicatesTestRunner";
import data from "@/features/array-string-manipulation/remove-duplicates/data.json";

export default function RemoveDuplicates() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{
    array: number[];
    length: number;
  } | null>(null);
  const [code, setCode] = useState<string>(data.initialCode);

  const removeDuplicates = (nums: number[]) => {
    if (nums.length === 0) return 0;

    let uniqueIndex = 1;

    for (let i = 1; i < nums.length; i++) {
      if (nums[i] !== nums[i - 1]) {
        nums[uniqueIndex] = nums[i];
        uniqueIndex++;
      }
    }

    return uniqueIndex;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const nums = input.split(",").map((num) => parseInt(num.trim(), 10));
      if (nums.some(isNaN)) {
        throw new Error("Invalid input: please enter comma-separated numbers");
      }

      // Check if array is sorted
      for (let i = 1; i < nums.length; i++) {
        if (nums[i] < nums[i - 1]) {
          throw new Error(
            "Invalid input: array must be sorted in non-decreasing order"
          );
        }
      }

      const numsCopy = [...nums];
      const k = removeDuplicates(numsCopy);
      setResult({
        array: numsCopy.slice(0, k),
        length: k,
      });
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleExampleClick = (example: { input: string; output: string }) => {
    setInput(example.input);
    const nums = example.input
      .split(",")
      .map((num) => parseInt(num.trim(), 10));
    const numsCopy = [...nums];
    const k = removeDuplicates(numsCopy);
    setResult({
      array: numsCopy.slice(0, k),
      length: k,
    });
  };

  return (
    <RemoveDuplicatesChallengeContent
      title="Remove Duplicates from Sorted Array"
      description="Given a sorted array nums, remove the duplicates in-place such that each element appears only once and returns the new length. Do not allocate extra space for another array; you must do this by modifying the input array in-place with O(1) extra memory. The relative order of the elements should be kept the same."
      examples={data.examples}
      testCases={data.testCases}
      solutions={data.solutions}
      initialCode={code}
      onCodeChange={setCode}
      TestRunner={RemoveDuplicatesTestRunner}
      inputValue={input}
      onInputChange={setInput}
      onInputSubmit={handleSubmit}
      result={result}
      onExampleClick={handleExampleClick}
    />
  );
}
