import connectDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(request: { json: () => PromiseLike<{ email: any; username: any; password: any; }> | { email: any; username: any; password: any; }; }) {
  await connectDB();

  try {
    const { email, username, password } = await request.json();

    // Checking if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json({ message: "Username already exists" }, { status: 400 });
    }

    // Hashing the password before storing it
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await User.create({ email, username, password: hashedPassword });
    return NextResponse.json({ message: "User created successfully" }, { status: 201 });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ message: "Error signing up. Please try again." }, { status: 500 });
  }
}
