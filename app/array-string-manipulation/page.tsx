import Link from 'next/link';

export default function ArrayStringManipulation() {
  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Array & String Manipulation</h1>
        <div className="space-y-6">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Practice Problems</h2>
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/array-string-manipulation/reverse-string"
                  className="block p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Reverse a String
                </Link>
              </li>
              <li>
                <Link 
                  href="/array-string-manipulation/check-anagram"
                  className="block p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Check for Anagram
                </Link>
              </li>
              <li>
                <Link 
                  href="/array-string-manipulation/group-anagrams"
                  className="block p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Group Anagrams
                </Link>
              </li>
              <li>
                <Link 
                  href="/array-string-manipulation/two-sum"
                  className="block p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Two Sum
                </Link>
              </li>
              <li>
                <Link 
                  href="/array-string-manipulation/remove-duplicates"
                  className="block p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Remove Duplicates from Array
                </Link>
              </li>
              <li>
                <Link 
                  href="/array-string-manipulation/flatten-array"
                  className="block p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Flatten Nested Array
                </Link>
              </li>
              <li>
                <Link 
                  href="/array-string-manipulation/longest-substring"
                  className="block p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Longest Substring Without Repeating Characters
                </Link>
              </li>
              <li>
                <Link 
                  href="/array-string-manipulation/rotate-array"
                  className="block p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Rotate Array K Steps
                </Link>
              </li>
              <li>
                <Link 
                  href="/array-string-manipulation/move-zeroes"
                  className="block p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Move Zeroes to End
                </Link>
              </li>
              <li>
                <Link 
                  href="/array-string-manipulation/missing-number"
                  className="block p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Find Missing Number in Range
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
} 