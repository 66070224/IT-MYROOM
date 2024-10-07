import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const {username, password} = await req.json();
        const hashedpassword = await bcrypt.hash(password, 10);

        await connectMongoDB();
        await User.create({ username, password: hashedpassword });

        return NextResponse.json({ message: "User regitered"}, {status: 201})
    } catch (error) {
        return NextResponse.json({ message: "An error register fail"}, {status: 500})
    }
}