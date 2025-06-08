'use client';
import { useState } from 'react';

export default function TopKFrequent() {
  const [array, setArray] = useState<string>('1, 1, 1, 2, 2, 3');
  const [k, setK] = useState<string>('2');
  const [result, setResult] = useState<number[]>([]);
  const [explanation, setExplanation] = useState<string[]>([]);

  const topKFrequent = (nums: number[], k: number): number[] => {
    const steps: string[] = [];
    
    // Count frequencies
    const frequencyMap = new Map<number, number>();
    steps.push('Step 1: Count frequency of each number');
    nums.forEach(num => {
      frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
      steps.push(`Number ${num}: frequency = ${frequencyMap.get(num)}`);
    });

    // Create buckets for frequencies
    const buckets: number[][] = Array(nums.length + 1).fill(null).map(() => []);
    steps.push('\nStep 2: Create buckets for each frequency');
    frequencyMap.forEach((freq, num) => {
      buckets[freq].push(num);
      steps.push(`Number ${num} with frequency ${freq} goes to bucket ${freq}`);
    });

    // Get top k elements
    const result: number[] = [];
    steps.push('\nStep 3: Collect top k frequent elements');
    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
      if (buckets[i].length > 0) {
        result.push(...buckets[i]);
        steps.push(`Adding numbers from bucket ${i}: [${buckets[i].join(', ')}]`);
      }
    }

    setResult(result.slice(0, k));
    setExplanation(steps);
    return result.slice(0, k);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numbers = array.split(',')
      .map(num => parseInt(num.trim()))
      .filter(num => !isNaN(num));
    
    if (numbers.length > 0 && k) {
      topKFrequent(numbers, parseInt(k));
    }
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Top K Frequent Elements</h1>
        
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
            <p className="mb-4">
              Given an integer array nums and an integer k, return the k most frequent elements.
              You may return the answer in any order.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="font-semibold mb-2">Example:</h3>
              <p>Input: nums = [1, 1, 1, 2, 2, 3], k = 2</p>
              <p>Output: [1, 2]</p>
              <p className="mt-2">Explanation:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>1 appears 3 times</li>
                <li>2 appears 2 times</li>
                <li>3 appears 1 time</li>
                <li>Return the 2 most frequent elements: [1, 2]</li>
              </ul>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Try it out</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="array" className="block mb-2">Array (comma-separated):</label>
                <input
                  type="text"
                  id="array"
                  value={array}
                  onChange={(e) => setArray(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="1, 1, 1, 2, 2, 3"
                />
              </div>
              <div>
                <label htmlFor="k" className="block mb-2">K (number of elements):</label>
                <input
                  type="number"
                  id="k"
                  value={k}
                  onChange={(e) => setK(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Enter k"
                  min="1"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Find Top K
              </button>
            </form>

            {result.length > 0 && (
              <div className="mt-6 space-y-6">
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <h3 className="font-semibold mb-2">Result:</h3>
                  <p className="text-green-600">
                    Top {k} frequent elements: [{result.join(', ')}]
                  </p>
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
              <code>{`function topKFrequent(nums, k) {
  // Count frequencies
  const frequencyMap = new Map();
  for (const num of nums) {
    frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
  }
  
  // Create buckets for frequencies
  const buckets = Array(nums.length + 1).fill().map(() => []);
  for (const [num, freq] of frequencyMap) {
    buckets[freq].push(num);
  }
  
  // Get top k elements
  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i]);
  }
  
  return result.slice(0, k);
}`}</code>
            </pre>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Bucket Sort Approach:
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Count frequency of each number</li>
                    <li>Create buckets for each frequency</li>
                    <li>Put numbers in their frequency buckets</li>
                    <li>Collect top k elements from highest frequency buckets</li>
                  </ul>
                </li>
                <li>Time Complexity: O(n)
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Counting frequencies: O(n)</li>
                    <li>Creating buckets: O(n)</li>
                    <li>Collecting top k: O(n)</li>
                  </ul>
                </li>
                <li>Space Complexity: O(n) for frequency map and buckets</li>
              </ol>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 