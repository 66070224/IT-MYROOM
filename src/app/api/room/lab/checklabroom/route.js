import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../../lib/mongodb";
import Labroom from "../../../../../../models/labroom";

export async function POST(req) {
    try {
        await connectMongoDB();
        const { roomname } = await req.json();
        const labroom = await Labroom.findOne({ roomname }).select("_id");

        return NextResponse.json({ labroom });
    } catch (error) {
        console.log(error);
    }
    
}