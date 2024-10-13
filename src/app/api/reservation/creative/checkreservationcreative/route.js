import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../../lib/mongodb";
import Creativeroomreservation from "../../../../../../models/creativeroomreservation";

export async function POST(req) {
    try {
        await connectMongoDB();
        const { roomname, day, time } = await req.json();
        const creativeroomreservations = await Creativeroomreservation.find({ roomname, day, time });

        return NextResponse.json({ creativeroomreservations });
    } catch (error) {
        console.log(error);
    }
    
}