import mongoose, { Schema } from "mongoose";

const problemSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        describe: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

const Problem = mongoose.models.Problem || mongoose.model("Problem", problemSchema);
export default Problem