'use client';
import { useState } from 'react';

export default function FindFirstLastPosition() {
  const [array, setArray] = useState<string>('5, 7, 7, 8, 8, 10');
  const [target, setTarget] = useState<string>('');
  const [result, setResult] = useState<[number, number] | null>(null);
  const [explanation, setExplanation] = useState<string[]>([]);

  const findFirstLastPosition = (arr: number[], target: number): [number, number] => {
    const steps: string[] = [];
    
    const findFirst = (): number => {
      let left = 0;
      let right = arr.length - 1;
      let first = -1;

      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        steps.push(`Searching for first occurrence: Checking index ${mid} (value: ${arr[mid]})`);

        if (arr[mid] === target) {
          first = mid;
          steps.push(`Found potential first occurrence at index ${mid}`);
          right = mid - 1;
        } else if (arr[mid] < target) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }

      return first;
    };

    const findLast = (): number => {
      let left = 0;
      let right = arr.length - 1;
      let last = -1;

      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        steps.push(`Searching for last occurrence: Checking index ${mid} (value: ${arr[mid]})`);

        if (arr[mid] === target) {
          last = mid;
          steps.push(`Found potential last occurrence at index ${mid}`);
          left = mid + 1;
        } else if (arr[mid] < target) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }

      return last;
    };

    const first = findFirst();
    const last = findLast();
    
    setResult([first, last]);
    setExplanation(steps);
    return [first, last];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numbers = array.split(',')
      .map(num => parseInt(num.trim()))
      .filter(num => !isNaN(num))
      .sort((a, b) => a - b);
    
    if (numbers.length > 0 && target) {
      findFirstLastPosition(numbers, parseInt(target));
    }
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Find First and Last Position</h1>
        
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
            <p className="mb-4">
              Given a sorted array of integers and a target value, find the starting and ending position of the target value.
              If the target value is not found, return [-1, -1].
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="font-semibold mb-2">Example:</h3>
              <p>Input: nums = [5, 7, 7, 8, 8, 10], target = 8</p>
              <p>Output: [3, 4]</p>
              <p className="mt-2">Explanation:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>First occurrence of 8 is at index 3</li>
                <li>Last occurrence of 8 is at index 4</li>
                <li>If target is not found, return [-1, -1]</li>
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
                  placeholder="5, 7, 7, 8, 8, 10"
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
                Find Positions
              </button>
            </form>

            {result !== null && (
              <div className="mt-6 space-y-6">
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <h3 className="font-semibold mb-2">Result:</h3>
                  <p className={result[0] >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {result[0] >= 0 
                      ? `Target found at positions [${result[0]}, ${result[1]}]`
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
              <code>{`function findFirstLastPosition(nums, target) {
  const findFirst = () => {
    let left = 0;
    let right = nums.length - 1;
    let first = -1;
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      
      if (nums[mid] === target) {
        first = mid;
        right = mid - 1;  // Continue searching left
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    
    return first;
  };
  
  const findLast = () => {
    let left = 0;
    let right = nums.length - 1;
    let last = -1;
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      
      if (nums[mid] === target) {
        last = mid;
        left = mid + 1;  // Continue searching right
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    
    return last;
  };
  
  return [findFirst(), findLast()];
}`}</code>
            </pre>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Modified Binary Search Approach:
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Use two binary searches</li>
                    <li>First search finds the leftmost occurrence</li>
                    <li>Second search finds the rightmost occurrence</li>
                    <li>When target is found, continue searching in the appropriate direction</li>
                  </ul>
                </li>
                <li>Time Complexity: O(log n)
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Two binary searches, each O(log n)</li>
                    <li>Total complexity remains O(log n)</li>
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