import { AnyBulkWriteOperation } from "mongoose";
import { gameModel } from "../../../models/gameModel";
import { Game } from "../../../interfaces/game";

export const deleteLike = async (
  userId: string,
  gameId: string | undefined = undefined
) => {
  try {
    if (gameId) {
      const alreadyLiked = await gameModel.findOne({
        _id: gameId,
        "likes.users.userId": userId,
      });

      if (alreadyLiked) {
        await alreadyLiked.updateOne({
          $pull: { "likes.users": { userId } },
          $inc: { "likes.totalLikes": -1 },
        });

        return { message: "Like deleted", status: 200 };
      } else {
        return { message: "You still haven't liked this game!", status: 403 };
      }
    } else {
      let bulkOps: AnyBulkWriteOperation<Game>[] = [
        {
          updateMany: {
            filter: { "likes.users.userId": userId },
            update: {
              $pull: { "likes.users": { userId } },
              $inc: { "likes.totalLikes": -1 },
            },
          },
        },
      ];

      await gameModel.bulkWrite(bulkOps);
    }
  } catch (error) {
    throw error;
  }
};
