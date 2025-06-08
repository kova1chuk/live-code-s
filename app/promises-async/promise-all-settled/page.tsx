'use client';
import { useState } from 'react';

export default function PromiseAllSettled() {
  const [promiseDelays, setPromiseDelays] = useState<string>('1000,2000,3000');
  const [result, setResult] = useState<string>('');
  const [explanation, setExplanation] = useState<string[]>([]);

  const myPromiseAllSettled = async <T,>(promises: Promise<T>[]): Promise<PromiseSettledResult<T>[]> => {
    const steps: string[] = [];
    steps.push('Starting Promise.allSettled implementation');
    steps.push(`Number of promises: ${promises.length}`);

    const results: PromiseSettledResult<T>[] = [];
    let remainingPromises = promises.length;

    return new Promise((resolve) => {
      promises.forEach((promise, index) => {
        promise
          .then((value) => {
            steps.push(`Promise ${index + 1} resolved with: ${value}`);
            results[index] = { status: 'fulfilled', value };
            remainingPromises--;
            
            if (remainingPromises === 0) {
              steps.push('All promises have settled');
              setExplanation(steps);
              resolve(results);
            }
          })
          .catch((reason) => {
            steps.push(`Promise ${index + 1} rejected with: ${reason}`);
            results[index] = { status: 'rejected', reason };
            remainingPromises--;
            
            if (remainingPromises === 0) {
              steps.push('All promises have settled');
              setExplanation(steps);
              resolve(results);
            }
          });
      });
    });
  };

  const createDelayedPromise = (delay: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve(`Resolved after ${delay}ms`);
        } else {
          reject(`Rejected after ${delay}ms`);
        }
      }, delay);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult('');
    setExplanation([]);
    
    try {
      const delays = promiseDelays.split(',').map(Number);
      const promises = delays.map(createDelayedPromise);
      const results = await myPromiseAllSettled(promises);
      setResult(JSON.stringify(results, null, 2));
    } catch (error) {
      setResult(`Error: ${error}`);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Implement Promise.allSettled</h1>
        
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
            <p className="mb-4">
              Implement a function that works like Promise.allSettled. It should take an array of promises
              and return a new promise that resolves with an array of objects describing the outcome of
              each promise, whether it was fulfilled or rejected.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="font-semibold mb-2">Example:</h3>
              <p>Input: [1000ms, 2000ms, 3000ms]</p>
              <p>Output: Array of settled results with status and value/reason</p>
              <p className="mt-2">Features:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Handles multiple promises</li>
                <li>Returns all results</li>
                <li>Preserves promise order</li>
                <li>Type-safe implementation</li>
              </ul>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Try it out</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="promiseDelays" className="block mb-2">Promise delays (ms, comma-separated):</label>
                <input
                  type="text"
                  id="promiseDelays"
                  value={promiseDelays}
                  onChange={(e) => setPromiseDelays(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="1000,2000,3000"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Run Promise.allSettled
              </button>
            </form>

            {result && (
              <div className="mt-6 space-y-6">
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <h3 className="font-semibold mb-2">Result:</h3>
                  <pre className="whitespace-pre-wrap text-sm">
                    {result}
                  </pre>
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
              <code>{`async function myPromiseAllSettled<T>(promises: Promise<T>[]): Promise<PromiseSettledResult<T>[]> {
  const results: PromiseSettledResult<T>[] = [];
  let remainingPromises = promises.length;

  return new Promise((resolve) => {
    promises.forEach((promise, index) => {
      promise
        .then((value) => {
          results[index] = { status: 'fulfilled', value };
          remainingPromises--;
          if (remainingPromises === 0) resolve(results);
        })
        .catch((reason) => {
          results[index] = { status: 'rejected', reason };
          remainingPromises--;
          if (remainingPromises === 0) resolve(results);
        });
    });
  });
}`}</code>
            </pre>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Implementation Approach:
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Create results array</li>
                    <li>Track remaining promises</li>
                    <li>Store outcomes in order</li>
                    <li>Resolve when all settled</li>
                  </ul>
                </li>
                <li>Key Features:
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Type-safe implementation</li>
                    <li>Preserves promise order</li>
                    <li>Handles all outcomes</li>
                    <li>Never rejects</li>
                  </ul>
                </li>
                <li>Time Complexity: O(n) where n is the number of promises</li>
              </ol>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 