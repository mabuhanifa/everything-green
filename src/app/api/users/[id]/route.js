import User from "@/app/models/User";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

await connectDB();

export async function GET(request, { params }) {
  try {
    const user = await User.findById(params.id, { password: 0 });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 401 });
  }
}
