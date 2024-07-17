import { AnyBulkWriteOperation } from "mongoose";
import { Game } from "../../../interfaces/game";
import { gameModel } from "../../../models/gameModel";

export const saveGameToDatabase = async (games: Partial<Game>[]) => {
  try {
    if (games.length) {
      console.log("Saving the new game list ⚠️".yellow.bgBlack);

      const session = await gameModel.startSession();
      session.startTransaction();

      try {
        const bulkOps: AnyBulkWriteOperation<Game>[] = games.map((game) => ({
          updateOne: {
            filter: { name: game.name },
            update: { $set: game },
            upsert: true,
          },
        }));

        await gameModel.bulkWrite(bulkOps, { session });

        await session.commitTransaction();
        console.log("Updated game listing ✅".green.bgBlack);
      } catch (error) {
        await session.abortTransaction();
        throw error;
      } finally {
        session.endSession();
      }
    } else {
      console.log("Nothing to update ⚠️".yellow.bgBlack);
    }
  } catch (error) {
    console.log(
      `Error when trying to save games to the database. Error: ${error}`.red
        .bgBlack
    );

    return;
  }
};
