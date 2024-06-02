import mongoose, { Schema } from "mongoose";

const gameListSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const gameList = mongoose.model("GameList", gameListSchema, "gameList");
