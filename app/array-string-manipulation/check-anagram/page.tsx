import AnagramChallengeContent from "@/features/array-string-manipulation/check-anagram/components/AnagramChallengeContent";
import AnagramTestRunner from "@/features/array-string-manipulation/check-anagram/components/AnagramTestRunner";
import challengeData from "@/features/array-string-manipulation/check-anagram/data.json";

export default async function CheckAnagram() {
  // Ensure testCases input is always a tuple [string, string]
  const mappedTestCases = challengeData.testCases.map((tc) => ({
    ...tc,
    input: tc.input as [string, string],
  }));

  return (
    <AnagramChallengeContent
      title="Check for Anagram"
      description="Write a function that determines if two strings are anagrams of each other. An anagram is a word or phrase formed by rearranging the letters of another. The function should be case-insensitive and ignore spaces and punctuation."
      examples={challengeData.examples}
      testCases={mappedTestCases}
      solutions={challengeData.solutions}
      initialCode={challengeData.initialCode}
      TestRunner={AnagramTestRunner}
    />
  );
}
