import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../../lib/mongodb";
import Creativeroom from "../../../../../../models/creativeroom";

export async function POST(req) {
    try {
        const {roomname, available} = await req.json();

        await connectMongoDB();
        const newRoom = await Creativeroom.create({ roomname, available });

        return NextResponse.json({ message: "Add creative room", newRoom}, {status: 201})
    } catch (error) {
        return NextResponse.json({ message: "An error add creative room fail"}, {status: 500})
    }
}