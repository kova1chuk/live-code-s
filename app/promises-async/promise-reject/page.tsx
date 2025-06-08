'use client';
import { useState } from 'react';

export default function PromiseReject() {
  const [errorMessage, setErrorMessage] = useState<string>('Something went wrong');
  const [result, setResult] = useState<string>('');
  const [explanation, setExplanation] = useState<string[]>([]);

  const myPromiseReject = async <T,>(reason: any): Promise<T> => {
    const steps: string[] = [];
    steps.push('Starting Promise.reject implementation');
    steps.push(`Creating new Promise rejected with reason: ${reason}`);
    setExplanation(steps);
    return Promise.reject(reason);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult('');
    setExplanation([]);
    
    try {
      await myPromiseReject(errorMessage);
    } catch (error) {
      setResult(`Error: ${error}`);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Implement Promise.reject</h1>
        
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
            <p className="mb-4">
              Implement a function that works like Promise.reject. It should take a reason and return
              a new promise that is rejected with that reason.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="font-semibold mb-2">Example:</h3>
              <p>Input: "Something went wrong"</p>
              <p>Output: Promise rejected with "Something went wrong"</p>
              <p className="mt-2">Features:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Handles any rejection reason</li>
                <li>Returns new rejected promise</li>
                <li>Type-safe implementation</li>
                <li>Immediate rejection</li>
              </ul>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Try it out</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="errorMessage" className="block mb-2">Error message:</label>
                <input
                  type="text"
                  id="errorMessage"
                  value={errorMessage}
                  onChange={(e) => setErrorMessage(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Something went wrong"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Run Promise.reject
              </button>
            </form>

            {result && (
              <div className="mt-6 space-y-6">
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <h3 className="font-semibold mb-2">Result:</h3>
                  <p className="text-red-600">{result}</p>
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
              <code>{`async function myPromiseReject<T>(reason: any): Promise<T> {
  return Promise.reject(reason);
}`}</code>
            </pre>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Implementation Approach:
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Take any rejection reason</li>
                    <li>Create new rejected Promise</li>
                    <li>Return immediately</li>
                    <li>Handle any error type</li>
                  </ul>
                </li>
                <li>Key Features:
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Type-safe implementation</li>
                    <li>Universal error handling</li>
                    <li>Immediate rejection</li>
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