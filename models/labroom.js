import mongoose, { Schema } from "mongoose";

const labroomSchema = new Schema(
    {
        roomname: {
            type: String,
            required: true
        },
        available: {
            type: Boolean,
            required: true,
            default: true
        }
    },
    { timestamps: true }
)

const Labroom = mongoose.models.Labroom || mongoose.model("Labroom", labroomSchema);
export default Labroom