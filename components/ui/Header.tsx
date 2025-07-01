"use client";
import Link from "next/link";

export default function Header() {
  // All previous sections and items
  const sections = {
    "Parsing & Formatting": {
      path: "/parsing-formatting",
      items: [
        { name: "JSON Parser", path: "/parsing-formatting/json-parser" },
        {
          name: "Date Formatting",
          path: "/parsing-formatting/date-formatting",
        },
        {
          name: "String Template",
          path: "/parsing-formatting/string-template",
        },
      ],
    },
    "Object & Functional": {
      path: "/object-functional",
      items: [
        { name: "Deep Clone", path: "/object-functional/deep-clone" },
        {
          name: "Function Composition",
          path: "/object-functional/function-composition",
        },
        { name: "Currying", path: "/object-functional/currying" },
        { name: "Prototype Chain", path: "/object-functional/prototype-chain" },
        {
          name: "Higher-Order Functions",
          path: "/object-functional/higher-order",
        },
      ],
    },
    "Data Structures": {
      path: "/data-structures",
      items: [
        { name: "Linked List", path: "/data-structures/linked-list" },
        { name: "Binary Tree", path: "/data-structures/binary-tree" },
        { name: "Graph", path: "/data-structures/graph" },
        { name: "Hash Table", path: "/data-structures/hash-table" },
        { name: "Stack & Queue", path: "/data-structures/stack-queue" },
      ],
    },
    "Array & String": {
      path: "/array-string-manipulation",
      items: [
        {
          name: "Reverse a String",
          path: "/array-string-manipulation/reverse-string",
        },
        {
          name: "Check for Anagram",
          path: "/array-string-manipulation/check-anagram",
        },
        { name: "Two Sum", path: "/array-string-manipulation/two-sum" },
        {
          name: "Remove Duplicates",
          path: "/array-string-manipulation/remove-duplicates",
        },
        {
          name: "Flatten Array",
          path: "/array-string-manipulation/flatten-array",
        },
        {
          name: "Longest Substring",
          path: "/array-string-manipulation/longest-substring",
        },
        {
          name: "Group Anagrams",
          path: "/array-string-manipulation/group-anagrams",
        },
        {
          name: "Rotate Array",
          path: "/array-string-manipulation/rotate-array",
        },
        { name: "Move Zeroes", path: "/array-string-manipulation/move-zeroes" },
        {
          name: "Find Missing Number in Range",
          path: "/array-string-manipulation/missing-number",
        },
        {
          name: "Array Methods",
          path: "/array-string-manipulation/array-methods",
        },
        {
          name: "String Manipulation",
          path: "/array-string-manipulation/string-manipulation",
        },
        {
          name: "Matrix Operations",
          path: "/array-string-manipulation/matrix",
        },
      ],
    },
    "Sorting & Searching": {
      path: "/sorting-searching",
      items: [
        { name: "Sorting Algorithms", path: "/sorting-searching/sorting" },
        { name: "Searching Algorithms", path: "/sorting-searching/searching" },
        { name: "Binary Search", path: "/sorting-searching/binary-search" },
      ],
    },
    "Recursion & Backtracking": {
      path: "/recursion-backtracking",
      items: [
        {
          name: "Recursive Functions",
          path: "/recursion-backtracking/recursive",
        },
        { name: "Backtracking", path: "/recursion-backtracking/backtracking" },
        {
          name: "Tree Traversal",
          path: "/recursion-backtracking/tree-traversal",
        },
      ],
    },
    "Promises & Async": {
      path: "/promises-async",
      items: [
        { name: "Promise Implementation", path: "/promises-async/promise" },
        { name: "Async/Await", path: "/promises-async/async-await" },
        { name: "Event Loop", path: "/promises-async/event-loop" },
      ],
    },
  };

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow">
      <nav className="container mx-auto flex items-center justify-center py-4 px-6">
        <div className="flex items-center gap-8">
          <div className="flex-1 flex items-center justify-start">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                JavaScript Challenges
              </span>
            </Link>
          </div>
          {/* Tasks Dropdown with categories */}
          <div className="relative group">
            <button className="px-4 py-2 rounded-md text-sm font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
              Tasks
            </button>
            <div className="absolute left-0 mt-2 w-72 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto z-50 transition-opacity">
              <ul className="py-2">
                {Object.entries(sections).map(([category, { items }], idx) => (
                  <li
                    key={category + "-" + idx}
                    className="relative group/category"
                  >
                    <button className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center justify-between">
                      {category}
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                    <div
                      className="absolute left-full top-0 mt-0 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg opacity-0 pointer-events-none group-hover/category:opacity-100 group-hover/category:pointer-events-auto hover:opacity-100 hover:pointer-events-auto z-50 transition-opacity"
                      style={{ marginLeft: "-8px", paddingLeft: "8px" }}
                    >
                      <ul className="py-2">
                        {items.map((item, itemIdx) => (
                          <li key={item.name + "-" + itemIdx}>
                            <Link
                              href={item.path}
                              className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* New top-level items */}
          <Link
            href="/ts"
            className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          >
            TS
          </Link>
          <Link
            href="/api"
            className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          >
            API
          </Link>
          <Link
            href="/react"
            className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          >
            React
          </Link>
        </div>
      </nav>
    </header>
  );
}
