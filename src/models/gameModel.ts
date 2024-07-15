import { model, Schema } from "mongoose";
import { Game } from "../interfaces/game";

const gameSchema: Schema<Game> = new Schema<Game>(
  {
    image: {
      type: String,
      default: "",
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    release: {
      type: String,
      required: true,
    },
    plataforms: {
      type: [
        {
          name: String,
        },
      ],
      required: true,
      _id: false,
    },
    category: {
      type: String,
      default: "",
      required: false,
    },
    rating: {
      type: Number,
      default: 0,
      required: false,
    },
    description: {
      type: String,
      default: "",
      required: false,
    },
    downloads: {
      type: [
        {
          url: String,
        },
      ],
      default: [],
      _id: false,
      required: false,
    },
    likes: {
      type: {
        totalLikes: Number,
        users: {
          type: [
            {
              userId: {
                type: Schema.Types.ObjectId,
                ref: "User",
              },
            },
          ],
          _id: false,
        },
      },
      default: { totalLikes: 0, users: [] },
      _id: false,
      required: false,
    },

    comments: {
      type: [
        {
          userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
          },
          comment: String,
        },
      ],
      default: [],
      _id: false,
      required: false,
    },
  },
  { timestamps: true }
);

export const gameModel = model<Game>("Game", gameSchema, "gameList");
