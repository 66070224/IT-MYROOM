import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../../lib/mongodb";
import Labroom from "../../../../../../models/labroom";

export async function POST(req) {
    try {
        await connectMongoDB();

        const query = {};

        const labrooms = await Labroom.find({});
        return NextResponse.json({ labrooms });
    } catch (error) {
        await Labroom.create({ roomname: "LAB-203", available: true });
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}