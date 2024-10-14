import mongoose, { Schema } from "mongoose";

const labroomreservationhistorySchema = new Schema(
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

const Labroomreservationhistory = mongoose.models.Labroomreservationhistory || mongoose.model("Labroomreservationhistory", labroomreservationhistorySchema);
export default Labroomreservationhistory