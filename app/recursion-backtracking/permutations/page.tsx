'use client';
import { useState } from 'react';

export default function Permutations() {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<number[][]>([]);
  const [explanation, setExplanation] = useState<string[]>([]);

  const generatePermutations = (nums: number[]) => {
    const permutations: number[][] = [];
    const steps: string[] = [];
    
    const backtrack = (current: number[], used: boolean[]) => {
      if (current.length === nums.length) {
        steps.push(`Found permutation: [${current.join(', ')}]`);
        permutations.push([...current]);
        return;
      }
      
      for (let i = 0; i < nums.length; i++) {
        if (!used[i]) {
          used[i] = true;
          current.push(nums[i]);
          steps.push(`Trying ${nums[i]}: [${current.join(', ')}]`);
          backtrack(current, used);
          current.pop();
          used[i] = false;
          steps.push(`Backtracking: [${current.join(', ')}]`);
        }
      }
    };
    
    backtrack([], new Array(nums.length).fill(false));
    setResult(permutations);
    setExplanation(steps);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numbers = input.split(',')
      .map(num => parseInt(num.trim()))
      .filter(num => !isNaN(num));
    
    if (numbers.length > 0) {
      generatePermutations(numbers);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Generate All Permutations</h1>
        
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
            <p className="mb-4">
              Given an array nums of distinct integers, return all the possible permutations.
              You can return the answer in any order.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="font-semibold mb-2">Example:</h3>
              <p>Input: nums = [1,2,3]</p>
              <p>Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]</p>
              <p className="mt-2">Explanation:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Each permutation is a different arrangement of the numbers</li>
                <li>All possible arrangements are included</li>
                <li>No duplicate permutations are allowed</li>
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
                Generate Permutations
              </button>
            </form>

            {result.length > 0 && (
              <div className="mt-6 space-y-6">
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <h3 className="font-semibold mb-2">Generated Permutations:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {result.map((perm, index) => (
                      <div
                        key={index}
                        className="p-2 bg-white dark:bg-gray-800 rounded border dark:border-gray-700"
                      >
                        [{perm.join(', ')}]
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
              <code>{`function permutations(nums) {
  const result = [];
  
  const backtrack = (current, used) => {
    // If we have used all numbers, add the permutation
    if (current.length === nums.length) {
      result.push([...current]);
      return;
    }
    
    // Try each number that hasn't been used yet
    for (let i = 0; i < nums.length; i++) {
      if (!used[i]) {
        used[i] = true;
        current.push(nums[i]);
        backtrack(current, used);
        current.pop();
        used[i] = false;
      }
    }
  };
  
  backtrack([], new Array(nums.length).fill(false));
  return result;
}`}</code>
            </pre>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Backtracking Approach:
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Keep track of used numbers with a boolean array</li>
                    <li>For each position, try all unused numbers</li>
                    <li>After using a number, mark it as used</li>
                    <li>After backtracking, mark the number as unused</li>
                  </ul>
                </li>
                <li>Time Complexity: O(n!) where n is the length of the input array
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>For n numbers, there are n! possible permutations</li>
                    <li>Each permutation takes O(n) time to generate</li>
                  </ul>
                </li>
                <li>Space Complexity: O(n) for the recursion stack and used array</li>
              </ol>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 