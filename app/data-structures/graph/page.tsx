"use client";
import { useState } from "react";
import ChallengeContent from "@/components/ChallengeContent";

const description =
  "Implement a graph data structure with basic operations: add vertex, add edge, and traversal methods (BFS, DFS).";

const examples = [
  {
    input: "addVertex('A'), addVertex('B'), addEdge('A', 'B')",
    output: "Graph: A -> B",
  },
  {
    input: "bfs('A')",
    output: "A -> B",
  },
  {
    input: "dfs('A')",
    output: "A -> B",
  },
];

const testCases = [
  {
    input: "addVertex('A'); addVertex('B'); addEdge('A', 'B');",
    expected: "Graph: A -> B",
  },
  { input: "bfs('A');", expected: "A -> B" },
  { input: "dfs('A');", expected: "A -> B" },
];

const solutions = [
  {
    id: "adjacency-list",
    label: "Adjacency List Implementation",
    description: "Implement a graph using an adjacency list representation.",
    complexity: {
      time: "O(V + E) for traversals, O(1) for add operations",
      space: "O(V + E)",
    },
    howItWorks: [
      "Use a Map to store vertices and their adjacent vertices.",
      "Add vertex creates a new entry in the map.",
      "Add edge adds vertices to each other's adjacency lists.",
      "BFS uses a queue to visit vertices level by level.",
      "DFS uses recursion or a stack to visit vertices depth-first.",
    ],
    advantages: [
      "Space efficient for sparse graphs.",
      "Fast to iterate over edges.",
    ],
    disadvantages: [
      "Slower to check if an edge exists.",
      "More complex to implement than adjacency matrix.",
    ],
    jsCode: `class Graph {
  constructor() {
    this.vertices = new Map();
  }

  addVertex(vertex) {
    if (!this.vertices.has(vertex)) {
      this.vertices.set(vertex, []);
    }
  }

  addEdge(vertex1, vertex2) {
    if (!this.vertices.has(vertex1) || !this.vertices.has(vertex2)) {
      return;
    }
    this.vertices.get(vertex1).push(vertex2);
    this.vertices.get(vertex2).push(vertex1);
  }

  bfs(startVertex) {
    if (!this.vertices.has(startVertex)) return [];
    
    const visited = new Set();
    const queue = [startVertex];
    const result = [];
    
    visited.add(startVertex);
    
    while (queue.length > 0) {
      const vertex = queue.shift();
      result.push(vertex);
      
      for (const neighbor of this.vertices.get(vertex)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    
    return result.join(" -> ");
  }

  dfs(startVertex) {
    if (!this.vertices.has(startVertex)) return [];
    
    const visited = new Set();
    const result = [];
    
    const traverse = (vertex) => {
      visited.add(vertex);
      result.push(vertex);
      
      for (const neighbor of this.vertices.get(vertex)) {
        if (!visited.has(neighbor)) {
          traverse(neighbor);
        }
      }
    };
    
    traverse(startVertex);
    return result.join(" -> ");
  }
}`,
    tsCode: `class Graph {
  private vertices: Map<string, string[]>;

  constructor() {
    this.vertices = new Map();
  }

  addVertex(vertex: string): void {
    if (!this.vertices.has(vertex)) {
      this.vertices.set(vertex, []);
    }
  }

  addEdge(vertex1: string, vertex2: string): void {
    if (!this.vertices.has(vertex1) || !this.vertices.has(vertex2)) {
      return;
    }
    this.vertices.get(vertex1)!.push(vertex2);
    this.vertices.get(vertex2)!.push(vertex1);
  }

  bfs(startVertex: string): string {
    if (!this.vertices.has(startVertex)) return "";
    
    const visited = new Set<string>();
    const queue: string[] = [startVertex];
    const result: string[] = [];
    
    visited.add(startVertex);
    
    while (queue.length > 0) {
      const vertex = queue.shift()!;
      result.push(vertex);
      
      for (const neighbor of this.vertices.get(vertex)!) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    
    return result.join(" -> ");
  }

  dfs(startVertex: string): string {
    if (!this.vertices.has(startVertex)) return "";
    
    const visited = new Set<string>();
    const result: string[] = [];
    
    const traverse = (vertex: string) => {
      visited.add(vertex);
      result.push(vertex);
      
      for (const neighbor of this.vertices.get(vertex)!) {
        if (!visited.has(neighbor)) {
          traverse(neighbor);
        }
      }
    };
    
    traverse(startVertex);
    return result.join(" -> ");
  }
}`,
  },
];

const initialCode = `class Graph {
  constructor() {
    this.vertices = new Map();
  }
  // Implement addVertex, addEdge, bfs, and dfs methods
}`;

function GraphTestRunner() {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded mt-4">
      <p className="text-gray-700 dark:text-gray-200">
        Test runner coming soon!
      </p>
    </div>
  );
}

export default function GraphPage() {
  const [userCode, setUserCode] = useState(initialCode);
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<string | null>(null);

  return (
    <ChallengeContent
      title="Graph"
      description={description}
      examples={examples}
      testCases={testCases}
      solutions={solutions}
      initialCode={userCode}
      onCodeChange={setUserCode}
      TestRunner={GraphTestRunner}
      inputValue={inputValue}
      onInputChange={setInputValue}
      onInputSubmit={(e) => {
        e.preventDefault();
        setResult("Custom input evaluation coming soon!");
      }}
      result={result || ""}
      onExampleClick={(example) => setInputValue(example.input)}
      inputLabel="Enter graph operations (e.g. addVertex('A'), addEdge('A', 'B')):"
      inputPlaceholder="e.g. addVertex('C'), bfs('A')"
      submitButtonText="Run Operations"
    />
  );
}
