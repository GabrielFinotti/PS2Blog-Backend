import { Document } from "mongoose";
import { gameModel } from "../../../models/gameModel";
import { Game } from "../../../interfaces/game";

export const createComment = async (
  gameId: string,
  userId: string,
  comment: string,
  game: Document<unknown, {}, Game> & Game
) => {
  try {
    const alreadyComment = await gameModel.findOne({
      _id: gameId,
      "comments.userId": userId,
    });

    if (alreadyComment) {
      return { message: "You already commented this game!", status: 409 };
    }

    await game.updateOne({ $addToSet: { comments: { userId, comment } } });

    return { message: "You commented on this game!", status: 201 };
  } catch (error) {
    throw error;
  }
};
