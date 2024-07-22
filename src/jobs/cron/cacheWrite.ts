import cron from "node-cron";
import { writeGameListCache } from "../../utils/cache/gameList/writeGameListCache";

export const createGameListCache = cron.schedule(
  " 0 0 5 * *",
  async () => {
    try {
      await writeGameListCache();
    } catch (error) {
      console.log(
        `An error occurred when trying to create the game list cache❗Error: ${error}`
          .red.bgBlack
      );
    }
  },
  {
    timezone: "America/Recife",
    name: "Game List Cache",
  }
);
