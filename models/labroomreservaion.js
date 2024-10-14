import mongoose, { Schema } from "mongoose";

const labroomreservationSchema = new Schema(
    {
        roomname: {
            type: String,
            required: true
        },
        seat: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        time: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

const Labroomreservation = mongoose.models.Labroomreservation || mongoose.model("Labroomreservation", labroomreservationSchema);
export default Labroomreservation