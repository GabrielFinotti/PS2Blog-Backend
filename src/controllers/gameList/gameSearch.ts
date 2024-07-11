import { Request, Response } from "express";
import { GameFilter } from "../../interfaces/gameFilter";
import { defaultGameFilter } from "../../utils/gameList/defaultGameFilter";

export const gameSearch = async (req: Request, res: Response) => {
  try {
    const { name, category, release } = req.query as GameFilter;

    const limit = req.query.limit
      ? parseInt(req.query.limit as string)
      : undefined;
    const page = req.query.page
      ? parseInt(req.query.page as string)
      : undefined;

    if ((limit && isNaN(limit)) || (page && isNaN(page))) {
      return res
        .status(400)
        .send({ message: "Limit and page parameters must be numbers!" });
    }

    const param: GameFilter = { name, category, release, limit, page };

    const gameListData = await defaultGameFilter(param);

    return res.status(200).send(gameListData);
  } catch (error) {
    console.log(`Error: ${error}`.red.bgBlack);

    return res.status(500).send({
      message: `Error trying to retrieve the game list. Error: ${error}!`,
    });
  }
};
