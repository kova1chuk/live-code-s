import ReverseStringChallengeContent from "@/features/array-string-manipulation/reverse-string/components/ReverseStringChallengeContent";
import data from "@/features/array-string-manipulation/reverse-string/data.json";

export default function ReverseString() {
  return (
    <ReverseStringChallengeContent
      title={data.title}
      description={data.description}
      examples={data.examples}
      testCases={data.testCases}
      solutions={data.solutions}
      initialCode={data.initialCode}
    />
  );
}
