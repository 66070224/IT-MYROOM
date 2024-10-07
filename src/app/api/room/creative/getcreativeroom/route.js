import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../../lib/mongodb";
import Creativeroom from "../../../../../../models/creativeroom";

export async function POST(req) {
    try {
        await connectMongoDB();
        const creativerooms = await Creativeroom.find({});

        return NextResponse.json({ creativerooms });
    } catch (error) {
        console.log(error);
    }
}