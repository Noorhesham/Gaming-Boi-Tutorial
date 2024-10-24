"use server";
import connect from "@/lib/connect";
import bcrypt from "bcrypt";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_EXPIRES = 90 * 60;
// const REFRESH_TOKEN_EXPIRES = "7d";
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!!, {
    expiresIn: JWT_EXPIRES,
  });
};
export const signup = async (data: any) => {
  try {
    await connect();
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await User.create({
      ...data,
      password: hashedPassword,
    });
    const userObj = JSON.parse(JSON.stringify(newUser));
    return { success: "User created successfully", data: userObj };
  } catch (error: any) {
    console.log(error);
    return { error: "User creation failed", details: error.message };
  }
};

export const login = async (data: { email: string; password: string }) => {
  try {
    await connect();
    const user = await User.findOne({ email: data.email }).select("+password");
    if (!user) {
      return { error: "User not found" };
    }
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      return { error: "Incorrect email or password !" }; //not make them know if it is the password or email
    }
    const userObj = JSON.parse(JSON.stringify(user));
    const token = generateToken(user._id);
    cookies().set("token", token, {
      httpOnly: true,
      maxAge: JWT_EXPIRES,
      sameSite: "strict",
      path: "/",
    });

    return { success: "Login successful", data: userObj };
  } catch (error: any) {
    console.log(error);
    return { error: "Login failed", details: error.message };
  }
};
export const protect = async () => {
  try {
    await connect();
    const token = cookies().get("token")?.value;
    if (!token) {
      return { error: "Authentication failed. No token provided." };
    }
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {
      return { error: "Invalid or expired token." };
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      return { error: "User not found." };
    }
    const userObj = JSON.parse(JSON.stringify(user));
    return { success: true, data: userObj };
  } catch (error: any) {
    console.log(error);
    return { error: "An error occurred.", details: error.message };
  }
};

export const logout = async () => {
  cookies().set("token", "", {
    httpOnly: true,
    maxAge: 0,
    sameSite: "strict",
    path: "/",
  });
  return { success: "Logout successful" };
};
