import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../../lib/mongodb";
import Creativeroom from "../../../../../../models/creativeroom";

export async function POST(req) {
    try {
        const { roomname } = await req.json();
        await connectMongoDB();

        const creativerooms = await Creativeroom.find({ roomname });
        console.log("Fetched Creative Rooms:", creativerooms);
        return NextResponse.json({ creativerooms });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}