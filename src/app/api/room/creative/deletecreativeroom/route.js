import { connectMongoDB } from "../../../../../../lib/mongodb";
import Creativeroom from "../../../../../../models/creativeroom";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectMongoDB();
        
        const { _id } = await req.json();

        const deletedRoom = await Creativeroom.findByIdAndDelete(
            _id
        );

        if (!deletedRoom) {
            return NextResponse.json({ error: "Creative room not found" }, { status: 404 });
        }

        return NextResponse.json({ deletedRoom });
    } catch (error) {
        console.log("Error deleted room:", error);
        return NextResponse.json({ error: "Failed to deleted room" }, { status: 500 });
    }
}