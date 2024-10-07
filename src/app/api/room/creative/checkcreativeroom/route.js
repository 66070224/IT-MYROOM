import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../../lib/mongodb";
import Creativeroom from "../../../../../../models/creativeroom";

export async function POST(req) {
    try {
        await connectMongoDB();
        const { roomname } = await req.json();
        const creativeroom = await Creativeroom.findOne({ roomname }).select("_id");

        return NextResponse.json({ creativeroom });
    } catch (error) {
        console.log(error);
    }
    
}