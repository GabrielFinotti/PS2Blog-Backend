import retry from "async-retry";
import { Game } from "../../../interfaces/game";
import { mobyApi } from "./mobyApi";
import { filterGames } from "./filterGames";
import { sleep } from "../../../utils/temp/sleep";
import { saveGameToDatabase } from "./saveGamesDatabase";

export const getGamesApi = async (offset: number = 0, count: number = 1) => {
  let gameList: Partial<Game>[] = [];

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

    await sleep(60000);

    console.log(
      `Restarting the search for games in the call ${count} ⚠️`.yellow.bgBlack
    );

    await getGamesApi(offset, count);
  }
};
