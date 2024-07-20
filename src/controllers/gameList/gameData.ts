import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { gameModel } from "../../models/gameModel";

export const gameData = async (req: Request, res: Response) => {
  try {
    const gameId = req.params.gameId as string;

    if (!isValidObjectId(gameId)) {
      return res.status(406).send({
        message:
          "Invalid game id, please enter a valid id to recover the data!",
      });
    }

    const game = await gameModel.findById(gameId);

    if (!game) {
      return res.status(404).send({ message: "Game not found!" });
    }

    return res.status(200).send(game);
  } catch (error) {
    console.log(`Error recovering game data. Error: ${error}`);

    return res
      .status(500)
      .send({ message: "Error recovering game data, please try again later!" });
  }
};
