import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
    {
        token: {
            type: String,
            unique: true,
            required: [true, "Token is required"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            select: false,
        },
        name: {
            type: String,
            require: false
        },
        last_name: {
            type: String,
            require: false
        },
        username: {
            type: String,
            unique: true,
            require: false
        },
        rank: {
            type: String,
        },
        pp_image: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const User = models.User || model("User", UserSchema);
export default User;