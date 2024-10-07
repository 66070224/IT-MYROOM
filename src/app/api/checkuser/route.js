import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";

export async function POST(req) {
    try {
        await connectMongoDB();
        const { username } = await req.json();
        const user = await User.findOne({ username }).select("_id");
        console.log("User:", user)

        return NextResponse.json({ user });
    } catch (error) {
        console.log(error);
    }
    
}