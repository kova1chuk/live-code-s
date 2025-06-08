'use client';
import { useState } from 'react';

export default function MoveZeroes() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number[]>([]);

  const moveZeroes = (nums: number[]) => {
    let nonZeroIndex = 0;
    
    // Move all non-zero elements to the front
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] !== 0) {
        nums[nonZeroIndex] = nums[i];
        nonZeroIndex++;
      }
    }
    
    // Fill the remaining positions with zeros
    for (let i = nonZeroIndex; i < nums.length; i++) {
      nums[i] = 0;
    }
    
    return nums;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numbers = input.split(',').map(num => parseInt(num.trim()));
    setResult(moveZeroes([...numbers]));
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Move Zeroes to End</h1>
        
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
            <p className="mb-4">
              Given an array of numbers, move all zeros to the end while maintaining the relative order of non-zero elements.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="font-semibold mb-2">Example:</h3>
              <p>Input: [0, 1, 0, 3, 12]</p>
              <p>Output: [1, 3, 12, 0, 0]</p>
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
                  placeholder="0, 1, 0, 3, 12"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Move Zeroes
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
              <code>{`// Method 1: Two-pointer approach
function moveZeroes(nums) {
  let nonZeroIndex = 0;
  
  // Move all non-zero elements to the front
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[nonZeroIndex] = nums[i];
      nonZeroIndex++;
    }
  }
  
  // Fill the remaining positions with zeros
  for (let i = nonZeroIndex; i < nums.length; i++) {
    nums[i] = 0;
  }
  
  return nums;
}

// Method 2: Using filter
function moveZeroes(nums) {
  const nonZeros = nums.filter(num => num !== 0);
  const zeros = nums.filter(num => num === 0);
  return [...nonZeros, ...zeros];
}`}</code>
            </pre>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Method 1 (Two-pointer approach):
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Use a pointer to track the position for next non-zero element</li>
                    <li>Iterate through the array, moving non-zero elements to the front</li>
                    <li>Fill remaining positions with zeros</li>
                    <li>Time Complexity: O(n), Space Complexity: O(1)</li>
                  </ul>
                </li>
                <li>Method 2 (Using filter):
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Filter out non-zero and zero elements</li>
                    <li>Concatenate the arrays</li>
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