import React from "react";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/common/database";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";

export const POST = async (request: any) => {
  const { email, password } = await request.json();
  await dbConnect();

  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    return NextResponse.json({ msg: "User already existed" }, { status: 400 });
  }
  try {
    const password_hash = await bcrypt.hash(password, 5);

    const newUser = new User({
      email,
      password: password_hash,
    });

    await newUser.save();
    return NextResponse.json(
      { msg: "User is ceated Successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ msg: err }, { status: 500 });
  }
};
