import * as fs from "fs-extra";
import { GameListCache } from "../../../interfaces/gameListCache";

export const readGameListCache = async () => {
  try {
    const cachePath = "./src/cache/gameList/gameList.json";

    const gameList: GameListCache = await fs.readJson(cachePath);

    return gameList;
  } catch (error) {
    console.log("No cache found❗".red.bgBlack);
  }
};
