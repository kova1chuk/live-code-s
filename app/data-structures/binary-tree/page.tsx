"use client";
import { useState } from "react";
import ChallengeContent from "@/components/ChallengeContent";

const description =
  "Implement a binary tree with basic operations: insert, search, and traversal methods (inorder, preorder, postorder).";

const examples = [
  {
    input: "insert(5), insert(3), insert(7)",
    output: "Tree: 5\n     /   \\\n    3     7",
  },
  {
    input: "inorder()",
    output: "3 -> 5 -> 7",
  },
  {
    input: "search(3)",
    output: "true",
  },
];

const testCases = [
  {
    input: "insert(5); insert(3); insert(7);",
    expected: "Tree: 5\n     /   \\\n    3     7",
  },
  { input: "inorder();", expected: "3 -> 5 -> 7" },
  { input: "search(3);", expected: "true" },
];

const solutions = [
  {
    id: "binary-tree",
    label: "Binary Tree Implementation",
    description:
      "Implement a binary tree with basic operations and traversals.",
    complexity: {
      time: "O(h) for search/insert, O(n) for traversals",
      space: "O(n)",
    },
    howItWorks: [
      "Each node contains data and references to left and right children.",
      "Insert operations maintain the binary search tree property.",
      "Search operations traverse the tree based on value comparison.",
      "Traversal methods visit nodes in different orders.",
    ],
    advantages: [
      "Efficient search operations in balanced trees.",
      "Natural ordering of elements.",
    ],
    disadvantages: [
      "Can become unbalanced, leading to O(n) operations.",
      "Extra space for node references.",
    ],
    jsCode: `class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(val) {
    const newNode = new TreeNode(val);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (!current.left) {
          current.left = newNode;
          break;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          break;
        }
        current = current.right;
      }
    }
  }

  search(val) {
    let current = this.root;
    while (current) {
      if (val === current.val) return true;
      if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  inorder() {
    const result = [];
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      result.push(node.val);
      traverse(node.right);
    };
    traverse(this.root);
    return result.join(" -> ");
  }

  preorder() {
    const result = [];
    const traverse = (node) => {
      if (!node) return;
      result.push(node.val);
      traverse(node.left);
      traverse(node.right);
    };
    traverse(this.root);
    return result.join(" -> ");
  }

  postorder() {
    const result = [];
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      result.push(node.val);
    };
    traverse(this.root);
    return result.join(" -> ");
  }
}`,
    tsCode: `class TreeNode<T> {
  val: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;

  constructor(val: T) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree<T> {
  private root: TreeNode<T> | null;

  constructor() {
    this.root = null;
  }

  insert(val: T): void {
    const newNode = new TreeNode(val);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (!current.left) {
          current.left = newNode;
          break;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          break;
        }
        current = current.right;
      }
    }
  }

  search(val: T): boolean {
    let current = this.root;
    while (current) {
      if (val === current.val) return true;
      if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  inorder(): string {
    const result: T[] = [];
    const traverse = (node: TreeNode<T> | null) => {
      if (!node) return;
      traverse(node.left);
      result.push(node.val);
      traverse(node.right);
    };
    traverse(this.root);
    return result.join(" -> ");
  }

  preorder(): string {
    const result: T[] = [];
    const traverse = (node: TreeNode<T> | null) => {
      if (!node) return;
      result.push(node.val);
      traverse(node.left);
      traverse(node.right);
    };
    traverse(this.root);
    return result.join(" -> ");
  }

  postorder(): string {
    const result: T[] = [];
    const traverse = (node: TreeNode<T> | null) => {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      result.push(node.val);
    };
    traverse(this.root);
    return result.join(" -> ");
  }
}`,
  },
];

const initialCode = `class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }
  // Implement insert, search, and traversal methods
}`;

function BinaryTreeTestRunner() {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded mt-4">
      <p className="text-gray-700 dark:text-gray-200">
        Test runner coming soon!
      </p>
    </div>
  );
}

export default function BinaryTreePage() {
  const [userCode, setUserCode] = useState(initialCode);
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<string | null>(null);

  return (
    <ChallengeContent
      title="Binary Tree"
      description={description}
      examples={examples}
      testCases={testCases}
      solutions={solutions}
      initialCode={userCode}
      onCodeChange={setUserCode}
      TestRunner={BinaryTreeTestRunner}
      inputValue={inputValue}
      onInputChange={setInputValue}
      onInputSubmit={(e) => {
        e.preventDefault();
        setResult("Custom input evaluation coming soon!");
      }}
      result={result || ""}
      onExampleClick={(example) => setInputValue(example.input)}
      inputLabel="Enter binary tree operations (e.g. insert(5), inorder()):"
      inputPlaceholder="e.g. insert(3), search(5)"
      submitButtonText="Run Operations"
    />
  );
}
