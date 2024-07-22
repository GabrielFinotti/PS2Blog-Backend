import cron from "node-cron";
import { getGamesApi } from "../apis/mobygames/getGamesApi";

export const gameListUpdate = cron.schedule(
  " 0 0 1 */3 *",
  async () => {
    try {
      await getGamesApi();
    } catch (error) {
      console.log(
        `Maximum number of retries reached. Aborting search ❌. Error: ${error}`
          .red.bgBlack
      );
    }
  },
  {
    timezone: "America/Recife",
    name: "Game List Update",
  }
);
