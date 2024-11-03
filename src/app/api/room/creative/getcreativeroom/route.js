import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../../lib/mongodb";
import Creativeroom from "../../../../../../models/creativeroom";

export async function POST(req) {
    try {
        await connectMongoDB();

        const creativerooms = await Creativeroom.find({});
        console.log(creativerooms);

        return NextResponse.json({ creativerooms });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}