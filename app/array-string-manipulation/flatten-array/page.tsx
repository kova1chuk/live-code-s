"use client";
import { useState } from "react";
import SectionBox from "@/components/SectionBox";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Typography from "@/components/Typography";
import List, { ListItem } from "@/components/List";
import CodeBlock from "@/components/CodeBlock";
import ExampleRow from "@/components/ExampleRow";

export default function FlattenArray() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number[]>([]);
  const [error, setError] = useState("");
  const [examples] = useState([
    {
      input: "[1, [2, 3], [4, [5, 6]]]",
      output: "[1, 2, 3, 4, 5, 6]",
    },
    {
      input: "[[1, 2], [3, 4], [5, [6, 7, [8, 9]]]]",
      output: "[1, 2, 3, 4, 5, 6, 7, 8, 9]",
    },
    {
      input: "[1, 2, 3, 4, 5]",
      output: "[1, 2, 3, 4, 5]",
    },
  ]);

  type NestedArray = (number | NestedArray)[];

  const flattenArray = (arr: NestedArray): number[] => {
    return arr.reduce((flat: number[], item: number | NestedArray) => {
      return flat.concat(Array.isArray(item) ? flattenArray(item) : item);
    }, []);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const array = JSON.parse(input);
      if (!Array.isArray(array)) {
        throw new Error("Input must be an array");
      }
      setResult(flattenArray(array));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Please enter a valid JSON array"
      );
    }
  };

  const handleExampleClick = (example: { input: string; output: string }) => {
    setInput(example.input);
    try {
      const array = JSON.parse(example.input);
      setResult(flattenArray(array));
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error processing example");
    }
  };

  const jsSolution = `// Method 1: Using reduce and recursion
function flattenArray(arr) {
  return arr.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) ? flattenArray(item) : item);
  }, []);
}

// Method 2: Using flat() method (ES2019+)
function flattenArray(arr) {
  return arr.flat(Infinity);
}

// Method 3: Using stack (iterative approach)
function flattenArray(arr) {
  const stack = [...arr];
  const result = [];
  
  while (stack.length) {
    const item = stack.pop();
    if (Array.isArray(item)) {
      stack.push(...item);
    } else {
      result.unshift(item);
    }
  }
  
  return result;
}

// Method 4: Using generator function
function* flattenGenerator(arr) {
  for (const item of arr) {
    if (Array.isArray(item)) {
      yield* flattenGenerator(item);
    } else {
      yield item;
    }
  }
}

function flattenArray(arr) {
  return [...flattenGenerator(arr)];
}`;

  const tsSolution = `// Method 1: Using reduce and recursion
function flattenArray(arr: any[]): number[] {
  return arr.reduce((flat: number[], item: any) => {
    return flat.concat(Array.isArray(item) ? flattenArray(item) : item);
  }, []);
}

// Method 2: Using flat() method (ES2019+)
function flattenArray(arr: any[]): number[] {
  return arr.flat(Infinity);
}

// Method 3: Using stack (iterative approach)
function flattenArray(arr: any[]): number[] {
  const stack: any[] = [...arr];
  const result: number[] = [];
  
  while (stack.length) {
    const item = stack.pop();
    if (Array.isArray(item)) {
      stack.push(...item);
    } else {
      result.unshift(item);
    }
  }
  
  return result;
}

// Method 4: Using generator function
function* flattenGenerator(arr: any[]): Generator<number> {
  for (const item of arr) {
    if (Array.isArray(item)) {
      yield* flattenGenerator(item);
    } else {
      yield item;
    }
  }
}

function flattenArray(arr: any[]): number[] {
  return [...flattenGenerator(arr)];
}`;

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <Typography
        variant="h2"
        className="mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold"
      >
        Flatten Nested Array
      </Typography>

      <div className="space-y-6 sm:space-y-8">
        <SectionBox title="Problem Description">
          <div className="space-y-4">
            <Typography className="text-base sm:text-lg">
              Write a function that takes a nested array of numbers as input and
              returns a flattened version of that array. The input array can
              have multiple levels of nesting, and the output should be a
              single-level array containing all the numbers in the order they
              appear.
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
                  label="Enter nested array (JSON format):"
                  value={input}
                  onChange={setInput}
                  placeholder="[1, [2, 3], [4, [5, 6]]]"
                />
              </div>
              <Button type="submit" className="w-full sm:w-auto">
                Flatten Array
              </Button>
            </form>
            {error && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
                <Typography>{error}</Typography>
              </div>
            )}
            {result.length > 0 && !error && (
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
              <CodeBlock jsCode={jsSolution} tsCode={tsSolution} />
            </div>
            <div className="space-y-4">
              <Typography variant="h3" className="text-lg font-semibold">
                Explanation:
              </Typography>
              <List type="ordered" className="space-y-2">
                <ListItem>
                  Method 1 (Using reduce and recursion):
                  <List type="unordered" className="ml-4 mt-2">
                    <ListItem>Use reduce to build the flattened array</ListItem>
                    <ListItem>
                      For each item, check if it&apos;s an array
                    </ListItem>
                    <ListItem>If it is, recursively flatten it</ListItem>
                    <ListItem>If not, add it to the result</ListItem>
                  </List>
                </ListItem>
                <ListItem>
                  Method 2 (Using flat()):
                  <List type="unordered" className="ml-4 mt-2">
                    <ListItem>Use the built-in flat() method</ListItem>
                    <ListItem>
                      Pass Infinity to flatten all nested levels
                    </ListItem>
                    <ListItem>
                      Simple but only available in modern browsers
                    </ListItem>
                  </List>
                </ListItem>
                <ListItem>
                  Method 3 (Using stack):
                  <List type="unordered" className="ml-4 mt-2">
                    <ListItem>
                      Use a stack to handle nested arrays iteratively
                    </ListItem>
                    <ListItem>
                      Pop items from stack and check if they&apos;re arrays
                    </ListItem>
                    <ListItem>If array, push its elements to stack</ListItem>
                    <ListItem>If not, add to result</ListItem>
                  </List>
                </ListItem>
                <ListItem>
                  Method 4 (Using generator):
                  <List type="unordered" className="ml-4 mt-2">
                    <ListItem>
                      Use a generator function to yield values
                    </ListItem>
                    <ListItem>Recursively yield from nested arrays</ListItem>
                    <ListItem>
                      Spread the generator result into an array
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
                    Methods 1 & 2 (Recursive & flat()):
                    <List type="unordered" className="ml-4">
                      <ListItem>
                        <Typography variant="code">
                          Time Complexity: O(n)
                        </Typography>{" "}
                        - Visit each element once
                      </ListItem>
                      <ListItem>
                        <Typography variant="code">
                          Space Complexity: O(d)
                        </Typography>{" "}
                        - Where d is the maximum depth of nesting
                      </ListItem>
                    </List>
                  </ListItem>
                  <ListItem>
                    Method 3 (Stack):
                    <List type="unordered" className="ml-4">
                      <ListItem>
                        <Typography variant="code">
                          Time Complexity: O(n)
                        </Typography>{" "}
                        - Process each element once
                      </ListItem>
                      <ListItem>
                        <Typography variant="code">
                          Space Complexity: O(n)
                        </Typography>{" "}
                        - For the stack and result array
                      </ListItem>
                    </List>
                  </ListItem>
                  <ListItem>
                    Method 4 (Generator):
                    <List type="unordered" className="ml-4">
                      <ListItem>
                        <Typography variant="code">
                          Time Complexity: O(n)
                        </Typography>{" "}
                        - Yield each element once
                      </ListItem>
                      <ListItem>
                        <Typography variant="code">
                          Space Complexity: O(d)
                        </Typography>{" "}
                        - Where d is the maximum depth of nesting
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
