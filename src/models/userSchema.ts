import mongoose, { Schema } from "mongoose";

const userSchema: Schema = new Schema(
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

export const user = mongoose.model("User", userSchema, 'user');
