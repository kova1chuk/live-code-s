"use client";
import { useState } from "react";
import SectionBox from "@/components/SectionBox";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Typography from "@/components/Typography";
import List, { ListItem } from "@/components/List";
import CodeBlock from "@/components/CodeBlock";
import ExampleRow from "@/components/ExampleRow";

export default function RemoveDuplicates() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number[]>([]);
  const [examples] = useState([
    { input: "1, 2, 2, 3, 3, 4, 5, 5", output: "[1, 2, 3, 4, 5]" },
    { input: "10, 10, 20, 20, 30", output: "[10, 20, 30]" },
    { input: "1, 1, 1, 1, 1", output: "[1]" },
  ]);

  const removeDuplicates = (nums: number[]) => {
    return [...new Set(nums)];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numbers = input
      .split(",")
      .map((num) => parseInt(num.trim()))
      .filter((num) => !isNaN(num));
    setResult(removeDuplicates(numbers));
  };

  const handleExampleClick = (example: { input: string; output: string }) => {
    setInput(example.input);
    const numbers = example.input.split(",").map((num) => parseInt(num.trim()));
    setResult(removeDuplicates(numbers));
  };

  const jsSolution = `// Method 1: Using Set
function removeDuplicates(nums) {
  return [...new Set(nums)];
}

// Method 2: Using filter
function removeDuplicates(nums) {
  return nums.filter((num, index) => 
    nums.indexOf(num) === index
  );
}

// Method 3: Using reduce
function removeDuplicates(nums) {
  return nums.reduce((unique, num) => 
    unique.includes(num) ? unique : [...unique, num], 
  []);
}`;

  const tsSolution = `// Method 1: Using Set
function removeDuplicates(nums: number[]): number[] {
  return [...new Set(nums)];
}

// Method 2: Using filter
function removeDuplicates(nums: number[]): number[] {
  return nums.filter((num, index) => 
    nums.indexOf(num) === index
  );
}

// Method 3: Using reduce
function removeDuplicates(nums: number[]): number[] {
  return nums.reduce((unique: number[], num: number) => 
    unique.includes(num) ? unique : [...unique, num], 
  []);
}`;

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <Typography
        variant="h2"
        className="mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold"
      >
        Remove Duplicates from Array
      </Typography>

      <div className="space-y-6 sm:space-y-8">
        <SectionBox title="Problem Description">
          <div className="space-y-4">
            <Typography className="text-base sm:text-lg">
              Given an array of numbers, write a function that removes all
              duplicates and returns a new array containing only unique values
              in the order they first appeared.
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
                  label="Enter numbers (comma-separated):"
                  value={input}
                  onChange={setInput}
                  placeholder="1, 2, 2, 3, 3, 4, 5, 5"
                />
              </div>
              <Button type="submit" className="w-full sm:w-auto">
                Remove Duplicates
              </Button>
            </form>
            {result.length > 0 && (
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <Typography variant="h3" className="text-lg font-semibold mb-2">
                  Result:
                </Typography>
                <Typography className="text-base sm:text-lg">
                  [{result.join(", ")}]
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
                  Using Set (Method 1):
                  <List type="unordered" className="ml-4 mt-2">
                    <ListItem>
                      Create a Set from the array (automatically removes
                      duplicates)
                    </ListItem>
                    <ListItem>
                      Convert back to array using spread operator
                    </ListItem>
                  </List>
                </ListItem>
                <ListItem>
                  Using filter (Method 2):
                  <List type="unordered" className="ml-4 mt-2">
                    <ListItem>
                      Keep only elements where their current index matches their
                      first occurrence
                    </ListItem>
                    <ListItem>
                      Preserves the original order of elements
                    </ListItem>
                  </List>
                </ListItem>
                <ListItem>
                  Using reduce (Method 3):
                  <List type="unordered" className="ml-4 mt-2">
                    <ListItem>
                      Build a new array by adding elements only if they
                      don&apos;t exist yet
                    </ListItem>
                    <ListItem>
                      Maintains order while ensuring uniqueness
                    </ListItem>
                  </List>
                </ListItem>
              </List>
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Typography variant="h3" className="text-lg font-semibold mb-2">
                  Time & Space Complexity:
                </Typography>
                <List type="unordered" className="space-y-1">
                  <ListItem>
                    Method 1 (Set):
                    <List type="unordered" className="ml-4">
                      <ListItem>
                        <Typography variant="code">
                          Time Complexity: O(n)
                        </Typography>{" "}
                        - Single pass through array
                      </ListItem>
                      <ListItem>
                        <Typography variant="code">
                          Space Complexity: O(n)
                        </Typography>{" "}
                        - For storing unique elements
                      </ListItem>
                    </List>
                  </ListItem>
                  <ListItem>
                    Method 2 (filter) and Method 3 (reduce):
                    <List type="unordered" className="ml-4">
                      <ListItem>
                        <Typography variant="code">
                          Time Complexity: O(n²)
                        </Typography>{" "}
                        - Due to includes/indexOf operations
                      </ListItem>
                      <ListItem>
                        <Typography variant="code">
                          Space Complexity: O(n)
                        </Typography>{" "}
                        - For storing unique elements
                      </ListItem>
                    </List>
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
