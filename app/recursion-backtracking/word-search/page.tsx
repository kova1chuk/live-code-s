'use client';
import { useState } from 'react';

export default function WordSearch() {
  const [board, setBoard] = useState<string[][]>([
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E']
  ]);
  const [word, setWord] = useState<string>('');
  const [result, setResult] = useState<boolean | null>(null);
  const [explanation, setExplanation] = useState<string[]>([]);

  const exist = (board: string[][], word: string): boolean => {
    const rows = board.length;
    const cols = board[0].length;
    const steps: string[] = [];

    const dfs = (row: number, col: number, index: number): boolean => {
      if (index === word.length) {
        steps.push(`Found complete word: ${word}`);
        return true;
      }

      if (row < 0 || row >= rows || col < 0 || col >= cols || 
          board[row][col] !== word[index]) {
        return false;
      }

      const temp = board[row][col];
      board[row][col] = '#';
      steps.push(`Checking position (${row}, ${col}) for letter '${word[index]}'`);

      const found = dfs(row + 1, col, index + 1) ||
                   dfs(row - 1, col, index + 1) ||
                   dfs(row, col + 1, index + 1) ||
                   dfs(row, col - 1, index + 1);

      board[row][col] = temp;
      if (!found) {
        steps.push(`Backtracking from position (${row}, ${col})`);
      }

      return found;
    };

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (dfs(i, j, 0)) {
          setExplanation(steps);
          return true;
        }
      }
    }

    setExplanation(steps);
    return false;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (word) {
      const newBoard = board.map(row => [...row]);
      const result = exist(newBoard, word.toUpperCase());
      setResult(result);
    }
  };

  const handleBoardChange = (row: number, col: number, value: string) => {
    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = value.toUpperCase();
    setBoard(newBoard);
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Word Search</h1>
        
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
            <p className="mb-4">
              Given an m x n grid of characters board and a string word, return true if word exists in the grid.
              The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring.
              The same letter cell may not be used more than once.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="font-semibold mb-2">Example:</h3>
              <p>Input:</p>
              <pre className="mt-2 font-mono">
                board = [
                  ['A','B','C','E'],
                  ['S','F','C','S'],
                  ['A','D','E','E']
                ]
                word = "ABCCED"
              </pre>
              <p>Output: true</p>
              <p className="mt-2">Explanation: The word "ABCCED" can be found in the grid by connecting adjacent letters.</p>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Try it out</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Board:</h3>
                <div className="grid gap-2">
                  {board.map((row, i) => (
                    <div key={i} className="flex gap-2">
                      {row.map((cell, j) => (
                        <input
                          key={j}
                          type="text"
                          maxLength={1}
                          value={cell}
                          onChange={(e) => handleBoardChange(i, j, e.target.value)}
                          className="w-12 h-12 text-center border rounded dark:bg-gray-700 dark:border-gray-600"
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="word" className="block mb-2">Enter word to search:</label>
                  <input
                    type="text"
                    id="word"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                    placeholder="Enter word"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Search Word
                </button>
              </form>

              {result !== null && (
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <p className="font-semibold">Result:</p>
                  <p className={result ? 'text-green-600' : 'text-red-600'}>
                    {result ? 'Word found!' : 'Word not found'}
                  </p>
                </div>
              )}

              {explanation.length > 0 && (
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <h3 className="font-semibold mb-2">Step-by-step Explanation:</h3>
                  <div className="space-y-1">
                    {explanation.map((step, index) => (
                      <p key={index} className="text-sm">{step}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Solution</h2>
            <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-x-auto">
              <code>{`function exist(board, word) {
  const rows = board.length;
  const cols = board[0].length;
  
  const dfs = (row, col, index) => {
    // If we've found all characters
    if (index === word.length) return true;
    
    // Check boundaries and character match
    if (row < 0 || row >= rows || col < 0 || col >= cols || 
        board[row][col] !== word[index]) {
      return false;
    }
    
    // Mark current cell as visited
    const temp = board[row][col];
    board[row][col] = '#';
    
    // Try all four directions
    const found = dfs(row + 1, col, index + 1) ||
                 dfs(row - 1, col, index + 1) ||
                 dfs(row, col + 1, index + 1) ||
                 dfs(row, col - 1, index + 1);
    
    // Restore the cell
    board[row][col] = temp;
    
    return found;
  };
  
  // Try starting from each cell
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (dfs(i, j, 0)) return true;
    }
  }
  
  return false;
}`}</code>
            </pre>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>DFS with Backtracking Approach:
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Start from each cell in the grid</li>
                    <li>Use DFS to explore all possible paths</li>
                    <li>Mark visited cells to avoid reuse</li>
                    <li>Backtrack by restoring the cell value</li>
                  </ul>
                </li>
                <li>Time Complexity: O(m * n * 4^L)
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>m * n is the grid size</li>
                    <li>4^L is the number of possible paths</li>
                    <li>L is the length of the word</li>
                  </ul>
                </li>
                <li>Space Complexity: O(L) for the recursion stack</li>
              </ol>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 