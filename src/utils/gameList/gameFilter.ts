import { GameFilter } from "../../interfaces/gameFilter";
import { gameModel } from "../../models/gameModel";

export const gameSearch = async (
  param: GameFilter,
  limitPage?: number,
  numbPage?: number
) => {
  const limit = limitPage ? limitPage : 10;
  const page = numbPage ? numbPage : 1;
  let prevPage!: number | undefined;
  let nextPage!: number | undefined;

  const totalDocs = await gameModel.countDocuments(param);
  const totalPages = Math.ceil(totalDocs / limit);

  const gameList = await gameModel
    .find(param)
    .lean()
    .skip((page - 1) * limit)
    .limit(limit);

  if (page > 1) {
    prevPage = page - 1;
  }
  if (page < totalPages) {
    nextPage = page + 1;
  }

  return { gameList, prevPage, nextPage, totalDocs, totalPages };
};
