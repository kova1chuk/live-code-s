'use client';
import { useState } from 'react';

export default function PromiseFinally() {
  const [delay, setDelay] = useState<string>('1000');
  const [result, setResult] = useState<string>('');
  const [explanation, setExplanation] = useState<string[]>([]);

  const myPromiseFinally = async <T,>(promise: Promise<T>, onFinally: () => void): Promise<T> => {
    const steps: string[] = [];
    steps.push('Starting Promise.finally implementation');

    try {
      const value = await promise;
      steps.push(`Promise resolved with: ${value}`);
      setExplanation(steps);
      onFinally();
      return value;
    } catch (error) {
      steps.push(`Promise rejected with: ${error}`);
      setExplanation(steps);
      onFinally();
      throw error;
    }
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
      const promise = createDelayedPromise(Number(delay));
      const result = await myPromiseFinally(promise, () => {
        setExplanation(prev => [...prev, 'Finally callback executed']);
      });
      setResult(result);
    } catch (error) {
      setResult(`Error: ${error}`);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Implement Promise.finally</h1>
        
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
            <p className="mb-4">
              Implement a function that works like Promise.finally. It should take a promise and a callback
              function, and ensure that the callback is executed after the promise settles, regardless of
              whether it was fulfilled or rejected.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="font-semibold mb-2">Example:</h3>
              <p>Input: Promise(1000ms)</p>
              <p>Output: Result of the promise with finally callback executed</p>
              <p className="mt-2">Features:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Executes callback after settlement</li>
                <li>Preserves promise result</li>
                <li>Works with both success and failure</li>
                <li>Type-safe implementation</li>
              </ul>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Try it out</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="delay" className="block mb-2">Promise delay (ms):</label>
                <input
                  type="text"
                  id="delay"
                  value={delay}
                  onChange={(e) => setDelay(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="1000"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Run Promise.finally
              </button>
            </form>

            {result && (
              <div className="mt-6 space-y-6">
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <h3 className="font-semibold mb-2">Result:</h3>
                  <p className={result.startsWith('Error') ? 'text-red-600' : 'text-green-600'}>
                    {result}
                  </p>
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
              <code>{`async function myPromiseFinally<T>(promise: Promise<T>, onFinally: () => void): Promise<T> {
  try {
    const value = await promise;
    onFinally();
    return value;
  } catch (error) {
    onFinally();
    throw error;
  }
}`}</code>
            </pre>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Implementation Approach:
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Await the promise</li>
                    <li>Execute finally callback</li>
                    <li>Return or rethrow result</li>
                    <li>Handle both cases</li>
                  </ul>
                </li>
                <li>Key Features:
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Type-safe implementation</li>
                    <li>Always executes callback</li>
                    <li>Preserves promise result</li>
                    <li>Simple implementation</li>
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