import { Request, Response } from "express";
import { gameModel } from "../../models/gameModel";
import { deleteComment } from "../../utils/gameList/deleteComment";

export const deleteGameComment = async (req: Request, res: Response) => {
  try {
    const gameId = req.params.gameId as string;
    const userId = req.params.id as string;

    const game = await gameModel.findById(gameId);

    if (!game) {
      return res.status(404).send({ message: "Game not found!" });
    }

    await deleteComment(userId, gameId);

    return res.sendStatus(204);
  } catch (error) {
    console.log(
      `Error when trying to delete game comment. Error: ${error}`.red.bgBlack
    );

    return res
      .status(500)
      .send({
        message: "Error trying to delete comment, please try again later!",
      });
  }
};
