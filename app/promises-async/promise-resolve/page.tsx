'use client';
import { useState } from 'react';

export default function PromiseResolve() {
  const [value, setValue] = useState<string>('Hello, Promise!');
  const [result, setResult] = useState<string>('');
  const [explanation, setExplanation] = useState<string[]>([]);

  const myPromiseResolve = async <T,>(value: T | Promise<T>): Promise<T> => {
    const steps: string[] = [];
    steps.push('Starting Promise.resolve implementation');

    if (value instanceof Promise) {
      steps.push('Input is already a Promise, returning as is');
      setExplanation(steps);
      return value;
    }

    steps.push('Creating new Promise with resolved value');
    setExplanation(steps);
    return Promise.resolve(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult('');
    setExplanation([]);
    
    try {
      const promise = myPromiseResolve(value);
      const result = await promise;
      setResult(result);
    } catch (error) {
      setResult(`Error: ${error}`);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Implement Promise.resolve</h1>
        
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
            <p className="mb-4">
              Implement a function that works like Promise.resolve. It should take a value and return
              a new promise that is resolved with that value. If the input is already a promise,
              it should return that promise.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="font-semibold mb-2">Example:</h3>
              <p>Input: "Hello, Promise!"</p>
              <p>Output: Promise resolved with "Hello, Promise!"</p>
              <p className="mt-2">Features:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Handles any value type</li>
                <li>Preserves existing promises</li>
                <li>Returns new promise</li>
                <li>Type-safe implementation</li>
              </ul>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Try it out</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="value" className="block mb-2">Value to resolve:</label>
                <input
                  type="text"
                  id="value"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Hello, Promise!"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Run Promise.resolve
              </button>
            </form>

            {result && (
              <div className="mt-6 space-y-6">
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <h3 className="font-semibold mb-2">Result:</h3>
                  <p className="text-green-600">{result}</p>
                </div>

                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <h3 className="font-semibold mb-2">Step-by-step Explanation:</h3>
                  <div className="space-y-1">
                    {explanation.map((step, index) => (
                      <p key={index} className="text-sm whitespace-pre-line">{step}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Solution</h2>
            <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-x-auto">
              <code>{`async function myPromiseResolve<T>(value: T | Promise<T>): Promise<T> {
  if (value instanceof Promise) {
    return value;
  }
  return Promise.resolve(value);
}`}</code>
            </pre>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Implementation Approach:
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Check if input is a Promise</li>
                    <li>Return input if it's a Promise</li>
                    <li>Create new resolved Promise</li>
                    <li>Handle any value type</li>
                  </ul>
                </li>
                <li>Key Features:
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Type-safe implementation</li>
                    <li>Promise preservation</li>
                    <li>Universal value handling</li>
                    <li>Immediate resolution</li>
                  </ul>
                </li>
                <li>Time Complexity: O(1)</li>
              </ol>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 