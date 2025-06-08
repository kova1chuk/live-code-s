'use client';
import { useState } from 'react';

export default function TwoSum() {
  const [numbers, setNumbers] = useState('');
  const [target, setTarget] = useState('');
  const [result, setResult] = useState<number[]>([]);

  const twoSum = (nums: number[], target: number) => {
    const map = new Map<number, number>();
    
    for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i];
      if (map.has(complement)) {
        return [map.get(complement)!, i];
      }
      map.set(nums[i], i);
    }
    
    return [];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nums = numbers.split(',').map(num => parseInt(num.trim()));
    const targetNum = parseInt(target);
    setResult(twoSum(nums, targetNum));
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Two Sum</h1>
        
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
            <p className="mb-4">
              Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
              You may assume that each input would have exactly one solution, and you may not use the same element twice.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="font-semibold mb-2">Example:</h3>
              <p>Input: nums = [2, 7, 11, 15], target = 9</p>
              <p>Output: [0, 1] (because nums[0] + nums[1] = 2 + 7 = 9)</p>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Try it out</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="numbers" className="block mb-2">Enter numbers (comma-separated):</label>
                <input
                  type="text"
                  id="numbers"
                  value={numbers}
                  onChange={(e) => setNumbers(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="2, 7, 11, 15"
                />
              </div>
              <div>
                <label htmlFor="target" className="block mb-2">Target sum:</label>
                <input
                  type="number"
                  id="target"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="9"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Find Two Sum
              </button>
            </form>
            {result.length > 0 && (
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
                <p className="font-semibold">Result:</p>
                <p>Indices: [{result.join(', ')}]</p>
                <p className="mt-2">
                  Numbers: [
                  {result.map((index, i) => (
                    <span key={index}>
                      {numbers.split(',').map(num => parseInt(num.trim()))[index]}
                      {i < result.length - 1 ? ' + ' : ''}
                    </span>
                  ))}
                  ] = {target}
                </p>
              </div>
            )}
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Solution</h2>
            <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-x-auto">
              <code>{`function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  
  return [];
}`}</code>
            </pre>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Create a Map to store numbers and their indices</li>
                <li>For each number:
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Calculate the complement (target - current number)</li>
                    <li>If complement exists in Map, return both indices</li>
                    <li>Otherwise, store current number and its index in Map</li>
                  </ul>
                </li>
                <li>Time Complexity: O(n), Space Complexity: O(n)</li>
              </ol>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 