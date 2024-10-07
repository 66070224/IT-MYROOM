import { connectMongoDB } from "../../../../../../lib/mongodb";
import Creativeroom from "../../../../../../models/creativeroom";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectMongoDB();
        
        const { _id, roomname, available } = await req.json();

        const updatedRoom = await Creativeroom.findByIdAndUpdate(
            _id,
            { roomname, available },
            { new: true }
        );

        if (!updatedRoom) {
            return NextResponse.json({ error: "Creative room not found" }, { status: 404 });
        }

        return NextResponse.json({ updatedRoom });
    } catch (error) {
        console.log("Error updating room:", error);
        return NextResponse.json({ error: "Failed to update room" }, { status: 500 });
    }
}