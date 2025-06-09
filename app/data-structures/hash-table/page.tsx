"use client";
import { useState } from "react";
import ChallengeContent from "@/components/ChallengeContent";

const description =
  "Implement a hash table with basic operations: put, get, remove, and collision handling using chaining.";

const examples = [
  {
    input: "put('key1', 'value1'), put('key2', 'value2')",
    output: "HashTable: { key1: 'value1', key2: 'value2' }",
  },
  {
    input: "get('key1')",
    output: "value1",
  },
  {
    input: "remove('key1')",
    output: "true",
  },
];

const testCases = [
  {
    input: "put('key1', 'value1'); put('key2', 'value2');",
    expected: "HashTable: { key1: 'value1', key2: 'value2' }",
  },
  { input: "get('key1');", expected: "value1" },
  { input: "remove('key1');", expected: "true" },
];

const solutions = [
  {
    id: "hash-table",
    label: "Hash Table Implementation",
    description:
      "Implement a hash table with chaining for collision resolution.",
    complexity: { time: "O(1) average case, O(n) worst case", space: "O(n)" },
    howItWorks: [
      "Use an array of linked lists to store key-value pairs.",
      "Hash function maps keys to array indices.",
      "Chaining handles collisions by storing multiple items at the same index.",
      "Load factor determines when to resize the table.",
    ],
    advantages: [
      "Fast average case operations.",
      "Handles collisions gracefully.",
    ],
    disadvantages: [
      "Worst case can degrade to O(n).",
      "Extra space for collision chains.",
    ],
    jsCode: `class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  _hash(key) {
    let total = 0;
    const WEIRD_PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      const char = key[i];
      const value = char.charCodeAt(0) - 96;
      total = (total * WEIRD_PRIME + value) % this.keyMap.length;
    }
    return total;
  }

  put(key, value) {
    const index = this._hash(key);
    if (!this.keyMap[index]) {
      this.keyMap[index] = [];
    }
    this.keyMap[index].push([key, value]);
  }

  get(key) {
    const index = this._hash(key);
    if (this.keyMap[index]) {
      for (let i = 0; i < this.keyMap[index].length; i++) {
        if (this.keyMap[index][i][0] === key) {
          return this.keyMap[index][i][1];
        }
      }
    }
    return undefined;
  }

  remove(key) {
    const index = this._hash(key);
    if (this.keyMap[index]) {
      for (let i = 0; i < this.keyMap[index].length; i++) {
        if (this.keyMap[index][i][0] === key) {
          this.keyMap[index].splice(i, 1);
          return true;
        }
      }
    }
    return false;
  }
}`,
    tsCode: `class HashTable<K, V> {
  private keyMap: [K, V][][];
  private size: number;

  constructor(size: number = 53) {
    this.keyMap = new Array(size);
    this.size = size;
  }

  private _hash(key: K): number {
    const str = String(key);
    let total = 0;
    const WEIRD_PRIME = 31;
    for (let i = 0; i < Math.min(str.length, 100); i++) {
      const char = str[i];
      const value = char.charCodeAt(0) - 96;
      total = (total * WEIRD_PRIME + value) % this.size;
    }
    return total;
  }

  put(key: K, value: V): void {
    const index = this._hash(key);
    if (!this.keyMap[index]) {
      this.keyMap[index] = [];
    }
    this.keyMap[index].push([key, value]);
  }

  get(key: K): V | undefined {
    const index = this._hash(key);
    if (this.keyMap[index]) {
      for (let i = 0; i < this.keyMap[index].length; i++) {
        if (this.keyMap[index][i][0] === key) {
          return this.keyMap[index][i][1];
        }
      }
    }
    return undefined;
  }

  remove(key: K): boolean {
    const index = this._hash(key);
    if (this.keyMap[index]) {
      for (let i = 0; i < this.keyMap[index].length; i++) {
        if (this.keyMap[index][i][0] === key) {
          this.keyMap[index].splice(i, 1);
          return true;
        }
      }
    }
    return false;
  }
}`,
  },
];

const initialCode = `class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }
  // Implement _hash, put, get, and remove methods
}`;

function HashTableTestRunner() {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded mt-4">
      <p className="text-gray-700 dark:text-gray-200">
        Test runner coming soon!
      </p>
    </div>
  );
}

export default function HashTablePage() {
  const [userCode, setUserCode] = useState(initialCode);
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<string | null>(null);

  return (
    <ChallengeContent
      title="Hash Table"
      description={description}
      examples={examples}
      testCases={testCases}
      solutions={solutions}
      initialCode={userCode}
      onCodeChange={setUserCode}
      TestRunner={HashTableTestRunner}
      inputValue={inputValue}
      onInputChange={setInputValue}
      onInputSubmit={(e) => {
        e.preventDefault();
        setResult("Custom input evaluation coming soon!");
      }}
      result={result || ""}
      onExampleClick={(example) => setInputValue(example.input)}
      inputLabel="Enter hash table operations (e.g. put('key', 'value'), get('key')):"
      inputPlaceholder="e.g. put('name', 'John'), get('name')"
      submitButtonText="Run Operations"
    />
  );
}
