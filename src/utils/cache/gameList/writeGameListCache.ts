import * as fs from "fs-extra";
import { defaultGameFilter } from "../../gameList/defaultGameFilter";
import { likesGameFilter } from "../../gameList/likesGameFilter";
import { categoriesAndYearsFilter } from "../../gameList/categoriesAndYearsFilter";
import { ratingGameFilter } from "../../gameList/ratingGameFilter";

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
    console.log(
      "An error occurred when trying to create the game list cache❗".red
        .bgBlack
    );
  }
};
