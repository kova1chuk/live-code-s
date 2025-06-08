"use client";
import { useState } from "react";
import SectionBox from "@/components/SectionBox";
import Typography from "@/components/Typography";
import Input from "@/components/Input";
import Button from "@/components/Button";
import List, { ListItem } from "@/components/List";
import CodeBlock from "@/components/CodeBlock";
import ExampleRow from "@/components/ExampleRow";

export default function TwoSum() {
  const [numbers, setNumbers] = useState("");
  const [target, setTarget] = useState("");
  const [result, setResult] = useState<number[]>([]);
  const [examples] = useState([
    {
      input: "2, 7, 11, 15 | 9",
      output: "[0, 1] (2 + 7 = 9)",
      numbers: "2, 7, 11, 15",
      target: "9",
    },
    {
      input: "3, 2, 4 | 6",
      output: "[1, 2] (2 + 4 = 6)",
      numbers: "3, 2, 4",
      target: "6",
    },
  ]);

  const twoSum = (nums: number[], target: number) => {
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
    const nums = numbers.split(",").map((num) => parseInt(num.trim()));
    const targetNum = parseInt(target);
    setResult(twoSum(nums, targetNum));
  };

  type Example = {
    input: string;
    output: string;
    numbers: string;
    target: string;
  };
  const handleExampleClick = (example: Example) => {
    setNumbers(example.numbers);
    setTarget(example.target);
    setResult([]);
  };

  const jsSolution = `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`;

  const tsSolution = `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    map.set(nums[i], i);
  }
  return [];
}`;

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <Typography
        variant="h2"
        className="mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold"
      >
        Two Sum
      </Typography>
      <div className="space-y-6 sm:space-y-8">
        <SectionBox title="Problem Description">
          <div className="space-y-4">
            <Typography className="text-base sm:text-lg">
              Given an array of integers <b>nums</b> and an integer{" "}
              <b>target</b>, return indices of the two numbers such that they
              add up to target. You may assume that each input would have
              exactly one solution, and you may not use the same element twice.
            </Typography>
            <div className="space-y-3">
              <Typography variant="h3" className="text-lg font-semibold">
                Examples:
              </Typography>
              <div className="flex flex-col gap-4">
                {examples.map((example, index) => (
                  <ExampleRow
                    key={index}
                    input={`nums = [${example.numbers}], target = ${example.target}`}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="max-w-md">
                  <Input
                    id="numbers"
                    label="Enter numbers (comma-separated):"
                    value={numbers}
                    onChange={setNumbers}
                    placeholder="2, 7, 11, 15"
                  />
                </div>
                <div className="max-w-md">
                  <Input
                    id="target"
                    label="Target sum:"
                    value={target}
                    onChange={setTarget}
                    placeholder="9"
                    type="number"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full sm:w-auto">
                Find Two Sum
              </Button>
            </form>
            {result.length > 0 && (
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <Typography variant="h3" className="text-lg font-semibold mb-2">
                  Result:
                </Typography>
                <Typography className="text-base sm:text-lg">
                  Indices: [{result.join(", ")}]
                </Typography>
                <Typography className="text-base sm:text-lg mt-2">
                  Numbers: [
                  {result.map((index, i) => (
                    <span key={index} className="font-mono">
                      {
                        numbers.split(",").map((num) => parseInt(num.trim()))[
                          index
                        ]
                      }
                      {i < result.length - 1 ? " + " : ""}
                    </span>
                  ))}
                  ] = {target}
                </Typography>
              </div>
            )}
          </div>
        </SectionBox>
        <SectionBox title="Solution">
          <div className="space-y-6">
            <div className="space-y-4">
              <CodeBlock jsCode={jsSolution} tsCode={tsSolution} />
            </div>
            <div className="space-y-4">
              <Typography variant="h3" className="text-lg font-semibold">
                Explanation:
              </Typography>
              <List type="ordered" className="space-y-2">
                <ListItem>
                  Create a Map to store numbers and their indices
                </ListItem>
                <ListItem>
                  For each number:
                  <List type="unordered" className="ml-4 mt-2">
                    <ListItem>
                      Calculate the complement (target - current number)
                    </ListItem>
                    <ListItem>
                      If complement exists in Map, return both indices
                    </ListItem>
                    <ListItem>
                      Otherwise, store current number and its index in Map
                    </ListItem>
                  </List>
                </ListItem>
                <ListItem>
                  Time Complexity: O(n), Space Complexity: O(n)
                </ListItem>
              </List>
            </div>
          </div>
        </SectionBox>
      </div>
    </div>
  );
}
