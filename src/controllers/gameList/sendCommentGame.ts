import { Request, Response } from "express";
import { gameModel } from "../../models/gameModel";

export const sendCommentGame = async (req: Request, res: Response) => {
  try {
    const gameId = req.params.gameId;
    const userId = req.params.id;
    const comment = req.body.comment as string;

    if (!comment) {
      return res.status(400).send({ message: "Comment cannot be empty!" });
    }

    const game = await gameModel.findById(gameId);

    if (!game) {
      return res.status(404).send({ message: "Game not found!" });
    }

    const alreadyComment = await gameModel.findOne({
      _id: game._id,
      "comments.userId": userId,
    });

    if (alreadyComment) {
      return res
        .status(409)
        .send({ message: "You already commented this game!" });
    }

    await game.updateOne({ $addToSet: { comments: { userId, comment } } });

    return res.status(201).send({ message: "You commented on this game!" });
  } catch (error) {
    console.log(error);

    return res.sendStatus(500);
  }
};
