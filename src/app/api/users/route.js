import User from "@/app/models/User";
import connectDB from "@/utils/db";
import { generateToken } from "@/utils/jwt";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

await connectDB();

export async function GET(request) {
  try {
    const users = await User.find({}).select("-password");
    const token = generateToken(users._id);
    return NextResponse.json({ users, token });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 401 });
  }
}

export async function POST(request) {
  try {
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

    return NextResponse.json({ user: { _id: user._id, name, email } });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
