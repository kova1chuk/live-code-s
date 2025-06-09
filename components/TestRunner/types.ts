export interface BaseTestCase {
  description?: string;
}

export interface TestResult<TExpected = unknown, TActual = unknown> {
  passed: boolean;
  error?: string;
  actual?: TActual;
  expected: TExpected;
  description?: string;
}

export interface TestRunnerProps<
  T extends BaseTestCase,
  TFn extends (...args: never[]) => unknown
> {
  testCases: T[];
  code: string;
  onRunTests: () => void;
  className?: string;
  functionName?: string;
  runTest: (testCase: T, fn: TFn) => TestResult;
  formatInput: (testCase: T) => string;
}
