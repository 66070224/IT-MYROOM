import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../../lib/mongodb";
import Creativeroomreservation from "../../../../../../models/creativeroomreservation";

export async function POST(req) {
    try {
        const {roomname, username, date, fromTime, toTime} = await req.json();

        await connectMongoDB();
        const newReservation = await Creativeroomreservation.create({ roomname, username, date, fromTime, toTime });

        return NextResponse.json({ message: "Creative room reservated", newReservation}, {status: 201})
    } catch (error) {
        return NextResponse.json({ message: "An error reservating room fail"}, {status: 500})
    }
}