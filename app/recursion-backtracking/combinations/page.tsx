'use client';
import { useState } from 'react';

export default function Combinations() {
  const [n, setN] = useState<number>(4);
  const [k, setK] = useState<number>(2);
  const [result, setResult] = useState<number[][]>([]);
  const [explanation, setExplanation] = useState<string[]>([]);

  const combine = (n: number, k: number): number[][] => {
    const combinations: number[][] = [];
    const steps: string[] = [];
    
    const backtrack = (start: number, current: number[]): void => {
      if (current.length === k) {
        steps.push(`Found combination: [${current.join(', ')}]`);
        combinations.push([...current]);
        return;
      }
      
      for (let i = start; i <= n; i++) {
        current.push(i);
        steps.push(`Adding ${i}: [${current.join(', ')}]`);
        backtrack(i + 1, current);
        current.pop();
        steps.push(`Backtracking: [${current.join(', ')}]`);
      }
    };
    
    backtrack(1, []);
    setResult(combinations);
    setExplanation(steps);
    return combinations;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (n > 0 && k > 0 && k <= n) {
      combine(n, k);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Generate All Combinations</h1>
        
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
            <p className="mb-4">
              Given two integers n and k, return all possible combinations of k numbers out of the range [1, n].
              You may return the answer in any order.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="font-semibold mb-2">Example:</h3>
              <p>Input: n = 4, k = 2</p>
              <p>Output: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]</p>
              <p className="mt-2">Explanation:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Each combination is a selection of k numbers from 1 to n</li>
                <li>Numbers in each combination are in ascending order</li>
                <li>No duplicate combinations are allowed</li>
              </ul>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Try it out</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="n" className="block mb-2">Enter n (range [1, n]):</label>
                  <input
                    type="number"
                    id="n"
                    value={n}
                    onChange={(e) => setN(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                    min="1"
                  />
                </div>
                <div>
                  <label htmlFor="k" className="block mb-2">Enter k (size of combinations):</label>
                  <input
                    type="number"
                    id="k"
                    value={k}
                    onChange={(e) => setK(Math.max(1, Math.min(n, parseInt(e.target.value) || 1)))}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                    min="1"
                    max={n}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Generate Combinations
              </button>
            </form>

            {result.length > 0 && (
              <div className="mt-6 space-y-6">
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <h3 className="font-semibold mb-2">Generated Combinations:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {result.map((combination, index) => (
                      <div
                        key={index}
                        className="p-2 bg-white dark:bg-gray-800 rounded border dark:border-gray-700"
                      >
                        [{combination.join(', ')}]
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <h3 className="font-semibold mb-2">Step-by-step Explanation:</h3>
                  <div className="space-y-1">
                    {explanation.map((step, index) => (
                      <p key={index} className="text-sm">{step}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Solution</h2>
            <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-x-auto">
              <code>{`function combine(n, k) {
  const result = [];
  
  const backtrack = (start, current) => {
    // If we have k numbers, add the combination
    if (current.length === k) {
      result.push([...current]);
      return;
    }
    
    // Try adding each number from start to n
    for (let i = start; i <= n; i++) {
      current.push(i);
      backtrack(i + 1, current);
      current.pop();
    }
  };
  
  backtrack(1, []);
  return result;
}`}</code>
            </pre>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Backtracking Approach:
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Start with an empty combination</li>
                    <li>For each position, try numbers from start to n</li>
                    <li>After adding a number, recursively process the next position</li>
                    <li>Backtrack by removing the last added number</li>
                  </ul>
                </li>
                <li>Time Complexity: O(C(n,k))
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>C(n,k) is the number of combinations</li>
                    <li>Each combination takes O(k) time to generate</li>
                  </ul>
                </li>
                <li>Space Complexity: O(k) for the recursion stack</li>
              </ol>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 