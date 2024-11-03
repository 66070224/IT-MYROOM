import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../../lib/mongodb";
import Creativeroom from "../../../../../../models/creativeroom";

export async function POST(req) {
    try {
        const { roomname } = await req.json();
        await connectMongoDB();

        const creativeroom = await Creativeroom.findOne({ roomname });
        return NextResponse.json({ creativeroom });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}