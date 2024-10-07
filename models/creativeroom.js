import mongoose, { Schema } from "mongoose";

const creativeroomSchema = new Schema(
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

const Creativeroom = mongoose.models.Creativeroom || mongoose.model("Creativeroom", creativeroomSchema);
export default Creativeroom