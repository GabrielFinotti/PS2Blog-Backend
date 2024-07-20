import { Request, Response } from "express";
import { likesGameFilter } from "../../utils/gameList/search/likesGameFilter";
import { readGameListCache } from "../../utils/cache/gameList/readGameListCache";

export const likeGameSearch = async (req: Request, res: Response) => {
  try {
    const gameListCache = await readGameListCache();

    if (gameListCache) {
      const gameListData = {
        games: gameListCache.likesGames,
        cache: true,
      };

      return res.status(200).send(gameListData);
    } else {
      const gameListData = await likesGameFilter();

      return res.status(200).send({ games: gameListData });
    }
  } catch (error) {
    console.log(`Error: ${error}`.red.bgBlack);

    return res.status(500).send({
      message: `Error trying to retrieve the game list. Error: ${error}`,
    });
  }
};
