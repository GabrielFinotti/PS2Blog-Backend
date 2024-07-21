import retry from "async-retry";
import { Game } from "../../../interfaces/game";
import { mobyApi } from "./mobyApi";
import { filterGames } from "./filterGames";
import { sleep } from "../../../utils/temp/sleep";
import { saveGameToDatabase } from "./saveGamesDatabase";

let gameList: Partial<Game>[] = [];
let countError: number = 0;

export const getGamesApi = async (offset: number = 0, count: number = 1) => {
  try {
    console.log(
      `Starting the search for games. Call ${count} ⚠️`.yellow.bgBlack
    );

    const attempOptions: retry.Options = {
      retries: 4,
      minTimeout: 10000,
      factor: 2,
      maxTimeout: 160000,
    };

    const games = await retry(() => {
      return mobyApi(offset);
    }, attempOptions);

    if (!games.length) {
      console.log("Empty game list, nothing left to recover 🎮".cyan.bgBlack);

      await saveGameToDatabase(gameList);

      return;
    }

    gameList = [...gameList, ...filterGames(games)];

    console.log(`Recovered PS2 games: ${gameList.length} 🕹️`.black.bgWhite);

    await sleep(10000);

    await getGamesApi(offset + 100, count + 1);
  } catch (error) {
    console.log(`Error when searching for games: ${error}❗`.red.bgBlack);

    await saveGameToDatabase(gameList);

    gameList = [];
    countError += 1;

    await sleep(60000);

    console.log(
      `Restarting the search for games in the call ${count}. Errors occurred: ${countError} ⚠️`
        .yellow.bgBlack
    );

    if (countError <= 6) {
      await getGamesApi(offset, count);
    } else {
      throw error;
    }
  }
};
