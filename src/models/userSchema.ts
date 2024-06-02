import mongoose, { Schema } from "mongoose";
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
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 20,
    },
  },
  { timestamps: true }
);

export const user = mongoose.model("User", userSchema, "user");
