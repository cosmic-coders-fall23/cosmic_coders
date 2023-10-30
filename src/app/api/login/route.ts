import connectDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(request) {
  await connectDB();

  try {
    const { email, password } = await request.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // Here, you can generate a JWT or set up a session for user authentication

    return NextResponse.json({ message: "Login successful" });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: "Error during login. Please try again." }, { status: 500 });
  }
}
