import { readGameListCache } from "../../utils/cache/gameList/readGameListCache";
import { categoriesAndYearsFilter } from "./../../utils/gameList/search/categoriesAndYearsFilter";
import { Request, Response } from "express";

export const gameCategoriesAndYears = async (req: Request, res: Response) => {
  try {
    const gameListCache = await readGameListCache();

    if (gameListCache) {
      const categoriesAndYearsList = {
        categories: gameListCache.categoriesAndYears.categories,
        releases: gameListCache.categoriesAndYears.releases,
        cache: true,
      };

      return res.status(200).send(categoriesAndYearsList);
    } else {
      const categoriesAndYearsList = await categoriesAndYearsFilter();

      return res.status(200).send(categoriesAndYearsList);
    }
  } catch (error) {
    console.log(
      `Error when trying to retrieve the categories and years of the games. Error: ${error}`
        .red.bgBlack
    );

    return res.status(500).send({
      message:
        "Error when trying to retrieve the categories and years of the games!",
    });
  }
};
