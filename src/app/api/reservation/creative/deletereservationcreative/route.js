import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../../lib/mongodb";
import Creativeroomreservation from "../../../../../../models/creativeroomreservation";

export async function POST(req) {
    try {
        const { _id } = await req.json();
        await connectMongoDB();


        const deletedReservations = await Creativeroomreservation.findByIdAndDelete(_id);

        if (!deletedReservations) {
            return NextResponse.json({ error: "Reservation not found" }, { status: 404 });
        }

        return NextResponse.json({ deletedReservations });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "An error occurred while fetching reservations." }, { status: 500 });
    }
}
