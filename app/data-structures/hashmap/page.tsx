"use client";
import { useState } from "react";

export default function HashMap() {
  const [key, setKey] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [map, setMap] = useState<Map<string, string>>(new Map());
  const [result, setResult] = useState<string | null>(null);
  const [operations, setOperations] = useState<string[]>([]);

  const put = (key: string, value: string) => {
    const newMap = new Map(map);
    newMap.set(key, value);
    setMap(newMap);
    setOperations((prev) => [...prev, `PUT(${key}, ${value})`]);
    setResult(`Added key ${key} with value ${value}`);
  };

  const get = (key: string) => {
    if (!map.has(key)) {
      setResult(`Key ${key} not found`);
      setOperations((prev) => [...prev, `GET(${key}) -> null`]);
      return;
    }

    const value = map.get(key);
    setResult(`Value for key ${key}: ${value}`);
    setOperations((prev) => [...prev, `GET(${key}) -> ${value}`]);
  };

  const remove = (key: string) => {
    if (!map.has(key)) {
      setResult(`Key ${key} not found`);
      setOperations((prev) => [...prev, `REMOVE(${key}) -> false`]);
      return;
    }

    const newMap = new Map(map);
    newMap.delete(key);
    setMap(newMap);
    setResult(`Removed key ${key}`);
    setOperations((prev) => [...prev, `REMOVE(${key}) -> true`]);
  };

  const handlePut = (e: React.FormEvent) => {
    e.preventDefault();
    if (key && value) {
      put(key, value);
      setKey("");
      setValue("");
    }
  };

  const handleGet = (e: React.FormEvent) => {
    e.preventDefault();
    if (key) {
      get(key);
      setKey("");
    }
  };

  const handleRemove = (e: React.FormEvent) => {
    e.preventDefault();
    if (key) {
      remove(key);
      setKey("");
    }
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Design a HashMap (or Set)</h1>
        <div className="mb-8 p-8 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 backdrop-blur-xl rounded-t-2xl border-t-4 border-t-blue-500/50 dark:border-t-blue-400/50 border-x border-b-4 border-x-blue-200/50 dark:border-x-blue-800/50 border-b-blue-500/50 dark:border-b-blue-400/50 shadow-xl overflow-hidden">
          <p className="text-slate-800 dark:text-slate-200 text-lg sm:text-xl leading-relaxed">
            Implement a HashMap (or Set) data structure with basic operations:
            put, get, remove, contains.
          </p>
        </div>
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>put: Insert a key-value pair</li>
              <li>get: Retrieve the value for a key</li>
              <li>remove: Remove a key-value pair</li>
              <li>contains: Check if a key exists</li>
            </ul>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded mt-4">
              <h3 className="font-semibold mb-2">Example:</h3>
              <p>HashMap map = new HashMap();</p>
              <p>map.put(1, 1);</p>
              <p>map.put(2, 2);</p>
              <p>map.get(1); → returns 1</p>
              <p>map.get(3); → returns null</p>
              <p>map.put(2, 1); → updates the existing value</p>
              <p>map.get(2); → returns 1</p>
              <p>map.remove(2); → removes the mapping for 2</p>
              <p>map.get(2); → returns null</p>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Try it out</h2>
            <div className="space-y-4">
              <form onSubmit={handlePut} className="flex gap-2">
                <input
                  type="text"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Key"
                />
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Value"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Put
                </button>
              </form>

              <form onSubmit={handleGet} className="flex gap-2">
                <input
                  type="text"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Key to get"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                  Get
                </button>
              </form>

              <form onSubmit={handleRemove} className="flex gap-2">
                <input
                  type="text"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Key to remove"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </form>

              {result && (
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <p className="font-semibold">Result:</p>
                  <p>{result}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <p className="font-semibold mb-2">Current HashMap:</p>
                  <div className="space-y-2">
                    {Array.from(map.entries()).map(([k, v]) => (
                      <div
                        key={k}
                        className="flex justify-between items-center"
                      >
                        <span className="font-mono">{k}</span>
                        <span className="font-mono">→</span>
                        <span className="font-mono">{v}</span>
                      </div>
                    ))}
                    {map.size === 0 && (
                      <p className="text-gray-500">HashMap is empty</p>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <p className="font-semibold mb-2">Operations:</p>
                  <div className="space-y-1">
                    {operations.map((op, index) => (
                      <p key={index} className="font-mono text-sm">
                        {op}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Solution</h2>
            <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-x-auto">
              <code>{`class HashMap {
  constructor() {
    this.map = new Map();
  }

  put(key, value) {
    this.map.set(key, value);
  }

  get(key) {
    return this.map.has(key) ? this.map.get(key) : null;
  }

  remove(key) {
    if (!this.map.has(key)) return false;
    this.map.delete(key);
    return true;
  }
}`}</code>
            </pre>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  Implementation using Map:
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>JavaScript's built-in Map provides O(1) operations</li>
                    <li>Handles collisions automatically</li>
                    <li>Supports any type of keys and values</li>
                  </ul>
                </li>
                <li>
                  Time Complexity:
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>put: O(1)</li>
                    <li>get: O(1)</li>
                    <li>remove: O(1)</li>
                  </ul>
                </li>
                <li>
                  Space Complexity: O(n) where n is the number of key-value
                  pairs
                </li>
              </ol>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
