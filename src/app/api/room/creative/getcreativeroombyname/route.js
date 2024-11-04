import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../../lib/mongodb";
import Labroom from "../../../../../../models/labroom";

export async function POST(req) {
    try {
        const { roomname } = await req.json();
        await connectMongoDB();

        const labrooms = await Labroom.find({ roomname });
        console.log("labroom:", labrooms);
        return NextResponse.json({ labrooms });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}