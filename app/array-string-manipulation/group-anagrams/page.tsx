'use client';
import { useState } from 'react';

export default function GroupAnagrams() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string[][]>([]);

  const groupAnagrams = (strs: string[]) => {
    const groups = new Map<string, string[]>();
    
    for (const str of strs) {
      const sorted = str.split('').sort().join('');
      if (!groups.has(sorted)) {
        groups.set(sorted, []);
      }
      groups.get(sorted)!.push(str);
    }
    
    return Array.from(groups.values());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const words = input.split(',').map(word => word.trim());
    setResult(groupAnagrams(words));
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Group Anagrams</h1>
        
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
            <p className="mb-4">
              Given an array of strings, group the anagrams together. An anagram is a word or phrase formed by rearranging the letters of a different word or phrase.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="font-semibold mb-2">Example:</h3>
              <p>Input: ["eat", "tea", "tan", "ate", "nat", "bat"]</p>
              <p>Output: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]</p>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Try it out</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="input" className="block mb-2">Enter words (comma-separated):</label>
                <input
                  type="text"
                  id="input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="eat, tea, tan, ate, nat, bat"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Group Anagrams
              </button>
            </form>
            {result.length > 0 && (
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
                <p className="font-semibold mb-2">Result:</p>
                <div className="space-y-2">
                  {result.map((group, index) => (
                    <div key={index} className="p-2 bg-white dark:bg-gray-800 rounded">
                      Group {index + 1}: [{group.join(', ')}]
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Solution</h2>
            <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-x-auto">
              <code>{`function groupAnagrams(strs) {
  const groups = new Map();
  
  for (const str of strs) {
    const sorted = str.split('').sort().join('');
    if (!groups.has(sorted)) {
      groups.set(sorted, []);
    }
    groups.get(sorted).push(str);
  }
  
  return Array.from(groups.values());
}`}</code>
            </pre>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Create a Map to store groups of anagrams</li>
                <li>For each string:
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Sort its characters to create a key</li>
                    <li>Add the string to the corresponding group in the Map</li>
                  </ul>
                </li>
                <li>Convert the Map values to an array and return</li>
              </ol>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 