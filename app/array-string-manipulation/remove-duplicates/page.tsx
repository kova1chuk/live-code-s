'use client';
import { useState } from 'react';

export default function RemoveDuplicates() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number[]>([]);

  const removeDuplicates = (nums: number[]) => {
    return [...new Set(nums)];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numbers = input.split(',').map(num => parseInt(num.trim()));
    setResult(removeDuplicates(numbers));
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Remove Duplicates from Array</h1>
        
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
            <p className="mb-4">
              Given an array of numbers, remove all duplicates and return a new array with unique values.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="font-semibold mb-2">Example:</h3>
              <p>Input: [1, 2, 2, 3, 3, 4, 5, 5]</p>
              <p>Output: [1, 2, 3, 4, 5]</p>
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
                  placeholder="1, 2, 2, 3, 3, 4, 5, 5"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Remove Duplicates
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
              <code>{`// Method 1: Using Set
function removeDuplicates(nums) {
  return [...new Set(nums)];
}

// Method 2: Using filter
function removeDuplicates(nums) {
  return nums.filter((num, index) => nums.indexOf(num) === index);
}

// Method 3: Using reduce
function removeDuplicates(nums) {
  return nums.reduce((unique, num) => 
    unique.includes(num) ? unique : [...unique, num], 
  []);
}`}</code>
            </pre>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Method 1 (Using Set):
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Create a Set from the array (automatically removes duplicates)</li>
                    <li>Convert back to array using spread operator</li>
                    <li>Time Complexity: O(n), Space Complexity: O(n)</li>
                  </ul>
                </li>
                <li>Method 2 (Using filter):
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Keep only the first occurrence of each number</li>
                    <li>Time Complexity: O(n²), Space Complexity: O(n)</li>
                  </ul>
                </li>
                <li>Method 3 (Using reduce):
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Build a new array with unique values</li>
                    <li>Time Complexity: O(n²), Space Complexity: O(n)</li>
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