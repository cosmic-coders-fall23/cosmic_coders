import connectDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const users = await User.find();
  return NextResponse.json({ users });
}

