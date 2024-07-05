import { model, Schema } from "mongoose";
import { Game } from "../interfaces/game";

const gameSchema: Schema<Game> = new Schema<Game>(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    release: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    downloads: {
      type: [
        {
          url: String,
        },
      ],
      default: undefined,
    },
    likes: {
      type: {
        totalLikes: Number,
        user: [
          {
            userID: {
              type: Schema.Types.ObjectId,
              ref: "User",
            },
          },
        ],
      },
      default: undefined,
    },
    comments: {
      type: [
        {
          userID: {
            type: Schema.Types.ObjectId,
            ref: "User",
          },
          comment: String,
        },
      ],
      default: undefined,
    },
  },
  { timestamps: true }
);

export const gameListModel = model<Game>("Game", gameSchema, "gameList");
