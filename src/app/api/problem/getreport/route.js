import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import Problem from "../../../../../models/problem";

export async function POST(req) {
    try {
        const { username, day } = await req.json();
        await connectMongoDB();

        const query = {};

        if (username) {
            query.username = username;
        }
        if (day) {
            query.day = day;
        }

        const problems = await Problem.find(query);
        
        return NextResponse.json({ problems });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "An error occurred while fetching reservations." }, { status: 500 });
    }
}
