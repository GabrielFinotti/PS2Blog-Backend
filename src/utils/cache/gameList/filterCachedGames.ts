import { GameFilter } from "../../../interfaces/gameFilter";
import { GameListCache } from "../../../interfaces/gameListCache";

export const filterCachedGames = async (
  params: GameFilter,
  data: GameListCache
) => {
  try {
    const gameFilter: Partial<{
      name: RegExp;
      category: string;
      release: RegExp;
    }> = {};

    if (params.name) {
      gameFilter.name = new RegExp(params.name, "i");
    }
    if (params.category) {
      gameFilter.category = params.category;
    }
    if (params.release) {
      gameFilter.release = new RegExp(params.release, "i");
    }

    const docsLimit = params.limit ?? 10;
    const pageNumb = params.page ?? 1;

    const filteredGameList = data.gameList.filter(
      (game) =>
        (!gameFilter.name || gameFilter.name.test(game.name)) &&
        (!gameFilter.category || gameFilter.category === game.category) &&
        (!gameFilter.release || gameFilter.release.test(game.release))
    );

    const totalDocs = filteredGameList.length;
    const totalPages = Math.ceil(totalDocs / docsLimit);

    const gameList = filteredGameList.slice(
      (pageNumb - 1) * docsLimit,
      pageNumb * docsLimit
    );

    const prevPage = pageNumb > 1 ? pageNumb - 1 : undefined;
    const nextPage = pageNumb < totalPages ? pageNumb + 1 : undefined;

    return { totalDocs, totalPages, prevPage, nextPage, gameList, cache: true };
  } catch (error) {
    throw error;
  }
};
