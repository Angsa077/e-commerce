import { model, Schema } from "mongoose";

const userSchema = new Schema (
    {
        name: { type: String, required: true, minlength: 3, maxlength: 30 },
        email: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 200,
            unique: true,
        },
        password: { type: String, required: true, minlength: 3, maxlength: 1024 },
    },
    { timestamps: true }
);

const User = model("User", userSchema);
export default User;