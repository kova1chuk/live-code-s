'use client';
import { useState } from 'react';

export default function CheckAnagram() {
  const [str1, setStr1] = useState('');
  const [str2, setStr2] = useState('');
  const [result, setResult] = useState<boolean | null>(null);

  const checkAnagram = (str1: string, str2: string) => {
    const normalize = (str: string) => 
      str.toLowerCase().replace(/[^a-z0-9]/g, '').split('').sort().join('');
    return normalize(str1) === normalize(str2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(checkAnagram(str1, str2));
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Check for Anagram</h1>
        
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
            <p className="mb-4">
              Write a function that checks if two strings are anagrams of each other.
              An anagram is a word or phrase formed by rearranging the letters of a different word or phrase.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="font-semibold mb-2">Example:</h3>
              <p>Input: "listen", "silent"</p>
              <p>Output: true</p>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Try it out</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="str1" className="block mb-2">First string:</label>
                <input
                  type="text"
                  id="str1"
                  value={str1}
                  onChange={(e) => setStr1(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Enter first string"
                />
              </div>
              <div>
                <label htmlFor="str2" className="block mb-2">Second string:</label>
                <input
                  type="text"
                  id="str2"
                  value={str2}
                  onChange={(e) => setStr2(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Enter second string"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Check Anagram
              </button>
            </form>
            {result !== null && (
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
                <p className="font-semibold">Result:</p>
                <p>{result ? 'The strings are anagrams!' : 'The strings are not anagrams.'}</p>
              </div>
            )}
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Solution</h2>
            <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-x-auto">
              <code>{`function checkAnagram(str1, str2) {
  const normalize = (str) => 
    str.toLowerCase()
       .replace(/[^a-z0-9]/g, '')
       .split('')
       .sort()
       .join('');
  return normalize(str1) === normalize(str2);
}`}</code>
            </pre>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Create a helper function to normalize strings by:
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Converting to lowercase</li>
                    <li>Removing non-alphanumeric characters</li>
                    <li>Sorting the characters</li>
                  </ul>
                </li>
                <li>Compare the normalized versions of both strings</li>
              </ol>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 