import { NextResponse } from "next/server";
import data from "@/features/array-string-manipulation/check-anagram/data.json";

export async function GET() {
  return NextResponse.json(data);
}
