'use client';
import { useState } from 'react';

export default function MergeSortedArrays() {
  const [array1, setArray1] = useState<string>('1, 3, 5, 7');
  const [array2, setArray2] = useState<string>('2, 4, 6, 8');
  const [result, setResult] = useState<number[]>([]);
  const [explanation, setExplanation] = useState<string[]>([]);

  const mergeSortedArrays = (arr1: number[], arr2: number[]): number[] => {
    const merged: number[] = [];
    const steps: string[] = [];
    let i = 0, j = 0;

    while (i < arr1.length && j < arr2.length) {
      if (arr1[i] <= arr2[j]) {
        merged.push(arr1[i]);
        steps.push(`Taking ${arr1[i]} from first array`);
        i++;
      } else {
        merged.push(arr2[j]);
        steps.push(`Taking ${arr2[j]} from second array`);
        j++;
      }
    }

    while (i < arr1.length) {
      merged.push(arr1[i]);
      steps.push(`Adding remaining ${arr1[i]} from first array`);
      i++;
    }

    while (j < arr2.length) {
      merged.push(arr2[j]);
      steps.push(`Adding remaining ${arr2[j]} from second array`);
      j++;
    }

    setResult(merged);
    setExplanation(steps);
    return merged;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const arr1 = array1.split(',')
      .map(num => parseInt(num.trim()))
      .filter(num => !isNaN(num));
    const arr2 = array2.split(',')
      .map(num => parseInt(num.trim()))
      .filter(num => !isNaN(num));
    
    if (arr1.length > 0 && arr2.length > 0) {
      mergeSortedArrays(arr1, arr2);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Merge Two Sorted Arrays</h1>
        
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
            <p className="mb-4">
              Given two sorted arrays, merge them into a single sorted array.
              The resulting array should maintain the sorted order of all elements.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="font-semibold mb-2">Example:</h3>
              <p>Input:</p>
              <p>arr1 = [1, 3, 5, 7]</p>
              <p>arr2 = [2, 4, 6, 8]</p>
              <p>Output: [1, 2, 3, 4, 5, 6, 7, 8]</p>
              <p className="mt-2">Explanation:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Compare elements from both arrays</li>
                <li>Take the smaller element and move to the next position</li>
                <li>Continue until all elements are processed</li>
              </ul>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Try it out</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="array1" className="block mb-2">First sorted array (comma-separated):</label>
                <input
                  type="text"
                  id="array1"
                  value={array1}
                  onChange={(e) => setArray1(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="1, 3, 5, 7"
                />
              </div>
              <div>
                <label htmlFor="array2" className="block mb-2">Second sorted array (comma-separated):</label>
                <input
                  type="text"
                  id="array2"
                  value={array2}
                  onChange={(e) => setArray2(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="2, 4, 6, 8"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Merge Arrays
              </button>
            </form>

            {result.length > 0 && (
              <div className="mt-6 space-y-6">
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <h3 className="font-semibold mb-2">Merged Array:</h3>
                  <div className="p-2 bg-white dark:bg-gray-800 rounded border dark:border-gray-700">
                    [{result.join(', ')}]
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
              <code>{`function mergeSortedArrays(arr1, arr2) {
  const merged = [];
  let i = 0, j = 0;
  
  // Compare elements from both arrays
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      merged.push(arr1[i]);
      i++;
    } else {
      merged.push(arr2[j]);
      j++;
    }
  }
  
  // Add remaining elements from first array
  while (i < arr1.length) {
    merged.push(arr1[i]);
    i++;
  }
  
  // Add remaining elements from second array
  while (j < arr2.length) {
    merged.push(arr2[j]);
    j++;
  }
  
  return merged;
}`}</code>
            </pre>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Two-Pointer Approach:
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Use two pointers, one for each array</li>
                    <li>Compare elements at both pointers</li>
                    <li>Take the smaller element and move its pointer</li>
                    <li>Continue until one array is exhausted</li>
                    <li>Add remaining elements from the other array</li>
                  </ul>
                </li>
                <li>Time Complexity: O(n + m)
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>n is the length of first array</li>
                    <li>m is the length of second array</li>
                    <li>Each element is processed exactly once</li>
                  </ul>
                </li>
                <li>Space Complexity: O(n + m) for the merged array</li>
              </ol>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 