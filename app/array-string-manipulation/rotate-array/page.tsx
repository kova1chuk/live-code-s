"use client";
import { useState } from "react";
import SectionBox from "@/components/SectionBox";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Typography from "@/components/Typography";
import List, { ListItem } from "@/components/List";
import CodeBlock from "@/components/CodeBlock";
import ExampleRow from "@/components/ExampleRow";

export default function RotateArray() {
  const [input, setInput] = useState("");
  const [steps, setSteps] = useState("");
  const [result, setResult] = useState<number[]>([]);
  const [examples] = useState([
    {
      input: "Input: [1, 2, 3, 4, 5], k = 2",
      output: "Output: [4, 5, 1, 2, 3]",
      data: { array: [1, 2, 3, 4, 5], k: 2 },
    },
    {
      input: "Input: [7, -1, 5, 2], k = 3",
      output: "Output: [5, 2, 7, -1]",
      data: { array: [7, -1, 5, 2], k: 3 },
    },
    {
      input: "Input: [-1, -100, 3, 99], k = 2",
      output: "Output: [3, 99, -1, -100]",
      data: { array: [-1, -100, 3, 99], k: 2 },
    },
  ]);

  const rotateArray = (nums: number[], k: number) => {
    const n = nums.length;
    k = k % n; // Handle cases where k > n

    // Reverse the entire array
    reverse(nums, 0, n - 1);
    // Reverse the first k elements
    reverse(nums, 0, k - 1);
    // Reverse the remaining elements
    reverse(nums, k, n - 1);

    return nums;
  };

  const reverse = (nums: number[], start: number, end: number) => {
    while (start < end) {
      [nums[start], nums[end]] = [nums[end], nums[start]];
      start++;
      end--;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const numbers = input.split(",").map((num) => parseInt(num.trim()));
      const k = parseInt(steps);

      if (isNaN(k) || k < 0) {
        throw new Error("Steps must be a non-negative number");
      }
      if (numbers.some(isNaN)) {
        throw new Error("Invalid input array");
      }

      setResult(rotateArray([...numbers], k));
    } catch (error) {
      alert(error instanceof Error ? error.message : "Invalid input");
    }
  };

  const handleExampleClick = (example: {
    data: { array: number[]; k: number };
  }) => {
    setInput(example.data.array.join(", "));
    setSteps(example.data.k.toString());
    setResult(rotateArray([...example.data.array], example.data.k));
  };

  const jsCode = `// Method 1: Using Reverse (In-place)
function rotateArray(nums, k) {
  const n = nums.length;
  k = k % n; // Handle cases where k > n
  
  // Reverse the entire array
  reverse(nums, 0, n - 1);
  // Reverse the first k elements
  reverse(nums, 0, k - 1);
  // Reverse the remaining elements
  reverse(nums, k, n - 1);
  
  return nums;
}

function reverse(nums, start, end) {
  while (start < end) {
    [nums[start], nums[end]] = [nums[end], nums[start]];
    start++;
    end--;
  }
}

// Method 2: Using Extra Space
function rotateArray(nums, k) {
  const n = nums.length;
  k = k % n;
  const result = new Array(n);
  
  for (let i = 0; i < n; i++) {
    result[(i + k) % n] = nums[i];
  }
  
  return result;
}

// Method 3: Using Cyclic Replacements
function rotateArray(nums, k) {
  const n = nums.length;
  k = k % n;
  let count = 0;
  
  for (let start = 0; count < n; start++) {
    let current = start;
    let prev = nums[start];
    
    do {
      const next = (current + k) % n;
      const temp = nums[next];
      nums[next] = prev;
      prev = temp;
      current = next;
      count++;
    } while (start !== current);
  }
  
  return nums;
}`;

  const tsCode = `// Method 1: Using Reverse (In-place)
function rotateArray(nums: number[], k: number): number[] {
  const n: number = nums.length;
  k = k % n; // Handle cases where k > n
  
  // Reverse the entire array
  reverse(nums, 0, n - 1);
  // Reverse the first k elements
  reverse(nums, 0, k - 1);
  // Reverse the remaining elements
  reverse(nums, k, n - 1);
  
  return nums;
}

function reverse(nums: number[], start: number, end: number): void {
  while (start < end) {
    [nums[start], nums[end]] = [nums[end], nums[start]];
    start++;
    end--;
  }
}

// Method 2: Using Extra Space
function rotateArray(nums: number[], k: number): number[] {
  const n: number = nums.length;
  k = k % n;
  const result: number[] = new Array(n);
  
  for (let i = 0; i < n; i++) {
    result[(i + k) % n] = nums[i];
  }
  
  return result;
}

// Method 3: Using Cyclic Replacements
function rotateArray(nums: number[], k: number): number[] {
  const n: number = nums.length;
  k = k % n;
  let count: number = 0;
  
  for (let start = 0; count < n; start++) {
    let current: number = start;
    let prev: number = nums[start];
    
    do {
      const next: number = (current + k) % n;
      const temp: number = nums[next];
      nums[next] = prev;
      prev = temp;
      current = next;
      count++;
    } while (start !== current);
  }
  
  return nums;
}`;

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <Typography
        variant="h2"
        className="mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold"
      >
        Rotate Array
      </Typography>

      <div className="space-y-6 sm:space-y-8">
        <SectionBox title="Problem Description">
          <div className="space-y-4">
            <Typography className="text-base sm:text-lg">
              Given an array, rotate the array to the right by k steps, where k
              is non-negative. The rotation should be performed in-place,
              meaning you should modify the input array directly with O(1) extra
              space.
            </Typography>
            <div className="space-y-2">
              <Typography className="text-base sm:text-lg">
                Key points to consider:
              </Typography>
              <List type="unordered" className="ml-4">
                <ListItem>
                  k is non-negative and can be larger than array length
                </ListItem>
                <ListItem>
                  Array can contain both positive and negative integers
                </ListItem>
                <ListItem>Array can have duplicates</ListItem>
                <ListItem>Try to solve it with O(1) extra space</ListItem>
                <ListItem>The order of elements should be preserved</ListItem>
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
                  placeholder="1, 2, 3, 4, 5"
                />
              </div>
              <div className="max-w-md">
                <Input
                  id="steps"
                  label="Number of steps to rotate:"
                  value={steps}
                  onChange={setSteps}
                  type="number"
                  placeholder="2"
                />
              </div>
              <Button type="submit" className="w-full sm:w-auto">
                Rotate Array
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
                The array rotation problem can be solved using several
                approaches. We'll explore three different methods, each with its
                own trade-offs in terms of time and space complexity.
              </Typography>
              <CodeBlock jsCode={jsCode} tsCode={tsCode} />
            </div>
            <div className="space-y-4">
              <Typography variant="h3" className="text-lg font-semibold">
                Detailed Explanation:
              </Typography>
              <List type="ordered" className="space-y-4">
                <ListItem>
                  Method 1 (Using Reverse):
                  <List type="unordered" className="ml-4 mt-2">
                    <ListItem>
                      Key idea: Reverse parts of the array to achieve rotation
                    </ListItem>
                    <ListItem>Steps:</ListItem>
                    <ListItem className="ml-4">
                      1. Reverse entire array
                    </ListItem>
                    <ListItem className="ml-4">
                      2. Reverse first k elements
                    </ListItem>
                    <ListItem className="ml-4">
                      3. Reverse remaining elements
                    </ListItem>
                    <ListItem>Example with [1,2,3,4,5], k=2:</ListItem>
                    <ListItem className="ml-4">
                      1. [1,2,3,4,5] becomes [5,4,3,2,1]
                    </ListItem>
                    <ListItem className="ml-4">
                      2. [5,4|3,2,1] becomes [4,5|3,2,1]
                    </ListItem>
                    <ListItem className="ml-4">
                      3. [4,5|3,2,1] becomes [4,5|1,2,3]
                    </ListItem>
                  </List>
                </ListItem>
                <ListItem>
                  Method 2 (Extra Space):
                  <List type="unordered" className="ml-4 mt-2">
                    <ListItem>
                      Key idea: Use additional array to store rotated elements
                    </ListItem>
                    <ListItem>Steps:</ListItem>
                    <ListItem className="ml-4">
                      1. Create new array of same size
                    </ListItem>
                    <ListItem className="ml-4">
                      2. Calculate new position for each element
                    </ListItem>
                    <ListItem className="ml-4">
                      3. Copy elements to new positions
                    </ListItem>
                    <ListItem>Advantages:</ListItem>
                    <ListItem className="ml-4">
                      - Simple to understand and implement
                    </ListItem>
                    <ListItem className="ml-4">
                      - Good for small arrays or when space isn't a concern
                    </ListItem>
                  </List>
                </ListItem>
                <ListItem>
                  Method 3 (Cyclic Replacements):
                  <List type="unordered" className="ml-4 mt-2">
                    <ListItem>
                      Key idea: Move elements to their final positions in cycles
                    </ListItem>
                    <ListItem>Steps:</ListItem>
                    <ListItem className="ml-4">
                      1. Start from each position until all elements are moved
                    </ListItem>
                    <ListItem className="ml-4">
                      2. Keep track of elements moved using count
                    </ListItem>
                    <ListItem className="ml-4">
                      3. Handle cycles by starting new position when cycle
                      completes
                    </ListItem>
                    <ListItem>Advantages:</ListItem>
                    <ListItem className="ml-4">
                      - O(1) space complexity
                    </ListItem>
                    <ListItem className="ml-4">- No reversing needed</ListItem>
                  </List>
                </ListItem>
              </List>
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Typography variant="h3" className="text-lg font-semibold mb-2">
                  Time & Space Complexity:
                </Typography>
                <List type="unordered" className="space-y-2">
                  <ListItem>
                    Method 1 (Reverse):
                    <List type="unordered" className="ml-4">
                      <ListItem>
                        Time: O(n) - each element is moved at most twice
                      </ListItem>
                      <ListItem>
                        Space: O(1) - only uses constant extra space
                      </ListItem>
                    </List>
                  </ListItem>
                  <ListItem>
                    Method 2 (Extra Space):
                    <List type="unordered" className="ml-4">
                      <ListItem>
                        Time: O(n) - each element is moved once
                      </ListItem>
                      <ListItem>
                        Space: O(n) - requires additional array
                      </ListItem>
                    </List>
                  </ListItem>
                  <ListItem>
                    Method 3 (Cyclic):
                    <List type="unordered" className="ml-4">
                      <ListItem>
                        Time: O(n) - each element is moved once
                      </ListItem>
                      <ListItem>
                        Space: O(1) - only uses constant extra space
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
                  <ListItem>Single element: no change needed</ListItem>
                  <ListItem>k = 0: no rotation needed</ListItem>
                  <ListItem>k &gt; array.length: use k % array.length</ListItem>
                  <ListItem>
                    k = array.length: array returns to original state
                  </ListItem>
                  <ListItem>
                    Array with duplicates: maintain relative order
                  </ListItem>
                </List>
              </div>
            </div>
          </div>
        </SectionBox>
      </div>
    </div>
  );
}
