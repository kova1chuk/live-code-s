"use client";
import { useState } from "react";
import FlattenArrayChallengeContent from "@/features/array-string-manipulation/flatten-array/components/FlattenArrayChallengeContent";
import FlattenArrayTestRunner from "@/features/array-string-manipulation/flatten-array/components/FlattenArrayTestRunner";
import data from "@/features/array-string-manipulation/flatten-array/data.json";

interface TestCase {
  input: (number | number[])[];
  expected: number[];
  description?: string;
}

export default function FlattenArray() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [code, setCode] = useState<string>(data.initialCode);

  const testCases = data.testCases.map((test) => ({
    ...test,
    input: test.input as (number | number[])[],
  })) as TestCase[];

  const flattenArray = (arr: (number | number[])[]): number[] => {
    return arr.reduce<number[]>((flat, item) => {
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
    <FlattenArrayChallengeContent
      title="Flatten Array"
      description="Write a function that takes a nested array as input and returns a flattened version of that array. The function should handle arrays nested to any depth and preserve the order of elements."
      examples={data.examples}
      testCases={testCases}
      solutions={data.solutions}
      initialCode={code}
      onCodeChange={setCode}
      TestRunner={FlattenArrayTestRunner}
      inputValue={input}
      onInputChange={setInput}
      onInputSubmit={handleSubmit}
      result={result}
      onExampleClick={handleExampleClick}
    />
  );
}
