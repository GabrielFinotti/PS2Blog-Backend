import { Request, Response } from "express";
import { ratingGameFilter } from "../../utils/gameList/ratingGameFilter";

export const ratingGameSearch = async (req: Request, res: Response) => {
  try {
    const gameListData = await ratingGameFilter();

    return res.status(200).send(gameListData);
  } catch (error) {
    console.log(`Error: ${error}`.red.bgBlack);

    return res.status(500).send({
      message: `Error trying to retrieve the game list. Error: ${error}`,
    });
  }
};
