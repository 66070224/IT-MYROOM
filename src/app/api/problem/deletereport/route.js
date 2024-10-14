import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import Problem from "../../../../../models/problem";

export async function POST(req) {
    try {
        const { _id } = await req.json();
        await connectMongoDB();


        const deletedProblem = await Problem.findByIdAndDelete(_id);

        if (!deletedProblem) {
            return NextResponse.json({ error: "Problem not found" }, { status: 404 });
        }

        return NextResponse.json({ deletedProblem });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "An error occurred while deleteing report" }, { status: 500 });
    }
}
