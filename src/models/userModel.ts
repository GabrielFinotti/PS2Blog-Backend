import { model, Schema } from "mongoose";
import { User } from "../interfaces/user";

const userSchema: Schema<User> = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
      min: 5,
      max: 16,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 20,
    },
    bio: {
      type: String,
      required: false,
      default:
        "Who are you? How did you get here? We look forward to hearing your story!",
      max: 500,
    },
    image: {
      type: String,
      required: false,
      default: undefined,
    },
    favorites: {
      type: Array<Object>,
      required: false,
      default: undefined,
    },
  },
  { timestamps: true }
);

export const userModel = model<User>("User", userSchema, "user");
