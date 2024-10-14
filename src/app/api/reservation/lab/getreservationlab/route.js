import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../../lib/mongodb";
import Labroomreservation from "../../../../../../models/labroomreservaion";

export async function POST(req) {
    try {
        const { roomname, seat, username, date, time } = await req.json();
        await connectMongoDB();

        const query = {};

        if (roomname) {
            query.roomname = roomname;
        }
        if (seat) {
            query.seat = seat;
        }
        if (username) {
            query.username = username;
        }
        if (date) {
            query.date = date;
        }
        if (time) {
            query.time = time;
        }

        const labroomreservations = await Labroomreservation.find(query);
        
        return NextResponse.json({ labroomreservations });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "An error occurred while fetching reservations." }, { status: 500 });
    }
}
