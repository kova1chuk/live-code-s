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
  const [result, setResult] = useState<number[]>([]);
  const [examples] = useState([
    {
      input: "Input: [0, 1, 0, 3, 12]",
      output: "Output: [1, 3, 12, 0, 0]",
      data: [0, 1, 0, 3, 12],
    },
    {
      input: "Input: [0, 0, 1]",
      output: "Output: [1, 0, 0]",
      data: [0, 0, 1],
    },
    {
      input: "Input: [1, 2, 3, 0, 0, 0]",
      output: "Output: [1, 2, 3, 0, 0, 0]",
      data: [1, 2, 3, 0, 0, 0],
    },
  ]);

  const moveZeroes = (nums: number[]) => {
    let nonZeroIndex = 0;

    // First pass: move all non-zero elements to the front
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
      const numbers = input.split(",").map((num) => parseInt(num.trim()));

      if (numbers.some(isNaN)) {
        throw new Error("Invalid input array");
      }

      setResult(moveZeroes([...numbers]));
    } catch (error) {
      alert(error instanceof Error ? error.message : "Invalid input");
    }
  };

  const handleExampleClick = (example: { data: number[] }) => {
    setInput(example.data.join(", "));
    setResult(moveZeroes([...example.data]));
  };

  const jsCode = `// Method 1: Two-pointer approach (In-place)
function moveZeroes(nums) {
  let nonZeroIndex = 0;
  
  // First pass: move all non-zero elements to the front
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      [nums[nonZeroIndex], nums[i]] = [nums[i], nums[nonZeroIndex]];
      nonZeroIndex++;
    }
  }
  
  return nums;
}

// Method 2: Two-pass approach
function moveZeroes(nums) {
  // First pass: copy non-zero elements to the front
  let nonZeroIndex = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[nonZeroIndex] = nums[i];
      nonZeroIndex++;
    }
  }
  
  // Second pass: fill remaining positions with zeros
  for (let i = nonZeroIndex; i < nums.length; i++) {
    nums[i] = 0;
  }
  
  return nums;
}

// Method 3: Using filter and fill (Not in-place)
function moveZeroes(nums) {
  const nonZeros = nums.filter(num => num !== 0);
  return [...nonZeros, ...new Array(nums.length - nonZeros.length).fill(0)];
}`;

  const tsCode = `// Method 1: Two-pointer approach (In-place)
function moveZeroes(nums: number[]): number[] {
  let nonZeroIndex: number = 0;
  
  // First pass: move all non-zero elements to the front
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      [nums[nonZeroIndex], nums[i]] = [nums[i], nums[nonZeroIndex]];
      nonZeroIndex++;
    }
  }
  
  return nums;
}

// Method 2: Two-pass approach
function moveZeroes(nums: number[]): number[] {
  // First pass: copy non-zero elements to the front
  let nonZeroIndex: number = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[nonZeroIndex] = nums[i];
      nonZeroIndex++;
    }
  }
  
  // Second pass: fill remaining positions with zeros
  for (let i = nonZeroIndex; i < nums.length; i++) {
    nums[i] = 0;
  }
  
  return nums;
}

// Method 3: Using filter and fill (Not in-place)
function moveZeroes(nums: number[]): number[] {
  const nonZeros: number[] = nums.filter(num => num !== 0);
  return [...nonZeros, ...new Array(nums.length - nonZeros.length).fill(0)];
}`;

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
              Given an integer array nums, write a function to move all 0&apos;s
              to the end of it while maintaining the relative order of the
              non-zero elements. Note that you must do this in-place without
              making a copy of the array.
            </Typography>
            <div className="space-y-2">
              <Typography className="text-base sm:text-lg">
                Key points to consider:
              </Typography>
              <List type="unordered" className="ml-4">
                <ListItem>Modify the array in-place (no extra array)</ListItem>
                <ListItem>
                  Maintain relative order of non-zero elements
                </ListItem>
                <ListItem>Minimize the total number of operations</ListItem>
                <ListItem>
                  Handle edge cases (empty array, all zeros, no zeros)
                </ListItem>
                <ListItem>Array can contain negative numbers</ListItem>
              </List>
            </div>
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
                  label="Enter numbers (comma-separated):"
                  value={input}
                  onChange={setInput}
                  placeholder="0, 1, 0, 3, 12"
                />
              </div>
              <Button type="submit" className="w-full sm:w-auto">
                Move Zeroes
              </Button>
            </form>
            {result.length > 0 && (
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <Typography variant="h3" className="text-lg font-semibold mb-2">
                  Result:
                </Typography>
                <Typography className="text-base sm:text-lg break-all">
                  [{result.join(", ")}]
                </Typography>
              </div>
            )}
          </div>
        </SectionBox>

        <SectionBox title="Solution">
          <div className="space-y-6">
            <div className="space-y-4">
              <Typography className="text-base sm:text-lg">
                The Move Zeroes problem can be solved using several approaches.
                We&apos;ll explore three different methods, each with its own
                trade-offs in terms of operations and readability.
              </Typography>
              <CodeBlock jsCode={jsCode} tsCode={tsCode} />
            </div>
            <div className="space-y-4">
              <Typography variant="h3" className="text-lg font-semibold">
                Detailed Explanation:
              </Typography>
              <List type="ordered" className="space-y-4">
                <ListItem>
                  Method 1 (Two-pointer with swap):
                  <List type="unordered" className="ml-4 mt-2">
                    <ListItem>
                      Key idea: Use two pointers to track positions
                    </ListItem>
                    <ListItem>Steps:</ListItem>
                    <ListItem className="ml-4">
                      1. Keep track of where next non-zero should go
                    </ListItem>
                    <ListItem className="ml-4">
                      2. Iterate through array looking for non-zeros
                    </ListItem>
                    <ListItem className="ml-4">
                      3. When found, swap with position tracked
                    </ListItem>
                    <ListItem>Example with [0,1,0,3,12]:</ListItem>
                    <ListItem className="ml-4">
                      1. [0,1,0,3,12] nonZeroIndex=0, i=1 becomes [1,0,0,3,12]
                    </ListItem>
                    <ListItem className="ml-4">
                      2. [1,0,0,3,12] nonZeroIndex=1, i=3 becomes [1,3,0,0,12]
                    </ListItem>
                    <ListItem className="ml-4">
                      3. [1,3,0,0,12] nonZeroIndex=2, i=4 becomes [1,3,12,0,0]
                    </ListItem>
                  </List>
                </ListItem>
                <ListItem>
                  Method 2 (Two-pass):
                  <List type="unordered" className="ml-4 mt-2">
                    <ListItem>
                      Key idea: Separate the process into two steps
                    </ListItem>
                    <ListItem>Steps:</ListItem>
                    <ListItem className="ml-4">
                      1. Copy non-zero elements to front
                    </ListItem>
                    <ListItem className="ml-4">
                      2. Fill remaining positions with zeros
                    </ListItem>
                    <ListItem>Advantages:</ListItem>
                    <ListItem className="ml-4">- More readable code</ListItem>
                    <ListItem className="ml-4">
                      - Fewer swap operations
                    </ListItem>
                    <ListItem className="ml-4">
                      - Good for when array has many zeros
                    </ListItem>
                  </List>
                </ListItem>
                <ListItem>
                  Method 3 (Filter and Fill):
                  <List type="unordered" className="ml-4 mt-2">
                    <ListItem>Key idea: Use built-in array methods</ListItem>
                    <ListItem>Steps:</ListItem>
                    <ListItem className="ml-4">
                      1. Filter out non-zero elements
                    </ListItem>
                    <ListItem className="ml-4">
                      2. Create array of zeros
                    </ListItem>
                    <ListItem className="ml-4">3. Combine arrays</ListItem>
                    <ListItem>Advantages:</ListItem>
                    <ListItem className="ml-4">
                      - Most concise solution
                    </ListItem>
                    <ListItem className="ml-4">- Easy to understand</ListItem>
                    <ListItem>Disadvantages:</ListItem>
                    <ListItem className="ml-4">
                      - Not in-place (creates new array)
                    </ListItem>
                    <ListItem className="ml-4">- Uses more memory</ListItem>
                  </List>
                </ListItem>
              </List>
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Typography variant="h3" className="text-lg font-semibold mb-2">
                  Time & Space Complexity:
                </Typography>
                <List type="unordered" className="space-y-2">
                  <ListItem>
                    Method 1 (Two-pointer with swap):
                    <List type="unordered" className="ml-4">
                      <ListItem>Time: O(n) - one pass through array</ListItem>
                      <ListItem>Space: O(1) - in-place modification</ListItem>
                      <ListItem>Operations: Up to n swaps</ListItem>
                    </List>
                  </ListItem>
                  <ListItem>
                    Method 2 (Two-pass):
                    <List type="unordered" className="ml-4">
                      <ListItem>Time: O(n) - two passes through array</ListItem>
                      <ListItem>Space: O(1) - in-place modification</ListItem>
                      <ListItem>
                        Operations: n reads + k writes (k = number of non-zeros)
                      </ListItem>
                    </List>
                  </ListItem>
                  <ListItem>
                    Method 3 (Filter and Fill):
                    <List type="unordered" className="ml-4">
                      <ListItem>
                        Time: O(n) - filter + spread operations
                      </ListItem>
                      <ListItem>Space: O(n) - creates new array</ListItem>
                      <ListItem>
                        Operations: Depends on JS engine implementation
                      </ListItem>
                    </List>
                  </ListItem>
                </List>
              </div>
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <Typography variant="h3" className="text-lg font-semibold mb-2">
                  Common Edge Cases:
                </Typography>
                <List type="unordered" className="space-y-1">
                  <ListItem>Empty array: returns empty array</ListItem>
                  <ListItem>Single element: returns same array</ListItem>
                  <ListItem>All zeros: no change needed</ListItem>
                  <ListItem>No zeros: no change needed</ListItem>
                  <ListItem>
                    Alternating zeros: [0,1,0,2,0,3] &rarr; [1,2,3,0,0,0]
                  </ListItem>
                  <ListItem>Negative numbers: treat same as positive</ListItem>
                </List>
              </div>
            </div>
          </div>
        </SectionBox>
      </div>
    </div>
  );
}
