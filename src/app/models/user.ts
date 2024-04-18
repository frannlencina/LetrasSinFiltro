import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, "Username is required"],
        },
        avatar: {
            type: String,
            required: false,
            default: "default"
        },
        rank: {
            type: String,
            required: false,
            default: "user"
        },
        last_connection: {
            type: String,
            required: false,
            default: "19/01/2024"
        },
        account: {
            email: {
                type: String,
                required: [true, "Email is required"],
                unique: true,
            },
            name: {
                type: String,
                required: false
            },
            password: {
                type: String,
                required: [true, "Password is required"],
            },
            last_name: {
                type: String,
                required: false
            },
        },
        stats: {
            favorite_posts: {
                type: Number,
                default: 0
            },
            generated_prhases: {
                type: Number,
                default: 0
            },
            posts_count: {
                type: Number,
                default: 0
            },
            favorite_mood: {
                type: String,
                default: ""
            },
        },
        terms_and_conditions: {
            type: String,
            required: true,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

const User = models.User || model("User", UserSchema);
export default User;