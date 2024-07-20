import { Request, Response } from "express";
import { gameModel } from "../../models/gameModel";
import { createComment } from "../../utils/gameList/createComment";

export const sendCommentGame = async (req: Request, res: Response) => {
  try {
    const gameId = req.params.gameId as string;
    const userId = req.params.id as string;
    const comment = req.body.comment as string;

    const game = await gameModel.findById(gameId);

    if (!game) {
      return res.status(404).send({ message: "Game not found!" });
    }

    const result = await createComment(gameId, userId, comment, game);

    return res.status(result.status).send({ message: result.message });
  } catch (error) {
    console.log(
      `An error occurred while trying to create a comment. Error: ${error}`.red
        .bgBlack
    );

    return res.status(500).send({
      message: "Error trying to submit your comment, please try again later!",
    });
  }
};
