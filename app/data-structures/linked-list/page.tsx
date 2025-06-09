"use client";
import { useState } from "react";
import ChallengeContent from "@/components/ChallengeContent";

const description =
  "Implement a singly linked list with basic operations: insert, delete, search, and reverse.";

const examples = [
  {
    input: "insert(1), insert(2), insert(3)",
    output: "1 -> 2 -> 3 -> null",
  },
  {
    input: "delete(2)",
    output: "1 -> 3 -> null",
  },
  {
    input: "reverse()",
    output: "3 -> 1 -> null",
  },
];

const testCases = [
  {
    input: "insert(1); insert(2); insert(3);",
    expected: "1 -> 2 -> 3 -> null",
  },
  { input: "delete(2);", expected: "1 -> 3 -> null" },
  { input: "reverse();", expected: "3 -> 1 -> null" },
];

const solutions = [
  {
    id: "singly-linked",
    label: "Singly Linked List Implementation",
    description: "Implement a singly linked list with basic operations.",
    complexity: {
      time: "O(n) for search/delete, O(1) for insert",
      space: "O(n)",
    },
    howItWorks: [
      "Each node contains data and a reference to the next node.",
      "Insert operations add nodes at the beginning for O(1) time.",
      "Search and delete operations require traversing the list.",
      "Reverse operation changes the direction of all pointers.",
    ],
    advantages: [
      "Dynamic size - no need to pre-allocate space.",
      "Efficient insertions and deletions at the beginning.",
    ],
    disadvantages: [
      "No random access - must traverse from the beginning.",
      "Extra space for node references.",
    ],
    jsCode: `class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insert(val) {
    const newNode = new ListNode(val);
    newNode.next = this.head;
    this.head = newNode;
  }

  delete(val) {
    if (!this.head) return;
    if (this.head.val === val) {
      this.head = this.head.next;
      return;
    }
    let current = this.head;
    while (current.next && current.next.val !== val) {
      current = current.next;
    }
    if (current.next) {
      current.next = current.next.next;
    }
  }

  search(val) {
    let current = this.head;
    while (current) {
      if (current.val === val) return true;
      current = current.next;
    }
    return false;
  }

  reverse() {
    let prev = null;
    let current = this.head;
    while (current) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    this.head = prev;
  }
}`,
    tsCode: `class ListNode<T> {
  val: T;
  next: ListNode<T> | null;
  
  constructor(val: T) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList<T> {
  private head: ListNode<T> | null;
  
  constructor() {
    this.head = null;
  }

  insert(val: T): void {
    const newNode = new ListNode(val);
    newNode.next = this.head;
    this.head = newNode;
  }

  delete(val: T): void {
    if (!this.head) return;
    if (this.head.val === val) {
      this.head = this.head.next;
      return;
    }
    let current = this.head;
    while (current.next && current.next.val !== val) {
      current = current.next;
    }
    if (current.next) {
      current.next = current.next.next;
    }
  }

  search(val: T): boolean {
    let current = this.head;
    while (current) {
      if (current.val === val) return true;
      current = current.next;
    }
    return false;
  }

  reverse(): void {
    let prev: ListNode<T> | null = null;
    let current = this.head;
    while (current) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    this.head = prev;
  }
}`,
  },
];

const initialCode = `class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  // Implement insert, delete, search, and reverse methods
}`;

function LinkedListTestRunner() {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded mt-4">
      <p className="text-gray-700 dark:text-gray-200">
        Test runner coming soon!
      </p>
    </div>
  );
}

export default function LinkedListPage() {
  const [userCode, setUserCode] = useState(initialCode);
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<string | null>(null);

  return (
    <ChallengeContent
      title="Linked List"
      description={description}
      examples={examples}
      testCases={testCases}
      solutions={solutions}
      initialCode={userCode}
      onCodeChange={setUserCode}
      TestRunner={LinkedListTestRunner}
      inputValue={inputValue}
      onInputChange={setInputValue}
      onInputSubmit={(e) => {
        e.preventDefault();
        setResult("Custom input evaluation coming soon!");
      }}
      result={result || ""}
      onExampleClick={(example) => setInputValue(example.input)}
      inputLabel="Enter linked list operations (e.g. insert(1), delete(2)):"
      inputPlaceholder="e.g. insert(5), reverse()"
      submitButtonText="Run Operations"
    />
  );
}
