'use client';
import { useState } from 'react';

export default function SortCharactersByFrequency() {
  const [input, setInput] = useState<string>('tree');
  const [result, setResult] = useState<string>('');
  const [explanation, setExplanation] = useState<string[]>([]);

  const sortCharactersByFrequency = (s: string): string => {
    const steps: string[] = [];
    
    // Count character frequencies
    const frequencyMap = new Map<string, number>();
    steps.push('Step 1: Count frequency of each character');
    for (const char of s) {
      frequencyMap.set(char, (frequencyMap.get(char) || 0) + 1);
      steps.push(`Character '${char}': frequency = ${frequencyMap.get(char)}`);
    }

    // Create buckets for frequencies
    const buckets: string[][] = Array(s.length + 1).fill(null).map(() => []);
    steps.push('\nStep 2: Create buckets for each frequency');
    frequencyMap.forEach((freq, char) => {
      buckets[freq].push(char);
      steps.push(`Character '${char}' with frequency ${freq} goes to bucket ${freq}`);
    });

    // Build result string
    let result = '';
    steps.push('\nStep 3: Build result string from highest frequency to lowest');
    for (let i = buckets.length - 1; i >= 0; i--) {
      for (const char of buckets[i]) {
        result += char.repeat(i);
        steps.push(`Added '${char}' ${i} times`);
      }
    }

    setResult(result);
    setExplanation(steps);
    return result;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input) {
      sortCharactersByFrequency(input);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Sort Characters by Frequency</h1>
        
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
            <p className="mb-4">
              Given a string s, sort it in decreasing order based on the frequency of the characters.
              The frequency of a character is the number of times it appears in the string.
              Return the sorted string. If there are multiple answers, return any of them.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="font-semibold mb-2">Example:</h3>
              <p>Input: s = "tree"</p>
              <p>Output: "eert" or "eetr"</p>
              <p className="mt-2">Explanation:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>'e' appears twice</li>
                <li>'t' and 'r' appear once</li>
                <li>Sort by frequency: "eert" or "eetr"</li>
              </ul>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Try it out</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="input" className="block mb-2">Input string:</label>
                <input
                  type="text"
                  id="input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Enter a string"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Sort by Frequency
              </button>
            </form>

            {result && (
              <div className="mt-6 space-y-6">
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <h3 className="font-semibold mb-2">Result:</h3>
                  <p className="text-green-600">
                    Sorted string: "{result}"
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
              <code>{`function sortCharactersByFrequency(s) {
  // Count frequencies
  const frequencyMap = new Map();
  for (const char of s) {
    frequencyMap.set(char, (frequencyMap.get(char) || 0) + 1);
  }
  
  // Create buckets for frequencies
  const buckets = Array(s.length + 1).fill().map(() => []);
  for (const [char, freq] of frequencyMap) {
    buckets[freq].push(char);
  }
  
  // Build result string
  let result = '';
  for (let i = buckets.length - 1; i >= 0; i--) {
    for (const char of buckets[i]) {
      result += char.repeat(i);
    }
  }
  
  return result;
}`}</code>
            </pre>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Bucket Sort Approach:
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Count frequency of each character</li>
                    <li>Create buckets for each frequency</li>
                    <li>Put characters in their frequency buckets</li>
                    <li>Build result string from highest frequency to lowest</li>
                  </ul>
                </li>
                <li>Time Complexity: O(n)
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Counting frequencies: O(n)</li>
                    <li>Creating buckets: O(n)</li>
                    <li>Building result: O(n)</li>
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