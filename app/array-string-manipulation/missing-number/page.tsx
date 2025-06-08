'use client';
import { useState } from 'react';

export default function MissingNumber() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const findMissingNumber = (nums: number[]) => {
    const n = nums.length;
    // Calculate expected sum using arithmetic sequence formula
    const expectedSum = (n * (n + 1)) / 2;
    // Calculate actual sum
    const actualSum = nums.reduce((sum, num) => sum + num, 0);
    // The difference is the missing number
    return expectedSum - actualSum;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numbers = input.split(',').map(num => parseInt(num.trim()));
    setResult(findMissingNumber(numbers));
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Find Missing Number</h1>
        
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
            <p className="mb-4">
              Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, find the one that is missing from the array.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="font-semibold mb-2">Example:</h3>
              <p>Input: [3, 0, 1]</p>
              <p>Output: 2</p>
              <p className="mt-2">Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number since it does not appear in nums.</p>
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
                  placeholder="3, 0, 1"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Find Missing Number
              </button>
            </form>
            {result !== null && (
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
                <p className="font-semibold">Result:</p>
                <p>Missing number: {result}</p>
              </div>
            )}
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Solution</h2>
            <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-x-auto">
              <code>{`// Method 1: Using sum formula
function findMissingNumber(nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((sum, num) => sum + num, 0);
  return expectedSum - actualSum;
}

// Method 2: Using XOR
function findMissingNumber(nums) {
  let result = nums.length;
  for (let i = 0; i < nums.length; i++) {
    result ^= i ^ nums[i];
  }
  return result;
}

// Method 3: Using sorting
function findMissingNumber(nums) {
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i) return i;
  }
  return nums.length;
}`}</code>
            </pre>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Method 1 (Using sum formula):
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Calculate expected sum using arithmetic sequence formula</li>
                    <li>Subtract actual sum from expected sum</li>
                    <li>Time Complexity: O(n), Space Complexity: O(1)</li>
                  </ul>
                </li>
                <li>Method 2 (Using XOR):
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Use XOR properties to find missing number</li>
                    <li>XOR all numbers and indices</li>
                    <li>Time Complexity: O(n), Space Complexity: O(1)</li>
                  </ul>
                </li>
                <li>Method 3 (Using sorting):
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Sort the array</li>
                    <li>Find first number that doesn't match its index</li>
                    <li>Time Complexity: O(n log n), Space Complexity: O(1)</li>
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