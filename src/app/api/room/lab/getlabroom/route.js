import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../../lib/mongodb";
import Labroom from "../../../../../../models/labroom";

export async function POST(req) {
    try {

        const { roomname } = await req.json();
        await connectMongoDB();

        const query = {};

        if (roomname) {
            query.roomname = roomname;
        }

        const labrooms = await Labroom.find(query);
        console.log(labrooms);

        return NextResponse.json({ labrooms });
    } catch (error) {
        await Labroom.create({ roomname: "LAB-203", available: true });
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}