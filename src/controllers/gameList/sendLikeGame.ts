import { Request, Response } from "express";
import { gameModel } from "../../models/gameModel";
import { createLike } from "../../utils/gameList/createLike";

export const sendLikeGame = async (req: Request, res: Response) => {
  try {
    const gameId = req.params.gameId;
    const userId = req.params.id;

    const game = await gameModel.findById(gameId);

    if (!game) {
      return res.status(404).send({ message: "Game not found!" });
    }

    const result = await createLike(gameId, userId, game);

    return res.status(result.status).send({ message: result.message });
  } catch (error) {
    console.log(
      `Error when trying to enjoy the game! Error: ${error}`.red.bgBlack
    );

    return res.status(500).send({
      message:
        "An error occurred while trying to enjoy this game, please try again later!",
    });
  }
};
