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

        return NextResponse.json({ labrooms });
    } catch (error) {
        console.log(error);
    }
}