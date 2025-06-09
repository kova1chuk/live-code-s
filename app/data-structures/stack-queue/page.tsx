"use client";
import { useState } from "react";
import ChallengeContent from "@/components/ChallengeContent";

const description =
  "Compare and implement both stack and queue data structures, understanding their differences and use cases.";

const examples = [
  {
    input: "Stack: push(1), push(2), pop()",
    output: "2",
  },
  {
    input: "Queue: enqueue(1), enqueue(2), dequeue()",
    output: "1",
  },
  {
    input: "Compare LIFO vs FIFO",
    output: "Stack: Last In First Out\nQueue: First In First Out",
  },
];

const testCases = [
  { input: "Stack: push(1); push(2); pop();", expected: "2" },
  { input: "Queue: enqueue(1); enqueue(2); dequeue();", expected: "1" },
  { input: "Compare: Stack vs Queue", expected: "Stack: LIFO\nQueue: FIFO" },
];

const solutions = [
  {
    id: "stack-queue",
    label: "Stack and Queue Implementation",
    description:
      "Implement both stack and queue data structures and compare their operations.",
    complexity: { time: "O(1) for all operations", space: "O(n)" },
    howItWorks: [
      "Stack: Last In First Out (LIFO) - elements are added and removed from the same end.",
      "Queue: First In First Out (FIFO) - elements are added at one end and removed from the other.",
      "Both can be implemented using arrays or linked lists.",
      "Stack operations: push (add), pop (remove), peek (view top).",
      "Queue operations: enqueue (add), dequeue (remove), peek (view front).",
    ],
    advantages: [
      "Simple to implement and understand.",
      "Efficient operations with O(1) time complexity.",
      "Widely used in many algorithms and applications.",
    ],
    disadvantages: [
      "Limited access to elements (only top/front).",
      "Fixed size if using array implementation.",
    ],
    jsCode: `// Stack Implementation
class Stack {
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
}

// Queue Implementation
class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
    if (this.isEmpty()) return "Queue is empty";
    return this.items.shift();
  }

  peek() {
    if (this.isEmpty()) return "Queue is empty";
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}`,
    tsCode: `// Stack Implementation
class Stack<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

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
}

// Queue Implementation
class Queue<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  enqueue(element: T): void {
    this.items.push(element);
  }

  dequeue(): T | string {
    if (this.isEmpty()) return "Queue is empty";
    return this.items.shift()!;
  }

  peek(): T | string {
    if (this.isEmpty()) return "Queue is empty";
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}`,
  },
];

const initialCode = `// Stack Implementation
class Stack {
  constructor() {
    this.items = [];
  }
  // Implement push, pop, peek, and isEmpty methods
}

// Queue Implementation
class Queue {
  constructor() {
    this.items = [];
  }
  // Implement enqueue, dequeue, peek, and isEmpty methods
}`;

function StackQueueTestRunner() {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded mt-4">
      <p className="text-gray-700 dark:text-gray-200">
        Test runner coming soon!
      </p>
    </div>
  );
}

export default function StackQueuePage() {
  const [userCode, setUserCode] = useState(initialCode);
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<string | null>(null);

  return (
    <ChallengeContent
      title="Stack & Queue"
      description={description}
      examples={examples}
      testCases={testCases}
      solutions={solutions}
      initialCode={userCode}
      onCodeChange={setUserCode}
      TestRunner={StackQueueTestRunner}
      inputValue={inputValue}
      onInputChange={setInputValue}
      onInputSubmit={(e) => {
        e.preventDefault();
        setResult("Custom input evaluation coming soon!");
      }}
      result={result || ""}
      onExampleClick={(example) => setInputValue(example.input)}
      inputLabel="Enter operations (e.g. Stack: push(1), Queue: enqueue(1)):"
      inputPlaceholder="e.g. Stack: pop(), Queue: dequeue()"
      submitButtonText="Run Operations"
    />
  );
}
