import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../../lib/mongodb";
import Creativeroomreservation from "../../../../../../models/creativeroomreservation";

export async function POST(req) {
    try {
        const { roomname, username, day, time } = await req.json();
        await connectMongoDB();

        const query = {};

        if (roomname) {
            query.roomname = roomname;
        }
        if (username) {
            query.username = username;
        }
        if (day) {
            query.day = day;
        }
        if (time) {
            query.time = time;
        }

        const creativeroomreservations = await Creativeroomreservation.find(query);
        
        return NextResponse.json({ creativeroomreservations });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "An error occurred while fetching reservations." }, { status: 500 });
    }
}
