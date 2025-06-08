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
  const [result, setResult] = useState("");
  const [examples] = useState([
    { input: "[1, [2, 3], [4, [5, 6]]]", output: "[1, 2, 3, 4, 5, 6]" },
    { input: "[[1, 2], [3, 4], 5]", output: "[1, 2, 3, 4, 5]" },
    { input: "[1, [2, [3, [4]]]]", output: "[1, 2, 3, 4]" },
  ]);

  type NestedArray<T> = Array<T | NestedArray<T>>;

  const flattenArray = <T,>(arr: NestedArray<T>): T[] => {
    return arr.reduce<T[]>((flat, item) => {
      return flat.concat(Array.isArray(item) ? flattenArray(item) : item);
    }, []);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const inputArray = JSON.parse(input);
      if (!Array.isArray(inputArray)) {
        throw new Error("Input must be an array");
      }
      setResult(JSON.stringify(flattenArray(inputArray)));
    } catch {
      setResult("Invalid input. Please enter a valid array.");
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
        Flatten Array
      </Typography>

      <div className="space-y-6 sm:space-y-8">
        <SectionBox title="Problem Description">
          <div className="space-y-4">
            <Typography className="text-base sm:text-lg">
              Write a function that takes a nested array as input and returns a
              flattened version of that array. The function should handle arrays
              nested to any depth and preserve the order of elements.
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
                  label="Enter a nested array:"
                  value={input}
                  onChange={setInput}
                  placeholder="e.g. [1, [2, 3], [4, [5, 6]]]"
                />
              </div>
              <Button type="submit" className="w-full sm:w-auto">
                Flatten Array
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
              Here are four different approaches to flatten a nested array, each
              with its own advantages:
            </Typography>
          </div>
        </SectionBox>

        <SectionBox title="Method 1: Reduce with Recursion">
          <div className="space-y-6">
            <div className="space-y-4">
              <Typography className="text-base sm:text-lg">
                This method uses reduce and recursion to flatten the array:
              </Typography>
              <CodeBlock
                jsCode={`function flattenArray(arr) {
  return arr.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) ? flattenArray(item) : item);
  }, []);
}`}
                tsCode={`function flattenArray<T>(arr: (T | T[])[]): T[] {
  return arr.reduce<T[]>((flat, item) => {
    return flat.concat(Array.isArray(item) ? flattenArray(item) : item);
  }, []);
}`}
              />
            </div>
            <div className="space-y-4">
              <List type="unordered" className="space-y-2">
                <ListItem>Use reduce to concatenate items</ListItem>
                <ListItem>Recursively flatten nested arrays</ListItem>
                <ListItem>Concatenate with accumulator</ListItem>
              </List>
            </div>
          </div>
        </SectionBox>

        <SectionBox title="Method 2: Using Array.flat">
          <div className="space-y-6">
            <div className="space-y-4">
              <Typography className="text-base sm:text-lg">
                This method uses the built-in flat method with Infinity depth:
              </Typography>
              <CodeBlock
                jsCode={`function flattenArray(arr) {
  return arr.flat(Infinity);
}`}
                tsCode={`function flattenArray<T>(arr: (T | T[])[]): T[] {
  return arr.flat(Infinity) as T[];
}`}
              />
            </div>
            <div className="space-y-4">
              <List type="unordered" className="space-y-2">
                <ListItem>Use built-in flat method</ListItem>
                <ListItem>Pass Infinity as depth</ListItem>
              </List>
            </div>
          </div>
        </SectionBox>

        <SectionBox title="Method 3: Stack-based Approach">
          <div className="space-y-6">
            <div className="space-y-4">
              <Typography className="text-base sm:text-lg">
                This method uses a stack for an iterative solution:
              </Typography>
              <CodeBlock
                jsCode={`function flattenArray(arr) {
  const stack = [...arr];
  const result = [];
  
  while (stack.length) {
    const next = stack.pop();
    if (Array.isArray(next)) {
      stack.push(...next);
    } else {
      result.unshift(next);
    }
  }
  
  return result;
}`}
                tsCode={`function flattenArray<T>(arr: (T | T[])[]): T[] {
  const stack = [...arr];
  const result: T[] = [];
  
  while (stack.length) {
    const next = stack.pop();
    if (Array.isArray(next)) {
      stack.push(...next);
    } else {
      result.unshift(next);
    }
  }
  
  return result;
}`}
              />
            </div>
            <div className="space-y-4">
              <List type="unordered" className="space-y-2">
                <ListItem>Use stack for iterative approach</ListItem>
                <ListItem>Push nested arrays onto stack</ListItem>
                <ListItem>Build result array in order</ListItem>
              </List>
            </div>
          </div>
        </SectionBox>

        <SectionBox title="Method 4: Generator Function">
          <div className="space-y-6">
            <div className="space-y-4">
              <Typography className="text-base sm:text-lg">
                This method uses a generator function for lazy evaluation:
              </Typography>
              <CodeBlock
                jsCode={`function* flattenGenerator(arr) {
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
}`}
                tsCode={`function* flattenGenerator<T>(arr: (T | T[])[]): Generator<T> {
  for (const item of arr) {
    if (Array.isArray(item)) {
      yield* flattenGenerator(item);
    } else {
      yield item as T;
    }
  }
}

function flattenArray<T>(arr: (T | T[])[]): T[] {
  return [...flattenGenerator(arr)];
}`}
              />
            </div>
            <div className="space-y-4">
              <List type="unordered" className="space-y-2">
                <ListItem>Use generator function</ListItem>
                <ListItem>Yield values recursively</ListItem>
                <ListItem>Spread result into array</ListItem>
              </List>
            </div>
          </div>
        </SectionBox>
      </div>
    </div>
  );
}
