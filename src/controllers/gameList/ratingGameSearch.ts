import { Request, Response } from "express";
import { ratingGameFilter } from "../../utils/gameList/search/ratingGameFilter";
import { readGameListCache } from "../../utils/cache/gameList/readGameListCache";

export const ratingGameSearch = async (req: Request, res: Response) => {
  try {
    const gameListCache = await readGameListCache();

    if (gameListCache) {
      const gameListData = {
        games: gameListCache.ratingGames,
        cache: true,
      };

      return res.status(200).send(gameListData);
    } else {
      const gameListData = await ratingGameFilter();

      return res.status(200).send({ games: gameListData });
    }
  } catch (error) {
    console.log(`Error: ${error}`.red.bgBlack);

    return res.status(500).send({
      message: `Error trying to retrieve the game list. Error: ${error}`,
    });
  }
};
