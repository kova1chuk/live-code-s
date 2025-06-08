import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">JavaScript Practice Problems</h1>
        <div className="grid gap-4">
          <Link 
            href="/array-string-manipulation"
            className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Array & String Manipulation
          </Link>
          
          <Link 
            href="/data-structures"
            className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Data Structures
          </Link>
          
          <Link 
            href="/recursion-backtracking"
            className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Recursion & Backtracking
          </Link>
          
          <Link 
            href="/sorting-searching"
            className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Sorting & Searching
          </Link>
          
          <Link 
            href="/promises-async"
            className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Promises & Async
          </Link>
          
          <Link 
            href="/object-functional"
            className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Object & Functional
          </Link>
          
          <Link 
            href="/parsing-formatting"
            className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Parsing & Formatting
          </Link>
        </div>
      </main>
    </div>
  );
}
