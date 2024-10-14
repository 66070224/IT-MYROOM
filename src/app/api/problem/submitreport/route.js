import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import Problem from "../../../../../models/problem";

export async function POST(req) {
    try {
        const {username, date, title, describe} = await req.json();

        await connectMongoDB();
        await Problem.create({ username, date, title, describe });

        return NextResponse.json({ message: "Creative room reservated"}, {status: 201})
    } catch (error) {
        console.error("Error in makereservationcreative:", error);
        return NextResponse.json({ message: "An error reservating room fail"}, {status: 500})
    }
}