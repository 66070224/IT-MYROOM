import mongoose, { Schema } from "mongoose";

const creativeroomreservationhistorySchema = new Schema(
    {
        roomname: {
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

const Creativeroomreservationhistory = mongoose.models.Creativeroomreservationhistory || mongoose.model("Creativeroomreservationhistory", creativeroomreservationhistorySchema);
export default Creativeroomreservationhistory