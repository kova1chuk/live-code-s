import AnagramChallengeContent from "@/features/array-string-manipulation/check-anagram/components/AnagramChallengeContent";
import AnagramTestRunner from "@/features/array-string-manipulation/check-anagram/components/AnagramTestRunner";

interface TestCase {
  input: [string, string];
  expected: boolean;
  description: string;
}

interface Solution {
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

interface ChallengeData {
  examples: { input: string; output: string }[];
  testCases: {
    input: [string, string];
    expected: boolean;
    description: string;
  }[];
  solutions: Solution[];
  initialCode: string;
}

export default async function CheckAnagram() {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL || ""
    }/array-string-manipulation/check-anagram/api`,
    { cache: "no-store" }
  );
  const challengeData: ChallengeData = await res.json();

  const testCases = challengeData.testCases.map((test) => ({
    ...test,
    input: test.input as [string, string],
  })) as TestCase[];

  // Server components can't handle interactive state, so only render the challenge content with props
  return (
    <AnagramChallengeContent
      title="Check for Anagram"
      description="Write a function that determines if two strings are anagrams of each other. An anagram is a word or phrase formed by rearranging the letters of another. The function should be case-insensitive and ignore spaces and punctuation."
      examples={challengeData.examples}
      testCases={testCases}
      solutions={challengeData.solutions}
      initialCode={challengeData.initialCode}
      TestRunner={AnagramTestRunner}
      // The following props must be handled in a client component wrapper if interactivity is needed
      input1Value={""}
      input2Value={""}
      onInput1Change={() => {}}
      onInput2Change={() => {}}
      onInputSubmit={() => {}}
      result={""}
      onExampleClick={() => {}}
      onCodeChange={() => {}}
    />
  );
}
