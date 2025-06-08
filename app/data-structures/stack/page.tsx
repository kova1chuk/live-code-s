'use client';
import { useState } from 'react';

export default function Stack() {
  const [stack, setStack] = useState<number[]>([]);
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const push = (value: number) => {
    setStack(prev => [...prev, value]);
    setResult(`Pushed ${value} to stack`);
  };

  const pop = () => {
    if (stack.length === 0) {
      setResult('Stack is empty');
      return;
    }
    const value = stack[stack.length - 1];
    setStack(prev => prev.slice(0, -1));
    setResult(`Popped ${value} from stack`);
  };

  const peek = () => {
    if (stack.length === 0) {
      setResult('Stack is empty');
      return;
    }
    setResult(`Top element: ${stack[stack.length - 1]}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseInt(input);
    if (!isNaN(value)) {
      push(value);
      setInput('');
    }
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Implement a Stack using Arrays</h1>
        
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
            <p className="mb-4">
              Implement a stack data structure using arrays with the following operations:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>push: Add an element to the top of the stack</li>
              <li>pop: Remove and return the top element from the stack</li>
              <li>peek: Return the top element without removing it</li>
              <li>isEmpty: Check if the stack is empty</li>
            </ul>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Try it out</h2>
            <div className="space-y-4">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="number"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Enter a number to push"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Push
                </button>
              </form>

              <div className="flex gap-2">
                <button
                  onClick={pop}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Pop
                </button>
                <button
                  onClick={peek}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                  Peek
                </button>
              </div>

              {result && (
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <p className="font-semibold">Result:</p>
                  <p>{result}</p>
                </div>
              )}

              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                <p className="font-semibold">Current Stack:</p>
                <div className="flex flex-col-reverse items-center gap-2 mt-2">
                  {stack.map((value, index) => (
                    <div
                      key={index}
                      className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center rounded"
                    >
                      {value}
                    </div>
                  ))}
                  {stack.length === 0 && (
                    <p className="text-gray-500">Stack is empty</p>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Solution</h2>
            <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-x-auto">
              <code>{`class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }

  pop() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.items.pop();
  }

  peek() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}`}</code>
            </pre>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Implementation using Array:
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Use array's built-in push() and pop() methods</li>
                    <li>Time Complexity: O(1) for all operations</li>
                    <li>Space Complexity: O(n) where n is the number of elements</li>
                  </ul>
                </li>
                <li>Key Operations:
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>push: Adds element to the end of array</li>
                    <li>pop: Removes and returns last element</li>
                    <li>peek: Returns last element without removing</li>
                    <li>isEmpty: Checks if array is empty</li>
                  </ul>
                </li>
              </ol>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 