"use client";
import { useState } from "react";
import ChallengeContent from "@/components/ChallengeContent";
import StringTestRunner from "@/features/array-string-manipulation/components/StringTestRunner";
import data from "@/features/array-string-manipulation/reverse-string/data.json";

export default function ReverseString() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const reverseString = (str: string) => {
    return str.split("").reverse().join("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(reverseString(input));
  };

  const handleExampleClick = (example: { input: string; output: string }) => {
    setInput(example.input);
    setResult(example.output);
  };

  return (
    <ChallengeContent
      title="Reverse a String"
      description="Write a function that takes a string as input and returns the string with its characters reversed. The function should maintain the order of characters but reverse their sequence."
      examples={data.examples}
      testCases={data.testCases}
      solutions={data.solutions}
      initialCode={data.initialCode}
      onCodeChange={() => {}}
      TestRunner={StringTestRunner}
      inputValue={input}
      onInputChange={setInput}
      onInputSubmit={handleSubmit}
      result={result}
      onExampleClick={handleExampleClick}
      inputLabel="Enter a string:"
      inputPlaceholder="Enter a string to reverse"
      submitButtonText="Reverse String"
    />
  );
}
