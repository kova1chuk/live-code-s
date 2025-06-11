export interface Example {
  input: string;
  output: string;
}

export interface TestCase {
  input: string;
  expected: string;
  description?: string;
}

export interface Solution {
  id: string;
  label: string;
  description: string;
  complexity: { time: string; space: string };
  howItWorks: string[];
  advantages: string[];
  disadvantages: string[];
  jsCode: string;
  tsCode: string;
}

export interface ChallengeContentProps<
  TestRunnerProps = Record<string, unknown>
> {
  title: string;
  description: string;
  examples: Example[];
  testCases: TestCase[];
  solutions: Solution[];
  initialCode: string;
  onCodeChange: (code: string) => void;
  TestRunner: React.ComponentType<TestRunnerProps>;
  inputValue: string;
  onInputChange: (value: string) => void;
  onInputSubmit: (e: React.FormEvent) => void;
  result: string | null;
  onExampleClick: (example: Example) => void;
  inputLabel?: string;
  inputPlaceholder?: string;
  submitButtonText?: string;
  customTestComponent?: React.ReactNode;
}
