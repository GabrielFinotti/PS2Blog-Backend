import { GameFilter } from "../../interfaces/gameFilter";
import { gameModel } from "../../models/gameModel";

export const defaultGameFilter = async (param: GameFilter) => {
  try {
    const gameFilter: Partial<{
      name: RegExp;
      category: string;
      release: RegExp;
    }> = {};

    if (param.name) {
      gameFilter.name = new RegExp(param.name, "i");
    }
    if (param.category) {
      gameFilter.category = param.category;
    }
    if (param.release) {
      gameFilter.release = new RegExp(param.release, "i");
    }

    const docsLimit = param.limit ?? 10;
    const pageNumb = param.page ?? 1;

    const totalDocs = await gameModel.countDocuments(gameFilter);
    const totalPages = Math.ceil(totalDocs / docsLimit);

    const gameList = await gameModel
      .find(gameFilter)
      .skip((pageNumb - 1) * docsLimit)
      .limit(docsLimit)
      .lean();

    const prevPage = pageNumb > 1 ? pageNumb - 1 : undefined;
    const nextPage = pageNumb < totalPages ? pageNumb + 1 : undefined;

    return {
      totalDocs,
      totalPages,
      prevPage,
      nextPage,
      gameList,
    };
  } catch (error) {
    throw error;
  }
};
