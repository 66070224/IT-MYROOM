import mongoose, { Schema } from "mongoose";

const creativeroomreservationSchema = new Schema(
    {
        roomname: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        day: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

const Creativeroomreservation = mongoose.models.Creativeroomreservation || mongoose.model("Creativeroomreservation", creativeroomreservationSchema);
export default Creativeroomreservation