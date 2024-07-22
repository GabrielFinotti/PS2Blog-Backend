import { Document } from "mongoose";
import { gameModel } from "../../../models/gameModel";
import { Game } from "../../../interfaces/game";
import { userModel } from "../../../models/userModel";

export const createLike = async (
  gameId: string,
  userId: string,
  game: Document<unknown, {}, Game> & Game
) => {
  try {
    const alreadyLiked = await gameModel.findOne({
      _id: gameId,
      "likes.users.userId": userId,
    });

    if (alreadyLiked) {
      return { message: "You have already liked this game!", status: 409 };
    }

    await userModel.findByIdAndUpdate(userId, {
      $addToSet: { "likedGames.games": { gameId } },
      $inc: { "likedGames.totalLikes": +1 },
    });

    await game.updateOne({
      $addToSet: { "likes.users": { userId } },
      $inc: { "likes.totalLikes": +1 },
    });

    return { message: "You liked this game!", status: 201 };
  } catch (error) {
    throw error;
  }
};
