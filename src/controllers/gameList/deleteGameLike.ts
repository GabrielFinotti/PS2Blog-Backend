import { Request, Response } from "express";
import { gameModel } from "../../models/gameModel";
import { deleteLike } from "../../utils/gameList/likes/deleteLike";

export const deleteGameLike = async (req: Request, res: Response) => {
  try {
    const gameId = req.params.gameId as string;
    const userId = req.params.id as string;

    const game = await gameModel.findById(gameId);

    if (!game) {
      return res.status(404).send({ message: "Game not found!" });
    }

    const result = await deleteLike(userId, gameId);

    if (result) {
      return res.status(result.status).send({ message: result.message });
    } else {
      return res.sendStatus(204);
    }
  } catch (error) {
    console.log(`Error when trying to delete the game like. Error: ${error}`);

    return res
      .status(500)
      .send({ message: "Error trying to delete game like, try again later!" });
  }
};
