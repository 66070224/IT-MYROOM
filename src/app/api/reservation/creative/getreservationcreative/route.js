import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../../lib/mongodb";
import Creativeroomreservation from "../../../../../../models/creativeroomreservation";

export async function POST(req) {
    try {
        await connectMongoDB();
        const creativeroomreservations = await Creativeroomreservation.find();

        return NextResponse.json({ creativeroomreservations });
    } catch (error) {
        console.log(error);
    }
}