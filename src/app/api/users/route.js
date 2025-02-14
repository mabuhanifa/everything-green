import User from "@/app/models/User";
import connectDB from "@/utils/db";
import { verifyJWT } from "@/utils/verifyJWT";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

await connectDB();

export async function GET(request) {
  try {
    const token = await verifyJWT(request);
    const users = await User.find({}).select("-password");
    if (token) {
      return NextResponse.json({ users }, { status: 200 });
    }
  } catch (error) {
    console.error("Error in GET /api/users:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const token = await verifyJWT(request);

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { name, email, password } = await request.json();

    const existingUser = await User.findOne({ email }).select("-password");
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    return NextResponse.json(
      { user: { _id: user._id, name, email } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/users:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
