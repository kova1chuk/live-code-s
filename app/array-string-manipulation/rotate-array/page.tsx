'use client';
import { useState } from 'react';

export default function RotateArray() {
  const [input, setInput] = useState('');
  const [steps, setSteps] = useState('');
  const [result, setResult] = useState<number[]>([]);

  const rotateArray = (nums: number[], k: number) => {
    const n = nums.length;
    k = k % n; // Handle cases where k > n
    
    // Reverse the entire array
    reverse(nums, 0, n - 1);
    // Reverse the first k elements
    reverse(nums, 0, k - 1);
    // Reverse the remaining elements
    reverse(nums, k, n - 1);
    
    return nums;
  };

  const reverse = (nums: number[], start: number, end: number) => {
    while (start < end) {
      [nums[start], nums[end]] = [nums[end], nums[start]];
      start++;
      end--;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numbers = input.split(',').map(num => parseInt(num.trim()));
    const k = parseInt(steps);
    setResult(rotateArray([...numbers], k));
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Rotate Array</h1>
        
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
            <p className="mb-4">
              Given an array, rotate the array to the right by k steps, where k is non-negative.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="font-semibold mb-2">Example:</h3>
              <p>Input: nums = [1, 2, 3, 4, 5], k = 2</p>
              <p>Output: [4, 5, 1, 2, 3]</p>
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
                  placeholder="1, 2, 3, 4, 5"
                />
              </div>
              <div>
                <label htmlFor="steps" className="block mb-2">Number of steps to rotate:</label>
                <input
                  type="number"
                  id="steps"
                  value={steps}
                  onChange={(e) => setSteps(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="2"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Rotate Array
              </button>
            </form>
            {result.length > 0 && (
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
                <p className="font-semibold">Result:</p>
                <p>[{result.join(', ')}]</p>
              </div>
            )}
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Solution</h2>
            <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-x-auto">
              <code>{`// Method 1: Using reverse
function rotateArray(nums, k) {
  const n = nums.length;
  k = k % n; // Handle cases where k > n
  
  // Reverse the entire array
  reverse(nums, 0, n - 1);
  // Reverse the first k elements
  reverse(nums, 0, k - 1);
  // Reverse the remaining elements
  reverse(nums, k, n - 1);
  
  return nums;
}

function reverse(nums, start, end) {
  while (start < end) {
    [nums[start], nums[end]] = [nums[end], nums[start]];
    start++;
    end--;
  }
}

// Method 2: Using extra space
function rotateArray(nums, k) {
  const n = nums.length;
  k = k % n;
  const result = new Array(n);
  
  for (let i = 0; i < n; i++) {
    result[(i + k) % n] = nums[i];
  }
  
  return result;
}`}</code>
            </pre>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Method 1 (Using reverse):
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Reverse the entire array</li>
                    <li>Reverse the first k elements</li>
                    <li>Reverse the remaining elements</li>
                    <li>Time Complexity: O(n), Space Complexity: O(1)</li>
                  </ul>
                </li>
                <li>Method 2 (Using extra space):
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Create a new array</li>
                    <li>Place elements in their new positions</li>
                    <li>Time Complexity: O(n), Space Complexity: O(n)</li>
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