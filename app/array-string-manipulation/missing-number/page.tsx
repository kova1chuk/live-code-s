"use client";
import { useState } from "react";
import SectionBox from "@/components/SectionBox";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Typography from "@/components/Typography";
import List, { ListItem } from "@/components/List";
import CodeBlock from "@/components/CodeBlock";
import ExampleRow from "@/components/ExampleRow";

export default function MissingNumber() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [examples] = useState([
    {
      input: "Input: [3, 0, 1]",
      output: "Output: 2",
      data: [3, 0, 1],
      explanation: "2 is missing from the sequence [0,1,2,3]",
    },
    {
      input: "Input: [9, 6, 4, 2, 3, 5, 7, 0, 1]",
      output: "Output: 8",
      data: [9, 6, 4, 2, 3, 5, 7, 0, 1],
      explanation: "8 is missing from [0,1,2,3,4,5,6,7,8,9]",
    },
    {
      input: "Input: [0, 1]",
      output: "Output: 2",
      data: [0, 1],
      explanation: "2 is missing from [0,1,2]",
    },
    {
      input: "Input: [1]",
      output: "Output: 0",
      data: [1],
      explanation: "0 is missing from [0,1]",
    },
    {
      input: "Input: [0]",
      output: "Output: 1",
      data: [0],
      explanation: "1 is missing from [0,1]",
    },
  ]);

  const findMissingNumber = (nums: number[]): number => {
    // Using XOR method as it handles overflow and is most efficient
    let xor = 0;
    // XOR all numbers from 0 to n
    for (let i = 0; i <= nums.length; i++) {
      xor ^= i;
    }
    // XOR with all numbers in array
    for (const num of nums) {
      xor ^= num;
    }
    return xor;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      // Remove all whitespace and split by comma
      const numbers = input
        .replace(/\s+/g, "")
        .split(",")
        .map((num) => {
          const parsed = parseInt(num.trim());
          if (isNaN(parsed)) {
            throw new Error(`Invalid number: "${num}"`);
          }
          return parsed;
        });

      if (numbers.length === 0) {
        throw new Error("Please enter at least one number");
      }

      // Validate that numbers are in range [0, n]
      const n = numbers.length;
      const invalid = numbers.find((num) => num < 0 || num > n);
      if (invalid !== undefined) {
        throw new Error(
          `Number ${invalid} is out of range. All numbers must be between 0 and ${n}`
        );
      }

      // Check for duplicates
      const seen = new Set<number>();
      const duplicate = numbers.find((num) => {
        if (seen.has(num)) return true;
        seen.add(num);
        return false;
      });
      if (duplicate !== undefined) {
        throw new Error(`Duplicate number found: ${duplicate}`);
      }

      setResult(findMissingNumber(numbers));
    } catch (error) {
      setError(error instanceof Error ? error.message : "Invalid input");
    }
  };

  const handleExampleClick = (example: { data: number[] }) => {
    setInput(example.data.join(", "));
    setError(null);
    setResult(findMissingNumber(example.data));
  };

  const jsCode = `// Method 1: Using XOR (Recommended)
function findMissingNumber(nums) {
  let xor = 0;
  // XOR all numbers from 0 to n
  for (let i = 0; i <= nums.length; i++) {
    xor ^= i;
  }
  // XOR with all numbers in array
  for (const num of nums) {
    xor ^= num;
  }
  return xor;
}

// Method 2: Using Sum Formula (Simple but may overflow)
function findMissingNumber(nums) {
  const n = nums.length;
  // Expected sum of first n natural numbers
  const expectedSum = (n * (n + 1)) / 2;
  // Actual sum of array
  const actualSum = nums.reduce((sum, num) => sum + num, 0);
  // Missing number is the difference
  return expectedSum - actualSum;
}

// Method 3: Using Set (Extra space but readable)
function findMissingNumber(nums) {
  const set = new Set(nums);
  for (let i = 0; i <= nums.length; i++) {
    if (!set.has(i)) {
      return i;
    }
  }
  return nums.length;
}

// Method 4: Using Cyclic Sort (In-place but modifies array)
function findMissingNumber(nums) {
  let i = 0;
  while (i < nums.length) {
    const correctPos = nums[i];
    if (correctPos < nums.length && nums[i] !== nums[correctPos]) {
      [nums[i], nums[correctPos]] = [nums[correctPos], nums[i]];
    } else {
      i++;
    }
  }
  
  // Find the missing number
  for (i = 0; i < nums.length; i++) {
    if (nums[i] !== i) {
      return i;
    }
  }
  return nums.length;
}`;

  const tsCode = `// Method 1: Using XOR (Recommended)
function findMissingNumber(nums: number[]): number {
  let xor: number = 0;
  // XOR all numbers from 0 to n
  for (let i = 0; i <= nums.length; i++) {
    xor ^= i;
  }
  // XOR with all numbers in array
  for (const num of nums) {
    xor ^= num;
  }
  return xor;
}

// Method 2: Using Sum Formula (Simple but may overflow)
function findMissingNumber(nums: number[]): number {
  const n: number = nums.length;
  // Expected sum of first n natural numbers
  const expectedSum: number = (n * (n + 1)) / 2;
  // Actual sum of array
  const actualSum: number = nums.reduce((sum, num) => sum + num, 0);
  // Missing number is the difference
  return expectedSum - actualSum;
}

// Method 3: Using Set (Extra space but readable)
function findMissingNumber(nums: number[]): number {
  const set: Set<number> = new Set(nums);
  for (let i = 0; i <= nums.length; i++) {
    if (!set.has(i)) {
      return i;
    }
  }
  return nums.length;
}

// Method 4: Using Cyclic Sort (In-place but modifies array)
function findMissingNumber(nums: number[]): number {
  let i: number = 0;
  while (i < nums.length) {
    const correctPos: number = nums[i];
    if (correctPos < nums.length && nums[i] !== nums[correctPos]) {
      [nums[i], nums[correctPos]] = [nums[correctPos], nums[i]];
    } else {
      i++;
    }
  }
  
  // Find the missing number
  for (i = 0; i < nums.length; i++) {
    if (nums[i] !== i) {
      return i;
    }
  }
  return nums.length;
}`;

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <Typography
        variant="h2"
        className="mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold"
      >
        Find Missing Number in Range
      </Typography>

      <div className="space-y-6 sm:space-y-8">
        <SectionBox title="Problem Description">
          <div className="space-y-4">
            <Typography className="text-base sm:text-lg">
              Given an array nums containing n distinct numbers in the range [0,
              n], return the only number in the range that is missing from the
              array. The array may be in any order.
            </Typography>
            <div className="space-y-2">
              <Typography className="text-base sm:text-lg">
                Key points to consider:
              </Typography>
              <List type="unordered" className="ml-4">
                <ListItem>
                  Array contains distinct numbers from 0 to n (except one)
                </ListItem>
                <ListItem>
                  Array length is n (meaning one number is missing)
                </ListItem>
                <ListItem>Try to achieve O(1) extra space</ListItem>
                <ListItem>Consider solutions without sorting</ListItem>
                <ListItem>
                  Handle potential integer overflow for large numbers
                </ListItem>
                <ListItem>
                  Input validation is crucial (no duplicates, correct range)
                </ListItem>
              </List>
            </div>
            <div className="space-y-3">
              <Typography variant="h3" className="text-lg font-semibold">
                Examples:
              </Typography>
              <div className="flex flex-col gap-4">
                {examples.map((example, index) => (
                  <div key={index} className="space-y-2">
                    <ExampleRow
                      input={example.input}
                      output={example.output}
                      onClick={() => handleExampleClick(example)}
                    />
                    <Typography className="text-sm text-gray-600 dark:text-gray-400 ml-4">
                      {example.explanation}
                    </Typography>
                  </div>
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
                  placeholder="3, 0, 1"
                />
                {error && (
                  <Typography className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {error}
                  </Typography>
                )}
              </div>
              <Button type="submit" className="w-full sm:w-auto">
                Find Missing Number
              </Button>
            </form>
            {result !== null && (
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <Typography variant="h3" className="text-lg font-semibold mb-2">
                  Result:
                </Typography>
                <Typography className="text-base sm:text-lg">
                  Missing number: {result}
                </Typography>
              </div>
            )}
          </div>
        </SectionBox>

        <SectionBox title="Solution">
          <div className="space-y-6">
            <div className="space-y-4">
              <Typography className="text-base sm:text-lg">
                The Find Missing Number problem can be solved using several
                approaches. We&apos;ll explore four different methods, each with
                its own trade-offs in terms of time complexity, space
                complexity, and readability. The XOR method is recommended as it
                handles overflow and is most efficient.
              </Typography>
              <CodeBlock jsCode={jsCode} tsCode={tsCode} />
            </div>
            <div className="space-y-4">
              <Typography variant="h3" className="text-lg font-semibold">
                Detailed Explanation:
              </Typography>
              <List type="ordered" className="space-y-4">
                <ListItem>
                  Method 1 (XOR - Recommended):
                  <List type="unordered" className="ml-4 mt-2">
                    <ListItem>Key idea: XOR has these properties:</ListItem>
                    <ListItem className="ml-4">
                      a ⊕ a = 0 (number XOR itself = 0)
                    </ListItem>
                    <ListItem className="ml-4">
                      a ⊕ 0 = a (number XOR 0 = number)
                    </ListItem>
                    <ListItem className="ml-4">
                      a ⊕ b = b ⊕ a (commutative)
                    </ListItem>
                    <ListItem>Steps:</ListItem>
                    <ListItem className="ml-4">
                      1. XOR all numbers 0 to n
                    </ListItem>
                    <ListItem className="ml-4">
                      2. XOR with all array numbers
                    </ListItem>
                    <ListItem className="ml-4">
                      3. Remaining value is missing number
                    </ListItem>
                    <ListItem>Example with [3,0,1]:</ListItem>
                    <ListItem className="ml-4">1. 0⊕1⊕2⊕3 = n1</ListItem>
                    <ListItem className="ml-4">2. n1⊕3⊕0⊕1 = 2</ListItem>
                    <ListItem>Advantages:</ListItem>
                    <ListItem className="ml-4">- No overflow issues</ListItem>
                    <ListItem className="ml-4">- O(1) extra space</ListItem>
                    <ListItem className="ml-4">
                      - Single pass through array
                    </ListItem>
                  </List>
                </ListItem>
                <ListItem>
                  Method 2 (Sum Formula):
                  <List type="unordered" className="ml-4 mt-2">
                    <ListItem>Key idea: Use arithmetic sequence sum</ListItem>
                    <ListItem>Steps:</ListItem>
                    <ListItem className="ml-4">
                      1. Calculate expected sum: n(n+1)/2
                    </ListItem>
                    <ListItem className="ml-4">
                      2. Calculate actual array sum
                    </ListItem>
                    <ListItem className="ml-4">
                      3. Difference is missing number
                    </ListItem>
                    <ListItem>Advantages:</ListItem>
                    <ListItem className="ml-4">- Simple to understand</ListItem>
                    <ListItem className="ml-4">- Clean implementation</ListItem>
                    <ListItem>Disadvantages:</ListItem>
                    <ListItem className="ml-4">
                      - May overflow with large numbers
                    </ListItem>
                  </List>
                </ListItem>
                <ListItem>
                  Method 3 (Set):
                  <List type="unordered" className="ml-4 mt-2">
                    <ListItem>Key idea: Use Set for O(1) lookups</ListItem>
                    <ListItem>Steps:</ListItem>
                    <ListItem className="ml-4">
                      1. Add all numbers to Set
                    </ListItem>
                    <ListItem className="ml-4">
                      2. Check each number from 0 to n
                    </ListItem>
                    <ListItem className="ml-4">
                      3. First missing is the answer
                    </ListItem>
                    <ListItem>Advantages:</ListItem>
                    <ListItem className="ml-4">- Very readable code</ListItem>
                    <ListItem className="ml-4">- Good for interviews</ListItem>
                    <ListItem>Disadvantages:</ListItem>
                    <ListItem className="ml-4">
                      - Uses O(n) extra space
                    </ListItem>
                  </List>
                </ListItem>
                <ListItem>
                  Method 4 (Cyclic Sort):
                  <List type="unordered" className="ml-4 mt-2">
                    <ListItem>Key idea: Each number goes to its index</ListItem>
                    <ListItem>Steps:</ListItem>
                    <ListItem className="ml-4">
                      1. Place each number at its index
                    </ListItem>
                    <ListItem className="ml-4">
                      2. Scan for first mismatch
                    </ListItem>
                    <ListItem>Advantages:</ListItem>
                    <ListItem className="ml-4">- O(1) extra space</ListItem>
                    <ListItem className="ml-4">
                      - Works for similar problems
                    </ListItem>
                    <ListItem>Disadvantages:</ListItem>
                    <ListItem className="ml-4">- Modifies input array</ListItem>
                    <ListItem className="ml-4">- More complex code</ListItem>
                  </List>
                </ListItem>
              </List>
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Typography variant="h3" className="text-lg font-semibold mb-2">
                  Performance Comparison:
                </Typography>
                <List type="unordered" className="space-y-2">
                  <ListItem>
                    XOR Method (Best Overall):
                    <List type="unordered" className="ml-4">
                      <ListItem>Time: O(n) - two passes</ListItem>
                      <ListItem>Space: O(1) - no extra space</ListItem>
                      <ListItem>Handles overflow ✓</ListItem>
                      <ListItem>Code complexity: Medium</ListItem>
                    </List>
                  </ListItem>
                  <ListItem>
                    Sum Formula:
                    <List type="unordered" className="ml-4">
                      <ListItem>Time: O(n) - one pass</ListItem>
                      <ListItem>Space: O(1) - no extra space</ListItem>
                      <ListItem>Overflow risk ⚠️</ListItem>
                      <ListItem>Code complexity: Low</ListItem>
                    </List>
                  </ListItem>
                  <ListItem>
                    Set Method:
                    <List type="unordered" className="ml-4">
                      <ListItem>Time: O(n) - two passes</ListItem>
                      <ListItem>Space: O(n) - stores set</ListItem>
                      <ListItem>Handles overflow ✓</ListItem>
                      <ListItem>Code complexity: Low</ListItem>
                    </List>
                  </ListItem>
                  <ListItem>
                    Cyclic Sort:
                    <List type="unordered" className="ml-4">
                      <ListItem>Time: O(n) - two passes</ListItem>
                      <ListItem>Space: O(1) - in-place</ListItem>
                      <ListItem>Handles overflow ✓</ListItem>
                      <ListItem>Code complexity: High</ListItem>
                    </List>
                  </ListItem>
                </List>
              </div>
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <Typography variant="h3" className="text-lg font-semibold mb-2">
                  Common Edge Cases & Pitfalls:
                </Typography>
                <List type="unordered" className="space-y-1">
                  <ListItem>Empty array: Invalid input</ListItem>
                  <ListItem>Single element: [0] → 1, [1] → 0</ListItem>
                  <ListItem>Missing first (0): [1,2,3] → 0</ListItem>
                  <ListItem>Missing last (n): [0,1,2] → 3</ListItem>
                  <ListItem>Duplicate numbers: Invalid input</ListItem>
                  <ListItem>Numbers out of range: Invalid input</ListItem>
                  <ListItem>
                    Large arrays: Consider overflow in sum method
                  </ListItem>
                  <ListItem>
                    Non-number inputs: Validate and handle errors
                  </ListItem>
                </List>
              </div>
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Typography variant="h3" className="text-lg font-semibold mb-2">
                  Interview Tips:
                </Typography>
                <List type="unordered" className="space-y-1">
                  <ListItem>
                    Start with the Set method - it&apos;s most intuitive
                  </ListItem>
                  <ListItem>
                    Optimize to Sum Formula - explain overflow risk
                  </ListItem>
                  <ListItem>
                    Finally present XOR - explain bit manipulation benefit
                  </ListItem>
                  <ListItem>Mention Cyclic Sort for similar problems</ListItem>
                  <ListItem>Always discuss input validation</ListItem>
                  <ListItem>Consider space/time complexity trade-offs</ListItem>
                </List>
              </div>
            </div>
          </div>
        </SectionBox>
      </div>
    </div>
  );
}
