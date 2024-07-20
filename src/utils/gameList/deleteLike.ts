import { AnyBulkWriteOperation } from "mongoose";
import { gameModel } from "../../models/gameModel";
import { Game } from "../../interfaces/game";

export const deleteLike = async (
  userId: string,
  gameId: string | undefined = undefined
) => {
  try {
    if (gameId) {
      await gameModel.findByIdAndUpdate(gameId, {
        $pull: { "likes.users.userId": userId },
        $inc: { "likes.totalLikes": -1 },
      });
    } else {
      let bulkOps: AnyBulkWriteOperation<Game>[] = [
        {
          updateMany: {
            filter: { "likes.users.userId": userId },
            update: {
              $pull: { "likes.users.userId": userId },
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
