import CheckAnagramChallengeContent from "@/features/array-string-manipulation/check-anagram/components/CheckAnagramChallengeContent";
import data from "@/features/array-string-manipulation/check-anagram/data.json";

export default async function CheckAnagram() {
  return (
    <CheckAnagramChallengeContent
      title={data.title}
      description={data.description}
      examples={data.examples}
      testCases={data.testCases}
      solutions={data.solutions}
      initialCode={data.initialCode}
    />
  );
}
