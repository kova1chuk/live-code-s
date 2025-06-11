"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [rightAlignedMenus, setRightAlignedMenus] = useState<Set<string>>(
    new Set()
  );
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  // Update dropdown alignment
  useEffect(() => {
    const updateLayout = () => {
      const menuItems = document.querySelectorAll(".nav-item-container");
      const newRightAligned = new Set<string>();

      menuItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const windowWidth = window.innerWidth;

        if (rect.left > windowWidth / 2) {
          newRightAligned.add(item.getAttribute("data-section") || "");
        }
      });

      setRightAlignedMenus(newRightAligned);
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);

    return () => {
      window.removeEventListener("resize", updateLayout);
    };
  }, []);

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
          name: "Check for Anagram",
          path: "/array-string-manipulation/check-anagram",
        },
        {
          name: "Two Sum",
          path: "/array-string-manipulation/two-sum",
        },
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
        {
          name: "Move Zeroes",
          path: "/array-string-manipulation/move-zeroes",
        },
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

  const renderNavItems = () => (
    <>
      {Object.entries(sections).map(
        ([section, { path: sectionPath, items }]) => {
          const isActive = pathname.startsWith(sectionPath);
          const isRightAligned = rightAlignedMenus.has(section);

          return (
            <div
              key={section}
              className="relative group h-full flex items-center nav-item-container"
              data-section={section}
            >
              <Link
                href={sectionPath}
                className={`
                px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                hover:px-4 relative z-20
                ${
                  isActive
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow-sm"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }
              `}
              >
                {section}
              </Link>

              <div
                className={`
                dropdown-menu
                absolute ${isRightAligned ? "right-0" : "left-0"} 
                top-full mt-2 w-64 rounded-lg shadow-lg 
                bg-white dark:bg-gray-800 ring-1 ring-black/5 
                transform opacity-0 invisible -translate-y-2
                group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                transition-all duration-200 z-10
                ${
                  items.length > 6
                    ? "max-h-[calc(100vh-6rem)] overflow-y-auto"
                    : ""
                }
              `}
                style={{
                  transformOrigin: isRightAligned ? "top right" : "top left",
                }}
              >
                <div className="py-2" role="menu">
                  {items.map((item) => {
                    const isItemActive = pathname === item.path;

                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`
                        block px-4 py-2 text-sm transition-all duration-200
                        hover:px-5 ${
                          isRightAligned
                            ? "hover:pr-5 hover:pl-4"
                            : "hover:pl-5 hover:pr-4"
                        }
                        ${
                          isItemActive
                            ? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 shadow-sm"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200"
                        }
                      `}
                        role="menuitem"
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        }
      )}
    </>
  );

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-40 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
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
          <div
            ref={navRef}
            className="hidden md:flex items-center space-x-1 h-full py-2 max-w-[calc(100%-280px)]"
          >
            {renderNavItems()}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
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
              ) : (
                <svg
                  className="block h-6 w-6"
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
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
          <div className="pt-2 pb-3 space-y-1">
            {Object.entries(sections).map(
              ([section, { path: sectionPath, items }]) => {
                const isActive = pathname.startsWith(sectionPath);

                return (
                  <div key={section} className="space-y-1">
                    <Link
                      href={sectionPath}
                      className={`
                      block px-4 py-2 rounded-md text-base font-medium transition-all duration-200
                      ${
                        isActive
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow-sm"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }
                    `}
                    >
                      {section}
                    </Link>
                    <div className="pl-4 space-y-1">
                      {items.map((item) => {
                        const isItemActive = pathname === item.path;

                        return (
                          <Link
                            key={item.path}
                            href={item.path}
                            className={`
                            block px-4 py-2 rounded-md text-sm transition-all duration-200
                            ${
                              isItemActive
                                ? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 shadow-sm"
                                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                            }
                          `}
                          >
                            {item.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
