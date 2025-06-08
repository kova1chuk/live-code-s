'use client';
import { useState } from 'react';

export default function DateFormatting() {
  const [date, setDate] = useState<string>('2024-03-15T14:30:00');
  const [format, setFormat] = useState<string>('YYYY-MM-DD HH:mm:ss');
  const [result, setResult] = useState<string>('');
  const [explanation, setExplanation] = useState<string[]>([]);

  const formatDate = (date: Date, format: string): string => {
    const steps: string[] = [];
    steps.push('Starting date formatting implementation');

    const formatMap: { [key: string]: () => string } = {
      'YYYY': () => {
        steps.push('Formatting year (YYYY)');
        return date.getFullYear().toString();
      },
      'MM': () => {
        steps.push('Formatting month (MM)');
        return (date.getMonth() + 1).toString().padStart(2, '0');
      },
      'DD': () => {
        steps.push('Formatting day (DD)');
        return date.getDate().toString().padStart(2, '0');
      },
      'HH': () => {
        steps.push('Formatting hours (HH)');
        return date.getHours().toString().padStart(2, '0');
      },
      'mm': () => {
        steps.push('Formatting minutes (mm)');
        return date.getMinutes().toString().padStart(2, '0');
      },
      'ss': () => {
        steps.push('Formatting seconds (ss)');
        return date.getSeconds().toString().padStart(2, '0');
      },
      'A': () => {
        steps.push('Formatting AM/PM (A)');
        return date.getHours() >= 12 ? 'PM' : 'AM';
      },
      'a': () => {
        steps.push('Formatting am/pm (a)');
        return date.getHours() >= 12 ? 'pm' : 'am';
      },
      'h': () => {
        steps.push('Formatting 12-hour (h)');
        const hours = date.getHours() % 12 || 12;
        return hours.toString();
      }
    };

    let result = format;
    steps.push(`Initial format string: ${format}`);

    // Replace format tokens with actual values
    Object.entries(formatMap).forEach(([token, formatter]) => {
      if (format.includes(token)) {
        const value = formatter();
        result = result.replace(token, value);
        steps.push(`Replaced ${token} with ${value}`);
      }
    });

    steps.push(`Final formatted date: ${result}`);
    setExplanation(steps);
    return result;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult('');
    setExplanation([]);
    
    try {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) {
        throw new Error('Invalid date');
      }
      const formatted = formatDate(dateObj, format);
      setResult(formatted);
    } catch (error: any) {
      setResult(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Implement Date Formatting</h1>
        
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
            <p className="mb-4">
              Implement a function that formats a date according to a specified format string.
              The format string can include various tokens like YYYY, MM, DD, HH, mm, ss, etc.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
              <h3 className="font-semibold mb-2">Example:</h3>
              <p>Input: 2024-03-15T14:30:00</p>
              <p>Format: YYYY-MM-DD HH:mm:ss</p>
              <p>Output: 2024-03-15 14:30:00</p>
              <p className="mt-2">Supported Tokens:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>YYYY - Full year</li>
                <li>MM - Month (01-12)</li>
                <li>DD - Day (01-31)</li>
                <li>HH - Hours (00-23)</li>
                <li>mm - Minutes (00-59)</li>
                <li>ss - Seconds (00-59)</li>
                <li>A - AM/PM</li>
                <li>a - am/pm</li>
                <li>h - 12-hour format</li>
              </ul>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Try it out</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="date" className="block mb-2">Date:</label>
                <input
                  type="datetime-local"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label htmlFor="format" className="block mb-2">Format:</label>
                <input
                  type="text"
                  id="format"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="YYYY-MM-DD HH:mm:ss"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Format Date
              </button>
            </form>

            {result && (
              <div className="mt-6 space-y-6">
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <h3 className="font-semibold mb-2">Result:</h3>
                  <p className="text-green-600">{result}</p>
                </div>

                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <h3 className="font-semibold mb-2">Step-by-step Explanation:</h3>
                  <div className="space-y-1">
                    {explanation.map((step, index) => (
                      <p key={index} className="text-sm whitespace-pre-line">{step}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>

          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Solution</h2>
            <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-x-auto">
              <code>{`function formatDate(date: Date, format: string): string {
  const formatMap = {
    'YYYY': () => date.getFullYear().toString(),
    'MM': () => (date.getMonth() + 1).toString().padStart(2, '0'),
    'DD': () => date.getDate().toString().padStart(2, '0'),
    'HH': () => date.getHours().toString().padStart(2, '0'),
    'mm': () => date.getMinutes().toString().padStart(2, '0'),
    'ss': () => date.getSeconds().toString().padStart(2, '0'),
    'A': () => date.getHours() >= 12 ? 'PM' : 'AM',
    'a': () => date.getHours() >= 12 ? 'pm' : 'am',
    'h': () => (date.getHours() % 12 || 12).toString()
  };

  let result = format;
  Object.entries(formatMap).forEach(([token, formatter]) => {
    if (format.includes(token)) {
      result = result.replace(token, formatter());
    }
  });

  return result;
}`}</code>
            </pre>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Implementation Approach:
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Token-based formatting</li>
                    <li>Format map for tokens</li>
                    <li>String replacement</li>
                    <li>Padding for numbers</li>
                  </ul>
                </li>
                <li>Key Features:
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Multiple format tokens</li>
                    <li>12/24 hour support</li>
                    <li>AM/PM handling</li>
                    <li>Zero padding</li>
                  </ul>
                </li>
                <li>Time Complexity: O(n) where n is the length of the format string</li>
              </ol>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 