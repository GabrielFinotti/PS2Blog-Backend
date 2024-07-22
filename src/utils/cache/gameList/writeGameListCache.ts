import * as fs from "fs-extra";
import { categoriesAndYearsFilter } from "../../gameList/search/categoriesAndYearsFilter";
import { defaultGameFilter } from "../../gameList/search/defaultGameFilter";
import { likesGameFilter } from "../../gameList/search/likesGameFilter";
import { ratingGameFilter } from "../../gameList/search/ratingGameFilter";

export const writeGameListCache = async () => {
  try {
    console.log("Starting to cache game list data ⚠️".yellow.bgBlack);

    const cachePath = "./src/cache/gameList";
    await fs.ensureDir(cachePath);

    const totalDocs = (await defaultGameFilter({})).totalDocs;
    const gameList = (await defaultGameFilter({ limit: totalDocs })).gameList;
    const ratingGames = await ratingGameFilter();
    const likesGames = await likesGameFilter();
    const categoriesAndYears = await categoriesAndYearsFilter();

    const gameListCache = {
      gameList,
      ratingGames,
      likesGames,
      categoriesAndYears,
    };

    await fs.writeJSON(`${cachePath}/gameList.json`, gameListCache, {
      encoding: "utf8",
      flag: "w",
    });

    console.log("Curling completed ✅".green.bgBlack);
  } catch (error) {
    throw error;
  }
};
