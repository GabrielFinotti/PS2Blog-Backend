import axios from "axios";
import dotenv from "dotenv";
import retry from "async-retry";
import { GameByMobygames } from "../../../interfaces/gameByMobygames";
import { Game } from "../../../interfaces/game";
import { gameModel } from "../../../models/gameModel";

dotenv.config({ path: "./src/env/.env" });

const apiUrl = "https://api.mobygames.com/v1/games";
let gameList: Partial<Game>[] = [];

export default async function getPs2Games(
  offset: number = 0,
  count: number = 1
) {
  try {
    console.log(
      `Starting the search for games. Call ${count} ⚠️`.yellow.bgBlack
    );

    const attemptOptions: retry.Options = {
      retries: 4,
      minTimeout: 10000,
      factor: 2,
      maxTimeout: 160000,
    };

    const games = await retry(() => {
      return getGames(offset);
    }, attemptOptions);

    if (!games.length) {
      console.log("All games recovered 🎮".cyan.bgBlack);

      if (gameList.length) {
        console.log("Saving the new game list ⚠️".yellow.bgBlack);

        await gameModel.create(gameList);

        console.log("Updated game listing ✅".green.bgBlack);

        return;
      } else {
        console.log("Nothing to update ⚠️".yellow.bgBlack);

        return;
      }
    }

    const filteredGames = games.filter((game) =>
      game.platforms?.some((plataform) => plataform.platform_id === 7)
    );

    const formatedGames = filteredGames.map((game) => {
      const plataformPs2 = game.platforms?.find(
        (plataform) => plataform.platform_id === 7
      );

      const newGame: Partial<Game> = {
        image: game.sample_cover?.image,
        name: game.title,
        release: plataformPs2?.first_release_date,
        plataforms: [
          {
            name: plataformPs2?.platform_name ?? "",
          },
        ],
        category: game.genres?.find(
          (genre) => genre.genre_category === "Basic Genres"
        )?.genre_name,
        description: game.description,
        rating: game.moby_score,
      };

      return newGame;
    });

    gameList = [...gameList, ...formatedGames];

    console.log(`Recovered PS2 games: ${gameList.length} 🕹️`.black.bgWhite);

    await sleep(10000);

    getPs2Games(offset + 100, count + 1);
  } catch (error) {
    console.log(`Error when searching for games: ${error}❗`.red.bgBlack);

    if (gameList.length) {
      console.log(
        "Saving only games recovered before the error generated ⚠️".yellow
          .bgBlack
      );

      await gameModel.create(gameList);

      console.log("Updated game listing ✅".green.bgBlack);
    } else {
      console.log("Nothing to update ⚠️".yellow.bgBlack);
    }

    gameList = [];

    await sleep(60000);

    console.log(
      `Restarting the search for games in the call ${count} ⚠️`.yellow.bgBlack
    );

    getPs2Games(offset, count);
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getGames(offset: number) {
  try {
    const response = await axios.get(
      `${apiUrl}?offset=${offset}&api_key=${process.env.MOBY_API_KEY}`
    );

    return response.data.games as GameByMobygames[];
  } catch (error) {
    throw error;
  }
}
