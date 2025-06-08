"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          Programming Practice Problems
        </h1>

        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              Array & String Manipulation
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/array-string-manipulation/reverse-string"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Reverse a string
                </Link>
              </li>
              <li>
                <Link
                  href="/array-string-manipulation/check-anagram"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Check for anagram
                </Link>
              </li>
              <li>
                <Link
                  href="/array-string-manipulation/group-anagrams"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Group anagrams
                </Link>
              </li>
              <li>
                <Link
                  href="/array-string-manipulation/two-sum"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Two sum
                </Link>
              </li>
              <li>
                <Link
                  href="/array-string-manipulation/remove-duplicates"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Remove duplicates from an array
                </Link>
              </li>
              <li>
                <Link
                  href="/array-string-manipulation/flatten-array"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Flatten nested array
                </Link>
              </li>
              <li>
                <Link
                  href="/array-string-manipulation/longest-substring"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Find the longest substring without repeating characters
                </Link>
              </li>
              <li>
                <Link
                  href="/array-string-manipulation/rotate-array"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Rotate array k steps
                </Link>
              </li>
              <li>
                <Link
                  href="/array-string-manipulation/move-zeroes"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Move zeroes to the end
                </Link>
              </li>
              <li>
                <Link
                  href="/array-string-manipulation/missing-number"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Find missing number in range
                </Link>
              </li>
            </ul>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Data Structures</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/data-structures/stack"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Implement a stack using arrays
                </Link>
              </li>
              <li>
                <Link
                  href="/data-structures/queue"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Implement a queue using two stacks
                </Link>
              </li>
              <li>
                <Link
                  href="/data-structures/validate-parentheses"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Validate parentheses
                </Link>
              </li>
              <li>
                <Link
                  href="/data-structures/lru-cache"
                  className="text-blue-500 hover:text-blue-600"
                >
                  LRU Cache
                </Link>
              </li>
              <li>
                <Link
                  href="/data-structures/hashmap"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Design a HashMap (or Set)
                </Link>
              </li>
            </ul>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              Recursion & Backtracking
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/recursion-backtracking/subsets"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Generate all subsets (power set)
                </Link>
              </li>
              <li>
                <Link
                  href="/recursion-backtracking/permutations"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Generate all permutations
                </Link>
              </li>
              <li>
                <Link
                  href="/recursion-backtracking/n-queens"
                  className="text-blue-500 hover:text-blue-600"
                >
                  N-Queens problem
                </Link>
              </li>
              <li>
                <Link
                  href="/recursion-backtracking/maze-solver"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Maze solver
                </Link>
              </li>
              <li>
                <Link
                  href="/recursion-backtracking/fibonacci"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Fibonacci with memoization
                </Link>
              </li>
            </ul>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Sorting & Searching</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/sorting-searching/merge-sorted"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Merge two sorted arrays
                </Link>
              </li>
              <li>
                <Link
                  href="/sorting-searching/binary-search"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Binary search
                </Link>
              </li>
              <li>
                <Link
                  href="/sorting-searching/top-k"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Top K frequent elements
                </Link>
              </li>
              <li>
                <Link
                  href="/sorting-searching/quick-sort"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Quick sort
                </Link>
              </li>
              <li>
                <Link
                  href="/sorting-searching/sort-characters"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Sort characters by frequency
                </Link>
              </li>
            </ul>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Promises & Async</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/promises-async/promise-all"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Implement Promise.all
                </Link>
              </li>
              <li>
                <Link
                  href="/promises-async/throttle-debounce"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Throttle/debounce function
                </Link>
              </li>
              <li>
                <Link
                  href="/promises-async/retry-api"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Retry failed API with backoff
                </Link>
              </li>
              <li>
                <Link
                  href="/promises-async/concurrent-promises"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Limit concurrent promises
                </Link>
              </li>
              <li>
                <Link
                  href="/promises-async/sleep-delay"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Sleep/delay function
                </Link>
              </li>
            </ul>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Object & Functional</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/object-functional/deep-clone"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Deep clone an object
                </Link>
              </li>
              <li>
                <Link
                  href="/object-functional/bind-call-apply"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Implement bind, call, apply
                </Link>
              </li>
              <li>
                <Link
                  href="/object-functional/currying"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Currying a function
                </Link>
              </li>
              <li>
                <Link
                  href="/object-functional/memoize"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Memoize a function
                </Link>
              </li>
              <li>
                <Link
                  href="/object-functional/flatten-nest"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Object flattening/nesting
                </Link>
              </li>
            </ul>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Parsing & Formatting</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/parsing-formatting/json-parser"
                  className="text-blue-500 hover:text-blue-600"
                >
                  JSON parser/stringifier
                </Link>
              </li>
              <li>
                <Link
                  href="/parsing-formatting/csv-json"
                  className="text-blue-500 hover:text-blue-600"
                >
                  CSV to JSON converter
                </Link>
              </li>
              <li>
                <Link
                  href="/parsing-formatting/expression-evaluator"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Expression evaluator (calculator)
                </Link>
              </li>
              <li>
                <Link
                  href="/parsing-formatting/serialize-tree"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Serialize/deserialize binary tree
                </Link>
              </li>
              <li>
                <Link
                  href="/parsing-formatting/template-parser"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Template string parser
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
