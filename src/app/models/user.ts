import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
    {
        password: {
            type: String,
            required: [true, "Password is required"],
            select: false,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },
        name: {
            type: String,
            required: false
        },
        last_name: {
            type: String,
            required: false
        },
        username: {
            type: String,
            unique: true,
            required: [true, "Username is required"],
        },
        rank: {
            type: String,
            required: false
        },
        pp_image: {
            type: String,
            required: false
        },
    },
    {
        timestamps: true,
    }
);

const User = models.User || model("User", UserSchema);
export default User;