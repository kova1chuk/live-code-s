import Typography from "@/components/ui/Typography";
import ChallengeCard from "@/components/ChallengeCard";
import type { ChallengeCardProps } from "@/components/ChallengeCard";

interface ProblemSection {
  category: string;
  items: Omit<ChallengeCardProps, "className">[];
}

export default function ArrayStringManipulation() {
  const problems: ProblemSection[] = [
    {
      category: "String Operations",
      items: [
        {
          title: "Reverse a String",
          path: "/array-string-manipulation/reverse-string",
          description:
            "Learn different approaches to reverse a string efficiently",
          difficulty: "Easy",
        },
        {
          title: "Check for Anagram",
          path: "/array-string-manipulation/check-anagram",
          description: "Determine if two strings are anagrams of each other",
          difficulty: "Easy",
        },
        {
          title: "Group Anagrams",
          path: "/array-string-manipulation/group-anagrams",
          description: "Group strings that are anagrams into separate arrays",
          difficulty: "Medium",
        },
        {
          title: "String Manipulation",
          path: "/array-string-manipulation/string-manipulation",
          description: "Common string manipulation techniques and patterns",
          difficulty: "Medium",
        },
        {
          title: "Longest Substring",
          path: "/array-string-manipulation/longest-substring",
          description: "Find longest substring without repeating characters",
          difficulty: "Medium",
        },
      ],
    },
    {
      category: "Array Operations",
      items: [
        {
          title: "Two Sum",
          path: "/array-string-manipulation/two-sum",
          description: "Find two numbers in an array that add up to a target",
          difficulty: "Easy",
        },
        {
          title: "Remove Duplicates",
          path: "/array-string-manipulation/remove-duplicates",
          description: "Remove duplicate elements from an array",
          difficulty: "Easy",
        },
        {
          title: "Flatten Array",
          path: "/array-string-manipulation/flatten-array",
          description: "Flatten a nested array structure",
          difficulty: "Medium",
        },
        {
          title: "Rotate Array",
          path: "/array-string-manipulation/rotate-array",
          description: "Rotate array elements by K positions",
          difficulty: "Medium",
        },
        {
          title: "Move Zeroes",
          path: "/array-string-manipulation/move-zeroes",
          description: "Move all zeroes to the end while maintaining order",
          difficulty: "Easy",
        },
        {
          title: "Find Missing Number",
          path: "/array-string-manipulation/missing-number",
          description: "Find the missing number in a range of numbers",
          difficulty: "Easy",
        },
        {
          title: "Array Methods",
          path: "/array-string-manipulation/array-methods",
          description: "Common array methods and their implementations",
          difficulty: "Medium",
        },
      ],
    },
    {
      category: "Advanced Topics",
      items: [
        {
          title: "Matrix Operations",
          path: "/array-string-manipulation/matrix",
          description: "Operations on 2D arrays and matrices",
          difficulty: "Hard",
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
            Array & String Manipulation
          </Typography>
          <Typography className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Master common array and string manipulation techniques through
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
