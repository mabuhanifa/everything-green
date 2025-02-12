import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

await connectDB();

export async function GET(request) {
  try {
    const users = [{ hi: "hello" }];
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 401 });
  }
}
