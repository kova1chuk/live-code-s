interface ChallengeConfig {
  title: string;
  description: string;
}

interface SectionConfig {
  title: string;
  description: string;
  challenges?: Record<string, ChallengeConfig>;
}

const SECTION_CONFIGS: Record<string, SectionConfig> = {
  "array-string-manipulation": {
    title: "Array & String Manipulation",
    description:
      "Learn and practice common array and string manipulation techniques",
    challenges: {
      "two-sum": {
        title: "Two Sum",
        description:
          "Given an array of integers nums and an integer target, return indices of the two numbers in the array such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
      },
      "rotate-array": {
        title: "Rotate Array",
        description:
          "Given an array, rotate the array to the right by k steps, where k is non-negative.",
      },
      "reverse-string": {
        title: "Reverse String",
        description:
          "Write a function that reverses a string. The input string is given as an array of characters.",
      },
    },
  },
  "data-structures": {
    title: "Data Structures",
    description:
      "Explore fundamental data structures and their implementations",
    challenges: {
      "linked-list": {
        title: "Linked List",
        description:
          "Implement a singly linked list data structure with basic operations.",
      },
      "binary-tree": {
        title: "Binary Tree",
        description:
          "Implement a binary tree data structure with traversal methods.",
      },
    },
  },
  algorithms: {
    title: "Algorithms",
    description:
      "Master essential algorithmic techniques and problem-solving strategies",
  },
  "dynamic-programming": {
    title: "Dynamic Programming",
    description:
      "Practice solving complex problems using dynamic programming techniques",
  },
  "system-design": {
    title: "System Design",
    description: "Learn how to design scalable and efficient software systems",
  },
};

export type { SectionConfig, ChallengeConfig };
export { SECTION_CONFIGS };
