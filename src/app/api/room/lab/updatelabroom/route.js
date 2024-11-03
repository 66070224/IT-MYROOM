import { connectMongoDB } from "../../../../../../lib/mongodb";
import Labroom from "../../../../../../models/labroom";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectMongoDB();
        
        const { _id, available } = await req.json();

        const updatedRoom = await Labroom.findByIdAndUpdate(
            _id,
            { available },
            { new: true }
        );

        if (!updatedRoom) {
            return NextResponse.json({ error: "Lab room not found" }, { status: 404 });
        }

        return NextResponse.json({ updatedRoom });
    } catch (error) {
        console.log("Error updating room:", error);
        return NextResponse.json({ error: "Failed to update room" }, { status: 500 });
    }
}