import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../../lib/mongodb";
import Labroomreservation from "../../../../../../models/labroomreservaion";

export async function POST(req) {
    try {
        const {roomname, seat, username, date, time} = await req.json();

        await connectMongoDB();
        const newReservation = await Labroomreservation.create({ roomname, seat, username, date, time });

        return NextResponse.json({ message: "Lab room reservated", newReservation}, {status: 201})
    } catch (error) {
        console.error("Error in makereservationcreative:", error);
        return NextResponse.json({ message: "An error reservating seat fail"}, {status: 500})
    }
}