import { AnyBulkWriteOperation } from "mongoose";
import { gameModel } from "../../../models/gameModel";
import { Game } from "../../../interfaces/game";

export const deleteComment = async (
  userId: string,
  gameId: string | undefined = undefined
) => {
  try {
    if (gameId) {
      const alreadyComment = await gameModel.findOne({
        _id: gameId,
        "comments.userId": userId,
      });

      if (alreadyComment) {
        await alreadyComment.updateOne({ $pull: { comments: { userId } } });

        return { message: "Comment deleted", status: 200 };
      } else {
        return {
          message: "You haven't commented on this game yet!",
          status: 403,
        };
      }
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
