import { Request, Response } from "express";
import { likesGameFilter } from "../../utils/gameList/likesGameFilter";

export const likeGameSearch = async (req: Request, res: Response) => {
  try {
    const gameListData = await likesGameFilter();

    return res.status(200).send(gameListData);
  } catch (error) {
    console.log(`Error: ${error}`.red.bgBlack);

    return res.status(500).send({
      message: `Error trying to retrieve the game list. Error: ${error}`,
    });
  }
};
