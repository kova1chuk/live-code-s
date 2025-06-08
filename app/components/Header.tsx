"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

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

  const renderNavItems = () => (
    <>
      {Object.entries(sections).map(
        ([section, { path: sectionPath, items }]) => (
          <div key={section} className="relative group">
            <div className="flex items-center">
              <Link
                href={sectionPath}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  pathname.startsWith(sectionPath)
                    ? "bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {section}
              </Link>
              <span className="p-1 inline-block transform group-hover:rotate-180 transition-transform duration-200">
                ▼
              </span>
            </div>

            <div className="absolute left-0 mt-2 w-56 rounded-lg shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 transform transition-all duration-200 origin-top-left opacity-0 invisible group-hover:opacity-100 group-hover:visible">
              <div className="py-1" role="menu">
                {items.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                      pathname === item.path
                        ? "bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                    role="menuitem"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )
      )}
    </>
  );

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                JavaScript Challenges
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {renderNavItems()}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {Object.entries(sections).map(
              ([section, { path: sectionPath, items }]) => (
                <div key={section} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Link
                      href={sectionPath}
                      className="flex-1 px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      {section}
                    </Link>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        const target =
                          e.currentTarget.parentElement?.nextElementSibling;
                        if (target) {
                          target.classList.toggle("hidden");
                        }
                      }}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                    >
                      <span className="inline-block transform transition-transform duration-200">
                        ▼
                      </span>
                    </button>
                  </div>
                  <div className="hidden pl-4 space-y-1">
                    {items.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                          pathname === item.path
                            ? "bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
