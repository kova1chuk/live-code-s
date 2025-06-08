'use client';
import { useState } from 'react';

export default function FlattenArray() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number[]>([]);

  const flattenArray = (arr: any[]): number[] => {
    return arr.reduce((flat: number[], item: any) => {
      return flat.concat(Array.isArray(item) ? flattenArray(item) : item);
    }, []);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const array = JSON.parse(input);
      setResult(flattenArray(array));
    } catch (error) {
      alert('Please enter a valid JSON array');
    }
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Flatten Nested Array</h1>
        
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
            <p className="mb-4">
              Given a nested array of numbers, flatten it into a single-level array.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="font-semibold mb-2">Example:</h3>
              <p>Input: [1, [2, 3], [4, [5, 6]]]</p>
              <p>Output: [1, 2, 3, 4, 5, 6]</p>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Try it out</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="input" className="block mb-2">Enter nested array (JSON format):</label>
                <input
                  type="text"
                  id="input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder='[1, [2, 3], [4, [5, 6]]]'
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Flatten Array
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
              <code>{`// Method 1: Using reduce and recursion
function flattenArray(arr) {
  return arr.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) ? flattenArray(item) : item);
  }, []);
}

// Method 2: Using flat() method (ES2019)
function flattenArray(arr) {
  return arr.flat(Infinity);
}

// Method 3: Using toString() and split()
function flattenArray(arr) {
  return arr.toString().split(',').map(Number);
}`}</code>
            </pre>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Method 1 (Using reduce and recursion):
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Recursively flatten nested arrays</li>
                    <li>Works with any level of nesting</li>
                    <li>Time Complexity: O(n), Space Complexity: O(n)</li>
                  </ul>
                </li>
                <li>Method 2 (Using flat()):
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Uses built-in Array.flat() method</li>
                    <li>Infinity parameter flattens all levels</li>
                    <li>Time Complexity: O(n), Space Complexity: O(n)</li>
                  </ul>
                </li>
                <li>Method 3 (Using toString()):
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Converts array to string and splits</li>
                    <li>Only works with numbers</li>
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