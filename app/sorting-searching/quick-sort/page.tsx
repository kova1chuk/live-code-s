'use client';
import { useState } from 'react';

export default function QuickSort() {
  const [array, setArray] = useState<string>('64, 34, 25, 12, 22, 11, 90');
  const [result, setResult] = useState<number[]>([]);
  const [explanation, setExplanation] = useState<string[]>([]);

  const quickSort = (arr: number[]): number[] => {
    const steps: string[] = [];
    const result = [...arr];
    
    const partition = (low: number, high: number): number => {
      const pivot = result[high];
      let i = low - 1;
      
      steps.push(`\nPartitioning array from index ${low} to ${high}`);
      steps.push(`Pivot: ${pivot}`);
      
      for (let j = low; j < high; j++) {
        if (result[j] <= pivot) {
          i++;
          [result[i], result[j]] = [result[j], result[i]];
          steps.push(`Swapped ${result[j]} and ${result[i]}`);
        }
      }
      
      [result[i + 1], result[high]] = [result[high], result[i + 1]];
      steps.push(`Placed pivot ${pivot} at index ${i + 1}`);
      steps.push(`Current array: [${result.join(', ')}]`);
      
      return i + 1;
    };

    const sort = (low: number, high: number) => {
      if (low < high) {
        const pi = partition(low, high);
        sort(low, pi - 1);
        sort(pi + 1, high);
      }
    };

    steps.push('Starting Quick Sort');
    steps.push(`Initial array: [${result.join(', ')}]`);
    sort(0, result.length - 1);
    steps.push(`\nFinal sorted array: [${result.join(', ')}]`);

    setResult(result);
    setExplanation(steps);
    return result;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numbers = array.split(',')
      .map(num => parseInt(num.trim()))
      .filter(num => !isNaN(num));
    
    if (numbers.length > 0) {
      quickSort(numbers);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Quick Sort</h1>
        
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
            <p className="mb-4">
              Implement Quick Sort algorithm to sort an array of integers in ascending order.
              Quick Sort is a divide-and-conquer algorithm that works by selecting a 'pivot' element
              and partitioning the array around the pivot.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="font-semibold mb-2">Example:</h3>
              <p>Input: [64, 34, 25, 12, 22, 11, 90]</p>
              <p>Output: [11, 12, 22, 25, 34, 64, 90]</p>
              <p className="mt-2">Algorithm Steps:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Choose a pivot element</li>
                <li>Partition array around pivot</li>
                <li>Recursively sort subarrays</li>
                <li>Combine results</li>
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
                  placeholder="64, 34, 25, 12, 22, 11, 90"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Sort Array
              </button>
            </form>

            {result.length > 0 && (
              <div className="mt-6 space-y-6">
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <h3 className="font-semibold mb-2">Result:</h3>
                  <p className="text-green-600">
                    Sorted array: [{result.join(', ')}]
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
              <code>{`function quickSort(arr) {
  const partition = (low, high) => {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      if (arr[j] <= pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
  };

  const sort = (low, high) => {
    if (low < high) {
      const pi = partition(low, high);
      sort(low, pi - 1);
      sort(pi + 1, high);
    }
  };

  sort(0, arr.length - 1);
  return arr;
}`}</code>
            </pre>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Quick Sort Algorithm:
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Choose last element as pivot</li>
                    <li>Partition array into elements less than and greater than pivot</li>
                    <li>Recursively sort subarrays</li>
                    <li>Combine results in place</li>
                  </ul>
                </li>
                <li>Time Complexity:
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Average case: O(n log n)</li>
                    <li>Worst case: O(n²) when array is already sorted</li>
                    <li>Best case: O(n log n)</li>
                  </ul>
                </li>
                <li>Space Complexity: O(log n) for recursion stack</li>
              </ol>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 