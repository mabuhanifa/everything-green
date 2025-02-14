import User from "@/app/models/User";
import connectDB from "@/utils/db";
import { verifyJWT } from "@/utils/verifyJWT";
import { NextResponse } from "next/server";

await connectDB();

export async function GET(request, { params }) {
  try {
    const token = await verifyJWT(request);
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const user = await User.findById(params.id, { password: 0 });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/users/[id]:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
