import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../../lib/mongodb";
import Labroom from "../../../../../../models/creativeroom";

export async function POST(req) {
    try {
        const {roomname, available} = await req.json();

        await connectMongoDB();
        const newRoom = await Labroom.create({ roomname, available });

        return NextResponse.json({ message: "Add lab room", newRoom}, {status: 201})
    } catch (error) {
        return NextResponse.json({ message: "An error add lab room fail"}, {status: 500})
    }
}