'use client';
import { useState } from 'react';

export default function LongestSubstring() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{ length: number; substring: string } | null>(null);

  const findLongestSubstring = (str: string) => {
    let maxLength = 0;
    let start = 0;
    let maxStart = 0;
    const charMap = new Map<string, number>();

    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (charMap.has(char) && charMap.get(char)! >= start) {
        start = charMap.get(char)! + 1;
      }
      charMap.set(char, i);
      
      const currentLength = i - start + 1;
      if (currentLength > maxLength) {
        maxLength = currentLength;
        maxStart = start;
      }
    }

    return {
      length: maxLength,
      substring: str.slice(maxStart, maxStart + maxLength)
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(findLongestSubstring(input));
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Longest Substring Without Repeating Characters</h1>
        
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
            <p className="mb-4">
              Given a string, find the length of the longest substring without repeating characters.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="font-semibold mb-2">Example:</h3>
              <p>Input: "abcabcbb"</p>
              <p>Output: 3 (The longest substring is "abc")</p>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Try it out</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="input" className="block mb-2">Enter a string:</label>
                <input
                  type="text"
                  id="input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="abcabcbb"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Find Longest Substring
              </button>
            </form>
            {result && (
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
                <p className="font-semibold">Result:</p>
                <p>Length: {result.length}</p>
                <p>Substring: "{result.substring}"</p>
              </div>
            )}
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Solution</h2>
            <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-x-auto">
              <code>{`function findLongestSubstring(str) {
  let maxLength = 0;
  let start = 0;
  let maxStart = 0;
  const charMap = new Map();

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (charMap.has(char) && charMap.get(char) >= start) {
      start = charMap.get(char) + 1;
    }
    charMap.set(char, i);
    
    const currentLength = i - start + 1;
    if (currentLength > maxLength) {
      maxLength = currentLength;
      maxStart = start;
    }
  }

  return {
    length: maxLength,
    substring: str.slice(maxStart, maxStart + maxLength)
  };
}`}</code>
            </pre>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Use a sliding window approach with two pointers:
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>start: beginning of current substring</li>
                    <li>i: current position</li>
                  </ul>
                </li>
                <li>Use a Map to store the last position of each character</li>
                <li>When a repeating character is found:
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Move start pointer to position after the previous occurrence</li>
                    <li>Update the character's position in the Map</li>
                  </ul>
                </li>
                <li>Keep track of the maximum length and its starting position</li>
                <li>Time Complexity: O(n), Space Complexity: O(min(m, n)) where m is the character set size</li>
              </ol>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 