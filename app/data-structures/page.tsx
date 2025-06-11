import Typography from "@/components/ui/Typography";
import ChallengeCard from "@/components/ChallengeCard";

export default function DataStructures() {
  const problems = [
    {
      category: "Fundamental Structures",
      items: [
        {
          title: "Linked List",
          path: "/data-structures/linked-list",
          description: "Implement a singly linked list with basic operations.",
          difficulty: "Medium" as const,
        },
        {
          title: "Binary Tree",
          path: "/data-structures/binary-tree",
          description: "Implement a binary tree and traversal methods.",
          difficulty: "Medium" as const,
        },
        {
          title: "Graph",
          path: "/data-structures/graph",
          description: "Implement a graph and basic traversal algorithms.",
          difficulty: "Hard" as const,
        },
        {
          title: "Hash Table",
          path: "/data-structures/hash-table",
          description: "Implement a hash table with collision handling.",
          difficulty: "Medium" as const,
        },
        {
          title: "Stack & Queue",
          path: "/data-structures/stack-queue",
          description: "Compare and implement stack and queue data structures.",
          difficulty: "Easy" as const,
        },
      ],
    },
    {
      category: "Core Structures",
      items: [
        {
          title: "Stack",
          path: "/data-structures/stack",
          description:
            "Implement a stack using arrays with push, pop, peek, and isEmpty operations.",
          difficulty: "Easy" as const,
        },
        {
          title: "Queue",
          path: "/data-structures/queue",
          description:
            "Implement a queue using arrays with enqueue, dequeue, peek, and isEmpty operations.",
          difficulty: "Easy" as const,
        },
        {
          title: "HashMap",
          path: "/data-structures/hashmap",
          description:
            "Design a HashMap (or Set) with put, get, remove, and contains operations.",
          difficulty: "Medium" as const,
        },
        {
          title: "LRU Cache",
          path: "/data-structures/lru-cache",
          description:
            "Implement a Least Recently Used (LRU) cache with O(1) get and put.",
          difficulty: "Medium" as const,
        },
        {
          title: "Validate Parentheses",
          path: "/data-structures/validate-parentheses",
          description: "Check if a string of brackets is valid using a stack.",
          difficulty: "Easy" as const,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-900">
      <main className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Typography
            variant="h1"
            className="text-4xl sm:text-5xl font-bold mb-4"
          >
            Data Structures
          </Typography>
          <Typography className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Practice classic data structure problems and implementations through
            interactive challenges
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {problems.map((section) => (
            <div key={section.category} className="space-y-4">
              <Typography
                variant="h2"
                className="text-2xl font-bold border-b pb-2 mb-4 dark:border-gray-700"
              >
                {section.category}
              </Typography>
              <div className="space-y-4">
                {section.items.map((problem) => (
                  <ChallengeCard key={problem.path} {...problem} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
