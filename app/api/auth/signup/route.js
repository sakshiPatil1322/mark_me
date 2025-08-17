// app/api/auth/signup/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/config/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { 
      name, 
      email, 
      password, 
      role, 
      rollNumber, 
      standard, 
      division, 
      secretKey 
    } = await req.json();

    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists." }, 
        { status: 400 }
      );
    }

    // Validate secret key for teacher & principle
    if (role === "teacher" && secretKey !== process.env.TEACHER_SECRET_KEY) {
      return NextResponse.json(
        { error: "Invalid secret key for Teacher registration." }, 
        { status: 401 }
      );
    }

    if (role === "principle" && secretKey !== process.env.PRINCIPLE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Invalid secret key for Principle registration." }, 
        { status: 401 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare user data
    const userData = { name, email, password: hashedPassword, role };

    if (role === "student") {
      userData.rollNumber = rollNumber;
      userData.standard = standard;
      userData.division = division;
    }

    // Save user
    const newUser = await User.create(userData);

    return NextResponse.json(
      { message: "User registered successfully.", user: newUser }, 
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json(
      { error: "Server error, please try again later." }, 
      { status: 500 }
    );
  }
}
