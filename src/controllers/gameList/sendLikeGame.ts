import { Request, Response } from "express";
import { gameModel } from "../../models/gameModel";

export const sendLikeGame = async (req: Request, res: Response) => {
  try {
    const gameId = req.params.gameId;
    const userId = req.params.id;

    const game = await gameModel.findById(gameId);

    if (!game) {
      return res.status(404).send({ message: "Game not found!" });
    }

    const alreadyLiked = await gameModel.findOne({
      _id: game._id,
      "likes.users.userId": userId,
    });

    if (alreadyLiked) {
      return res
        .status(409)
        .send({ message: "You have already liked this game!" });
    }

    await game.updateOne({
      $addToSet: { "likes.users": { userId } },
      $inc: { "likes.totalLikes": +1 },
    });

    return res.status(201).send({ message: "You liked this game!!" });
  } catch (error) {
    console.log(
      `Error when trying to enjoy the game! Error: ${error}`.red.bgBlack
    );

    return res.status(500).send({
      message: "Error when trying to enjoy the game!",
    });
  }
};
