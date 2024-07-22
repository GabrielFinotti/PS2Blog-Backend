import { model, Schema } from "mongoose";
import { User } from "../interfaces/user";

const userSchema: Schema<User> = new Schema<User>(
  {
    username: {
      type: String,
      min: 6,
      max: 16,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      max: 500,
      default:
        "Who are you? How did you get here? We look forward to hearing your story!",
      required: false,
    },
    image: {
      type: String,
      default: "",
      required: false,
    },
    likedGames: {
      type: {
        totalLikes: Number,
        games: {
          type: [
            {
              gameId: {
                type: Schema.Types.ObjectId,
                ref: "Game",
              },
            },
          ],
          _id: false,
        },
      },
      default: { totalLikes: 0, games: [] },
      _id: false,
      required: false,
    },
  },
  { timestamps: true }
);

export const userModel = model<User>("User", userSchema, "user");
