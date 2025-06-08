'use client';
import { useState } from 'react';

export default function NQueens() {
  const [n, setN] = useState<number>(4);
  const [solutions, setSolutions] = useState<string[][]>([]);
  const [explanation, setExplanation] = useState<string[]>([]);

  const isValid = (board: string[][], row: number, col: number): boolean => {
    // Check column
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') return false;
    }

    // Check upper-left diagonal
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 'Q') return false;
    }

    // Check upper-right diagonal
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 'Q') return false;
    }

    return true;
  };

  const solveNQueens = (n: number) => {
    const solutions: string[][] = [];
    const steps: string[] = [];
    const board: string[][] = Array(n).fill(null).map(() => Array(n).fill('.'));

    const backtrack = (row: number) => {
      if (row === n) {
        solutions.push(board.map(row => row.join('')));
        steps.push(`Found solution: ${solutions.length}`);
        return;
      }

      for (let col = 0; col < n; col++) {
        if (isValid(board, row, col)) {
          board[row][col] = 'Q';
          steps.push(`Placing queen at row ${row}, col ${col}`);
          backtrack(row + 1);
          board[row][col] = '.';
          steps.push(`Backtracking at row ${row}, col ${col}`);
        }
      }
    };

    backtrack(0);
    setSolutions(solutions);
    setExplanation(steps);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (n > 0) {
      solveNQueens(n);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">N-Queens Problem</h1>
        
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
            <p className="mb-4">
              The N-Queens puzzle is the problem of placing N queens on an N×N chessboard such that no two queens threaten each other.
              A queen can attack horizontally, vertically, and diagonally.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="font-semibold mb-2">Rules:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Place N queens on an N×N chessboard</li>
                <li>No two queens can be in the same row</li>
                <li>No two queens can be in the same column</li>
                <li>No two queens can be in the same diagonal</li>
              </ul>
              <h3 className="font-semibold mt-4 mb-2">Example (N=4):</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p>Solution 1:</p>
                  <pre className="mt-2 font-mono">
                    .Q..{'\n'}
                    ...Q{'\n'}
                    Q...{'\n'}
                    ..Q.
                  </pre>
                </div>
                <div>
                  <p>Solution 2:</p>
                  <pre className="mt-2 font-mono">
                    ..Q.{'\n'}
                    Q...{'\n'}
                    ...Q{'\n'}
                    .Q..
                  </pre>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Try it out</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="n" className="block mb-2">Enter board size (N):</label>
                <input
                  type="number"
                  id="n"
                  value={n}
                  onChange={(e) => setN(Math.max(1, Math.min(8, parseInt(e.target.value) || 1)))}
                  className="w-24 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  min="1"
                  max="8"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Find Solutions
              </button>
            </form>

            {solutions.length > 0 && (
              <div className="mt-6 space-y-6">
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <h3 className="font-semibold mb-2">Found {solutions.length} Solutions:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {solutions.map((solution, index) => (
                      <div key={index} className="p-4 bg-white dark:bg-gray-800 rounded border dark:border-gray-700">
                        <p className="font-semibold mb-2">Solution {index + 1}:</p>
                        <div className="font-mono">
                          {solution.map((row, i) => (
                            <div key={i} className="flex justify-center">
                              {row.split('').map((cell, j) => (
                                <div
                                  key={j}
                                  className={`w-8 h-8 flex items-center justify-center ${
                                    (i + j) % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
                                  }`}
                                >
                                  {cell === 'Q' ? '♛' : ''}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <h3 className="font-semibold mb-2">Step-by-step Explanation:</h3>
                  <div className="space-y-1">
                    {explanation.map((step, index) => (
                      <p key={index} className="text-sm">{step}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Solution</h2>
            <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-x-auto">
              <code>{`function solveNQueens(n) {
  const solutions = [];
  const board = Array(n).fill(null).map(() => Array(n).fill('.'));
  
  const isValid = (row, col) => {
    // Check column
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') return false;
    }
    
    // Check upper-left diagonal
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 'Q') return false;
    }
    
    // Check upper-right diagonal
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 'Q') return false;
    }
    
    return true;
  };
  
  const backtrack = (row) => {
    if (row === n) {
      solutions.push(board.map(row => row.join('')));
      return;
    }
    
    for (let col = 0; col < n; col++) {
      if (isValid(row, col)) {
        board[row][col] = 'Q';
        backtrack(row + 1);
        board[row][col] = '.';
      }
    }
  };
  
  backtrack(0);
  return solutions;
}`}</code>
            </pre>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Backtracking Approach:
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Place queens row by row</li>
                    <li>For each row, try placing a queen in each column</li>
                    <li>Check if the placement is valid (no conflicts)</li>
                    <li>If valid, move to the next row</li>
                    <li>If invalid or no solution found, backtrack</li>
                  </ul>
                </li>
                <li>Time Complexity: O(N!)
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>For each row, we try N columns</li>
                    <li>For each column, we check O(N) positions</li>
                    <li>Total complexity is O(N!)</li>
                  </ul>
                </li>
                <li>Space Complexity: O(N) for the recursion stack</li>
              </ol>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 