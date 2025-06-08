'use client';
import { useState } from 'react';

export default function BinarySearch() {
  const [array, setArray] = useState<string>('1, 3, 5, 7, 9, 11, 13, 15');
  const [target, setTarget] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [explanation, setExplanation] = useState<string[]>([]);

  const binarySearch = (arr: number[], target: number): number => {
    const steps: string[] = [];
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      steps.push(`Checking middle element at index ${mid}: ${arr[mid]}`);

      if (arr[mid] === target) {
        steps.push(`Found target ${target} at index ${mid}`);
        setResult(mid);
        setExplanation(steps);
        return mid;
      }

      if (arr[mid] < target) {
        steps.push(`${arr[mid]} is less than ${target}, searching right half`);
        left = mid + 1;
      } else {
        steps.push(`${arr[mid]} is greater than ${target}, searching left half`);
        right = mid - 1;
      }
    }

    steps.push(`Target ${target} not found in array`);
    setResult(-1);
    setExplanation(steps);
    return -1;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numbers = array.split(',')
      .map(num => parseInt(num.trim()))
      .filter(num => !isNaN(num))
      .sort((a, b) => a - b);
    
    if (numbers.length > 0 && target) {
      binarySearch(numbers, parseInt(target));
    }
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Binary Search</h1>
        
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
            <p className="mb-4">
              Given a sorted array of integers and a target value, find the index of the target value in the array.
              If the target value is not found, return -1.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="font-semibold mb-2">Example:</h3>
              <p>Input: nums = [1, 3, 5, 7, 9, 11, 13, 15], target = 7</p>
              <p>Output: 3</p>
              <p className="mt-2">Explanation:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Start with the middle element</li>
                <li>If target is found, return its index</li>
                <li>If target is greater, search right half</li>
                <li>If target is smaller, search left half</li>
                <li>Repeat until target is found or array is exhausted</li>
              </ul>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Try it out</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="array" className="block mb-2">Sorted array (comma-separated):</label>
                <input
                  type="text"
                  id="array"
                  value={array}
                  onChange={(e) => setArray(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="1, 3, 5, 7, 9, 11, 13, 15"
                />
              </div>
              <div>
                <label htmlFor="target" className="block mb-2">Target value:</label>
                <input
                  type="number"
                  id="target"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Enter target value"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Search
              </button>
            </form>

            {result !== null && (
              <div className="mt-6 space-y-6">
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <h3 className="font-semibold mb-2">Result:</h3>
                  <p className={result >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {result >= 0 
                      ? `Target found at index ${result}`
                      : 'Target not found in array'}
                  </p>
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
              <code>{`function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (nums[mid] === target) {
      return mid;
    }
    
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}`}</code>
            </pre>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Binary Search Approach:
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Start with the entire array</li>
                    <li>Find the middle element</li>
                    <li>Compare with target value</li>
                    <li>Eliminate half of the array</li>
                    <li>Repeat until target is found or array is exhausted</li>
                  </ul>
                </li>
                <li>Time Complexity: O(log n)
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Each step reduces the search space by half</li>
                    <li>Number of steps is log₂(n)</li>
                  </ul>
                </li>
                <li>Space Complexity: O(1) for iterative approach</li>
              </ol>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 