import { GameFilter } from "../../interfaces/gameFilter";
import { gameModel } from "../../models/gameModel";

export const defaultGameFilter = async (param: GameFilter) => {
  try {
    const gameFilter: Partial<{
      name: RegExp;
      category: string;
      release: string;
    }> = {};

    if (param.name) {
      gameFilter.name = new RegExp(param.name, "i");
    }
    if (param.category) {
      gameFilter.category = param.category;
    }
    if (param.release) {
      gameFilter.release = param.release;
    }

    const docsLimit = param.limit ? param.limit : 10;
    const pageNumb = param.page ? param.page : 1;

    const totalDocs = await gameModel.countDocuments(gameFilter);
    const totalPages = Math.ceil(totalDocs / docsLimit);

    const gameList = await gameModel
      .find(gameFilter)
      .select("image name release category rating")
      .skip((pageNumb - 1) * docsLimit)
      .limit(docsLimit)
      .lean();

    let prevPage!: number | undefined;
    let nextPage!: number | undefined;

    if (pageNumb > 1) {
      prevPage = pageNumb - 1;
    }
    if (pageNumb < totalPages) {
      nextPage = pageNumb + 1;
    }

    return { totalDocs, totalPages, prevPage, nextPage, gameList };
  } catch (error) {
    throw error;
  }
};
