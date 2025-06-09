"use client";
import { useState } from "react";

export default function LRUCache() {
  const [capacity, setCapacity] = useState<number>(2);
  const [key, setKey] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [cache, setCache] = useState<Map<string, string>>(new Map());
  const [result, setResult] = useState<string | null>(null);
  const [operations, setOperations] = useState<string[]>([]);

  const put = (key: string, value: string) => {
    const newCache = new Map(cache);

    // If key exists, remove it first
    if (newCache.has(key)) {
      newCache.delete(key);
    }
    // If cache is full, remove least recently used item
    else if (newCache.size >= capacity) {
      const firstKey = newCache.keys().next().value;
      newCache.delete(firstKey);
    }

    newCache.set(key, value);
    setCache(newCache);
    setOperations((prev) => [...prev, `PUT(${key}, ${value})`]);
    setResult(`Added key ${key} with value ${value}`);
  };

  const get = (key: string) => {
    if (!cache.has(key)) {
      setResult(`Key ${key} not found`);
      setOperations((prev) => [...prev, `GET(${key}) -> -1`]);
      return;
    }

    const value = cache.get(key)!;
    const newCache = new Map(cache);
    newCache.delete(key);
    newCache.set(key, value);
    setCache(newCache);
    setResult(`Value for key ${key}: ${value}`);
    setOperations((prev) => [...prev, `GET(${key}) -> ${value}`]);
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

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">LRU Cache</h1>
        <div className="mb-8 p-8 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 backdrop-blur-xl rounded-t-2xl border-t-4 border-t-blue-500/50 dark:border-t-blue-400/50 border-x border-b-4 border-x-blue-200/50 dark:border-x-blue-800/50 border-b-blue-500/50 dark:border-b-blue-400/50 shadow-xl overflow-hidden">
          <p className="text-slate-800 dark:text-slate-200 text-lg sm:text-xl leading-relaxed">
            Design and implement a data structure for Least Recently Used (LRU)
            cache. It should support get and put operations in O(1) time.
          </p>
        </div>
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                get: Retrieve the value of the key if it exists in the cache
              </li>
              <li>put: Insert or update the value of the key</li>
              <li>
                Evicts the least recently used item when the cache reaches its
                capacity
              </li>
            </ul>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded mt-4">
              <h3 className="font-semibold mb-2">Example:</h3>
              <p>Cache capacity = 2</p>
              <p>put(1, 1)</p>
              <p>put(2, 2)</p>
              <p>get(1) → returns 1</p>
              <p>put(3, 3) → evicts key 2</p>
              <p>get(2) → returns -1 (not found)</p>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Try it out</h2>
            <div className="space-y-4">
              <div className="flex gap-4 items-center">
                <label htmlFor="capacity" className="whitespace-nowrap">
                  Cache Capacity:
                </label>
                <input
                  type="number"
                  id="capacity"
                  value={capacity}
                  onChange={(e) =>
                    setCapacity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-24 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  min="1"
                />
              </div>

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

              {result && (
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <p className="font-semibold">Result:</p>
                  <p>{result}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <p className="font-semibold mb-2">Current Cache:</p>
                  <div className="space-y-2">
                    {Array.from(cache.entries()).map(([k, v]) => (
                      <div
                        key={k}
                        className="flex justify-between items-center"
                      >
                        <span className="font-mono">{k}</span>
                        <span className="font-mono">→</span>
                        <span className="font-mono">{v}</span>
                      </div>
                    ))}
                    {cache.size === 0 && (
                      <p className="text-gray-500">Cache is empty</p>
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
              <code>{`class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    
    // Get value and remove it
    const value = this.cache.get(key);
    this.cache.delete(key);
    // Add it back to make it most recently used
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    // If key exists, remove it first
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    // If cache is full, remove least recently used item
    else if (this.cache.size >= this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
    }
    
    this.cache.set(key, value);
  }
}`}</code>
            </pre>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  Implementation using Map:
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Map maintains insertion order in JavaScript</li>
                    <li>Most recently used items are at the end</li>
                    <li>Least recently used items are at the beginning</li>
                  </ul>
                </li>
                <li>
                  Time Complexity:
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>get: O(1)</li>
                    <li>put: O(1)</li>
                  </ul>
                </li>
                <li>Space Complexity: O(capacity)</li>
              </ol>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
