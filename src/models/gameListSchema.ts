import mongoose, { Schema } from "mongoose";
import { GameList } from "../interfaces/gameList";

const gameListSchema: Schema<GameList> = new Schema<GameList>(
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
