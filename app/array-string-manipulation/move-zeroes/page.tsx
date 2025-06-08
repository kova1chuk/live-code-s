"use client";
import { useState } from "react";
import SectionBox from "@/components/SectionBox";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Typography from "@/components/Typography";
import List, { ListItem } from "@/components/List";
import CodeBlock from "@/components/CodeBlock";
import ExampleRow from "@/components/ExampleRow";

export default function MoveZeroes() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [examples] = useState([
    { input: "[0, 1, 0, 3, 12]", output: "[1, 3, 12, 0, 0]" },
    { input: "[0]", output: "[0]" },
    { input: "[1, 2, 3, 0, 0, 0]", output: "[1, 2, 3, 0, 0, 0]" },
  ]);

  const moveZeroes = (nums: number[]): number[] => {
    let nonZeroIndex = 0;

    // Move all non-zero elements to the front
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] !== 0) {
        [nums[nonZeroIndex], nums[i]] = [nums[i], nums[nonZeroIndex]];
        nonZeroIndex++;
      }
    }

    return nums;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const inputArray = JSON.parse(input);
      if (!Array.isArray(inputArray)) {
        throw new Error("Input must be an array");
      }
      setResult(JSON.stringify(moveZeroes([...inputArray])));
    } catch {
      setResult("Invalid input. Please enter a valid array of numbers.");
    }
  };

  const handleExampleClick = (example: { input: string; output: string }) => {
    setInput(example.input);
    setResult(example.output);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <Typography
        variant="h2"
        className="mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold"
      >
        Move Zeroes
      </Typography>

      <div className="space-y-6 sm:space-y-8">
        <SectionBox title="Problem Description">
          <div className="space-y-4">
            <Typography className="text-base sm:text-lg">
              Write a function that takes an array of numbers and moves all
              zeroes to the end of the array while maintaining the relative
              order of non-zero elements. The operation should be performed
              in-place if possible.
            </Typography>
            <div className="space-y-3">
              <Typography variant="h3" className="text-lg font-semibold">
                Examples:
              </Typography>
              <div className="flex flex-col gap-4">
                {examples.map((example, index) => (
                  <ExampleRow
                    key={index}
                    input={example.input}
                    output={example.output}
                    onClick={() => handleExampleClick(example)}
                  />
                ))}
              </div>
            </div>
          </div>
        </SectionBox>

        <SectionBox title="Try it out">
          <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="max-w-md">
                <Input
                  id="input"
                  label="Enter an array of numbers:"
                  value={input}
                  onChange={setInput}
                  placeholder="e.g. [0, 1, 0, 3, 12]"
                />
              </div>
              <Button type="submit" className="w-full sm:w-auto">
                Move Zeroes
              </Button>
            </form>
            {result && (
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <Typography variant="h3" className="text-lg font-semibold mb-2">
                  Result:
                </Typography>
                <Typography className="text-base sm:text-lg break-all">
                  {result}
                </Typography>
              </div>
            )}
          </div>
        </SectionBox>

        <SectionBox title="Solution">
          <div className="space-y-6">
            <Typography className="text-base sm:text-lg">
              Here are three different approaches to solve this problem, each
              with its own advantages:
            </Typography>
          </div>
        </SectionBox>

        <SectionBox title="Method 1: Two-pointer Approach (In-place)">
          <div className="space-y-6">
            <div className="space-y-4">
              <Typography className="text-base sm:text-lg">
                This method uses two pointers to track positions and swap
                elements in place:
              </Typography>
              <CodeBlock
                jsCode={`function moveZeroes(nums) {
  let nonZeroIndex = 0;
  
  // Move all non-zero elements to the front
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      [nums[nonZeroIndex], nums[i]] = [nums[i], nums[nonZeroIndex]];
      nonZeroIndex++;
    }
  }
  
  return nums;
}`}
                tsCode={`function moveZeroes(nums: number[]): number[] {
  let nonZeroIndex = 0;
  
  // Move all non-zero elements to the front
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      [nums[nonZeroIndex], nums[i]] = [nums[i], nums[nonZeroIndex]];
      nonZeroIndex++;
    }
  }
  
  return nums;
}`}
              />
            </div>
            <div className="space-y-4">
              <List type="unordered" className="space-y-2">
                <ListItem>
                  Keep track of position for non-zero elements
                </ListItem>
                <ListItem>Swap non-zero elements to the front</ListItem>
                <ListItem>Automatically moves zeroes to the end</ListItem>
              </List>
            </div>
          </div>
        </SectionBox>

        <SectionBox title="Method 2: Filter and Fill">
          <div className="space-y-6">
            <div className="space-y-4">
              <Typography className="text-base sm:text-lg">
                This method uses array methods to create a new array with the
                desired order:
              </Typography>
              <CodeBlock
                jsCode={`function moveZeroes(nums) {
  const nonZeros = nums.filter(num => num !== 0);
  return [...nonZeros, ...Array(nums.length - nonZeros.length).fill(0)];
}`}
                tsCode={`function moveZeroes(nums: number[]): number[] {
  const nonZeros = nums.filter(num => num !== 0);
  return [...nonZeros, ...Array(nums.length - nonZeros.length).fill(0)];
}`}
              />
            </div>
            <div className="space-y-4">
              <List type="unordered" className="space-y-2">
                <ListItem>Filter out non-zero elements</ListItem>
                <ListItem>Create array of zeroes for remaining length</ListItem>
                <ListItem>Combine non-zero elements with zeroes</ListItem>
              </List>
            </div>
          </div>
        </SectionBox>

        <SectionBox title="Method 3: Two-pass Approach">
          <div className="space-y-6">
            <div className="space-y-4">
              <Typography className="text-base sm:text-lg">
                This method uses two passes through the array to achieve the
                result:
              </Typography>
              <CodeBlock
                jsCode={`function moveZeroes(nums) {
  // First pass: copy non-zero elements
  let pos = 0;
  for (const num of nums) {
    if (num !== 0) {
      nums[pos] = num;
      pos++;
    }
  }
  
  // Second pass: fill remaining positions with zeros
  while (pos < nums.length) {
    nums[pos] = 0;
    pos++;
  }
  
  return nums;
}`}
                tsCode={`function moveZeroes(nums: number[]): number[] {
  // First pass: copy non-zero elements
  let pos = 0;
  for (const num of nums) {
    if (num !== 0) {
      nums[pos] = num;
      pos++;
    }
  }
  
  // Second pass: fill remaining positions with zeros
  while (pos < nums.length) {
    nums[pos] = 0;
    pos++;
  }
  
  return nums;
}`}
              />
            </div>
            <div className="space-y-4">
              <List type="unordered" className="space-y-2">
                <ListItem>First pass: copy non-zero elements to front</ListItem>
                <ListItem>Second pass: fill remaining with zeroes</ListItem>
                <ListItem>Maintains relative order</ListItem>
              </List>
            </div>
          </div>
        </SectionBox>
      </div>
    </div>
  );
}
