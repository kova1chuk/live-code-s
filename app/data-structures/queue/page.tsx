'use client';
import { useState } from 'react';

export default function Queue() {
  const [inputStack, setInputStack] = useState<number[]>([]);
  const [outputStack, setOutputStack] = useState<number[]>([]);
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const enqueue = (value: number) => {
    setInputStack(prev => [...prev, value]);
    setResult(`Enqueued ${value}`);
  };

  const dequeue = () => {
    if (inputStack.length === 0 && outputStack.length === 0) {
      setResult('Queue is empty');
      return;
    }

    if (outputStack.length === 0) {
      // Transfer all elements from input stack to output stack
      const newOutputStack = [...inputStack].reverse();
      setOutputStack(newOutputStack);
      setInputStack([]);
      
      const value = newOutputStack[newOutputStack.length - 1];
      setOutputStack(prev => prev.slice(0, -1));
      setResult(`Dequeued ${value}`);
    } else {
      const value = outputStack[outputStack.length - 1];
      setOutputStack(prev => prev.slice(0, -1));
      setResult(`Dequeued ${value}`);
    }
  };

  const peek = () => {
    if (inputStack.length === 0 && outputStack.length === 0) {
      setResult('Queue is empty');
      return;
    }

    if (outputStack.length === 0) {
      setResult(`Front element: ${inputStack[0]}`);
    } else {
      setResult(`Front element: ${outputStack[outputStack.length - 1]}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseInt(input);
    if (!isNaN(value)) {
      enqueue(value);
      setInput('');
    }
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Implement a Queue using Two Stacks</h1>
        
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
            <p className="mb-4">
              Implement a queue data structure using two stacks with the following operations:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>enqueue: Add an element to the end of the queue</li>
              <li>dequeue: Remove and return the front element from the queue</li>
              <li>peek: Return the front element without removing it</li>
              <li>isEmpty: Check if the queue is empty</li>
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
                  placeholder="Enter a number to enqueue"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Enqueue
                </button>
              </form>

              <div className="flex gap-2">
                <button
                  onClick={dequeue}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Dequeue
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

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <p className="font-semibold">Input Stack:</p>
                  <div className="flex flex-col-reverse items-center gap-2 mt-2">
                    {inputStack.map((value, index) => (
                      <div
                        key={index}
                        className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center rounded"
                      >
                        {value}
                      </div>
                    ))}
                    {inputStack.length === 0 && (
                      <p className="text-gray-500">Empty</p>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <p className="font-semibold">Output Stack:</p>
                  <div className="flex flex-col-reverse items-center gap-2 mt-2">
                    {outputStack.map((value, index) => (
                      <div
                        key={index}
                        className="w-16 h-16 bg-green-500 text-white flex items-center justify-center rounded"
                      >
                        {value}
                      </div>
                    ))}
                    {outputStack.length === 0 && (
                      <p className="text-gray-500">Empty</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Solution</h2>
            <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-x-auto">
              <code>{`class Queue {
  constructor() {
    this.inputStack = [];
    this.outputStack = [];
  }

  enqueue(element) {
    this.inputStack.push(element);
  }

  dequeue() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }

    if (this.outputStack.length === 0) {
      // Transfer all elements from input stack to output stack
      while (this.inputStack.length > 0) {
        this.outputStack.push(this.inputStack.pop());
      }
    }

    return this.outputStack.pop();
  }

  peek() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }

    if (this.outputStack.length === 0) {
      return this.inputStack[0];
    }

    return this.outputStack[this.outputStack.length - 1];
  }

  isEmpty() {
    return this.inputStack.length === 0 && this.outputStack.length === 0;
  }
}`}</code>
            </pre>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Implementation using Two Stacks:
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Input Stack: Used for enqueue operations</li>
                    <li>Output Stack: Used for dequeue operations</li>
                    <li>When output stack is empty, transfer all elements from input stack</li>
                  </ul>
                </li>
                <li>Time Complexity:
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Enqueue: O(1)</li>
                    <li>Dequeue: Amortized O(1)</li>
                    <li>Peek: O(1)</li>
                  </ul>
                </li>
                <li>Space Complexity: O(n) where n is the number of elements</li>
              </ol>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 