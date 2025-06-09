"use client";
import { useState } from "react";
import ChallengeContent from "@/components/ChallengeContent";

const description =
  "Implement a stack data structure using arrays with the following operations: push, pop, peek, and isEmpty.";

const examples = [
  {
    input: "push(1), push(2), pop()",
    output: "2",
  },
  {
    input: "push(3), peek()",
    output: "3",
  },
  {
    input: "pop() on empty stack",
    output: "Stack is empty",
  },
];

const testCases = [
  { input: "push(1); push(2); pop();", expected: "2" },
  { input: "push(3); peek();", expected: "3" },
  { input: "pop();", expected: "Stack is empty" },
];

const solutions = [
  {
    id: "array",
    label: "Array Implementation",
    description: "Use a JavaScript array to implement stack operations.",
    complexity: { time: "O(1)", space: "O(n)" },
    howItWorks: [
      "Use array's push and pop methods for stack operations.",
      "peek returns the last element.",
      "isEmpty checks if array length is zero.",
    ],
    advantages: ["Simple and efficient.", "Built-in methods are optimized."],
    disadvantages: ["Limited to array size.", "No built-in max size."],
    jsCode: `class Stack {
  constructor() {
    this.items = [];
  }
  push(element) {
    this.items.push(element);
  }
  pop() {
    if (this.isEmpty()) return "Stack is empty";
    return this.items.pop();
  }
  peek() {
    if (this.isEmpty()) return "Stack is empty";
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.items.length === 0;
  }
}`,
    tsCode: `class Stack<T> {
  private items: T[] = [];
  push(element: T): void {
    this.items.push(element);
  }
  pop(): T | string {
    if (this.isEmpty()) return "Stack is empty";
    return this.items.pop()!;
  }
  peek(): T | string {
    if (this.isEmpty()) return "Stack is empty";
    return this.items[this.items.length - 1];
  }
  isEmpty(): boolean {
    return this.items.length === 0;
  }
}`,
  },
];

const initialCode = `class Stack {
  constructor() {
    this.items = [];
  }
  // Implement push, pop, peek, isEmpty
}`;

function StackTestRunner() {
  // Placeholder for a real test runner
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded mt-4">
      <p className="text-gray-700 dark:text-gray-200">
        Test runner coming soon!
      </p>
    </div>
  );
}

export default function StackPage() {
  const [userCode, setUserCode] = useState(initialCode);
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<string | null>(null);

  return (
    <ChallengeContent
      title="Stack"
      description={description}
      examples={examples}
      testCases={testCases}
      solutions={solutions}
      initialCode={userCode}
      onCodeChange={setUserCode}
      TestRunner={StackTestRunner}
      inputValue={inputValue}
      onInputChange={setInputValue}
      onInputSubmit={(e) => {
        e.preventDefault();
        setResult("Custom input evaluation coming soon!");
      }}
      result={result || ""}
      onExampleClick={(example) => setInputValue(example.input)}
      inputLabel="Enter stack operations (e.g. push(1), pop()):"
      inputPlaceholder="e.g. push(5), peek()"
      submitButtonText="Run Stack"
    />
  );
}
