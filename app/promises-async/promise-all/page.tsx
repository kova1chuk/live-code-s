'use client';
import { useState } from 'react';

export default function PromiseAll() {
  const [promises, setPromises] = useState<string>('1000, 2000, 3000');
  const [result, setResult] = useState<string[]>([]);
  const [explanation, setExplanation] = useState<string[]>([]);

  const myPromiseAll = async <T,>(promises: Promise<T>[]): Promise<T[]> => {
    const steps: string[] = [];
    const results: T[] = [];

    steps.push('Starting Promise.all implementation');
    steps.push(`Number of promises: ${promises.length}`);

    try {
      for (let i = 0; i < promises.length; i++) {
        steps.push(`\nProcessing promise ${i + 1}`);
        try {
          const result = await promises[i];
          results.push(result);
          steps.push(`Promise ${i + 1} resolved with: ${result}`);
        } catch (error) {
          steps.push(`Promise ${i + 1} rejected with: ${error}`);
          throw error;
        }
      }
      steps.push('\nAll promises resolved successfully');
      setExplanation(steps);
      return results;
    } catch (error) {
      steps.push('\nOne of the promises was rejected');
      setExplanation(steps);
      throw error;
    }
  };

} 