import { AnyBulkWriteOperation } from "mongoose";
import { gameModel } from "../../../models/gameModel";
import { Game } from "../../../interfaces/game";

export const deleteComment = async (
  userId: string,
  gameId: string | undefined = undefined
) => {
  try {
    if (gameId) {
      await gameModel.findByIdAndUpdate(gameId, {
        $pull: { comments: { userId } },
      });
    } else {
      const bulkOps: AnyBulkWriteOperation<Game>[] = [
        {
          updateMany: {
            filter: { "comments.userId": userId },
            update: { $pull: { comments: { userId } } },
          },
        },
      ];

      await gameModel.bulkWrite(bulkOps);
    }
  } catch (error) {
    throw error;
  }
};
