'use client';
import { useState } from 'react';

export default function Subsets() {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<number[][]>([]);
  const [explanation, setExplanation] = useState<string[]>([]);

  const generateSubsets = (nums: number[]) => {
    const subsets: number[][] = [];
    const steps: string[] = [];
    
    const backtrack = (start: number, current: number[]) => {
      steps.push(`Adding subset: [${current.join(', ')}]`);
      subsets.push([...current]);
      
      for (let i = start; i < nums.length; i++) {
        current.push(nums[i]);
        steps.push(`Including ${nums[i]}: [${current.join(', ')}]`);
        backtrack(i + 1, current);
        current.pop();
        steps.push(`Backtracking: [${current.join(', ')}]`);
      }
    };
    
    backtrack(0, []);
    setResult(subsets);
    setExplanation(steps);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numbers = input.split(',')
      .map(num => parseInt(num.trim()))
      .filter(num => !isNaN(num));
    
    if (numbers.length > 0) {
      generateSubsets(numbers);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Generate All Subsets (Power Set)</h1>
        
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
            <p className="mb-4">
              Given an integer array nums of unique elements, return all possible subsets (the power set).
              The solution set must not contain duplicate subsets.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="font-semibold mb-2">Example:</h3>
              <p>Input: nums = [1,2,3]</p>
              <p>Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]</p>
              <p className="mt-2">Explanation:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>[] represents the empty set</li>
                <li>[1] represents a subset containing only 1</li>
                <li>[1,2] represents a subset containing 1 and 2</li>
                <li>And so on...</li>
              </ul>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Try it out</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="input" className="block mb-2">Enter numbers (comma-separated):</label>
                <input
                  type="text"
                  id="input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="1, 2, 3"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Generate Subsets
              </button>
            </form>

            {result.length > 0 && (
              <div className="mt-6 space-y-6">
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <h3 className="font-semibold mb-2">Generated Subsets:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {result.map((subset, index) => (
                      <div
                        key={index}
                        className="p-2 bg-white dark:bg-gray-800 rounded border dark:border-gray-700"
                      >
                        [{subset.join(', ')}]
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
              <code>{`function subsets(nums) {
  const result = [];
  
  const backtrack = (start, current) => {
    // Add the current subset to the result
    result.push([...current]);
    
    // Try adding each number after the current position
    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  };
  
  backtrack(0, []);
  return result;
}`}</code>
            </pre>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Backtracking Approach:
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Start with an empty subset</li>
                    <li>For each number, we have two choices:
                      <ul className="list-disc list-inside ml-4 mt-1">
                        <li>Include the number in the current subset</li>
                        <li>Exclude the number from the current subset</li>
                      </ul>
                    </li>
                    <li>After making a choice, recursively process the remaining numbers</li>
                    <li>Backtrack by removing the last added number</li>
                  </ul>
                </li>
                <li>Time Complexity: O(2^n) where n is the length of the input array
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>For each number, we have 2 choices (include/exclude)</li>
                    <li>Total number of subsets is 2^n</li>
                  </ul>
                </li>
                <li>Space Complexity: O(n) for the recursion stack</li>
              </ol>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 