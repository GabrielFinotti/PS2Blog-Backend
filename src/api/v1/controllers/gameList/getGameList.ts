import { Request, Response } from "express";
import { gameListModel } from "../../models/gameListModel";

export const getGameList = async (req: Request, res: Response) => {
  try {
    const nameRef = req.query.name ? req.query.name.toString() : "";
    const page = req.query.page ? parseInt(req.query.page as string) : 1;

    const docLimit: number = 20;
    let nextPage!: number | undefined;
    let prevPage!: number | undefined;

    const totalDocs = await gameListModel.countDocuments({
      name: { $regex: nameRef, $options: "i" },
    });

    const totalPages = Math.ceil(totalDocs / docLimit);

    const games = await gameListModel
      .find(
        {
          name: { $regex: nameRef, $options: "i" },
        },
        { createdAt: false, updatedAt: false, _id: false, __v: false }
      )
      .skip((page - 1) * docLimit)
      .limit(docLimit);

    if (page > 1) {
      prevPage = page - 1;
    }
    if (page < totalPages) {
      nextPage = page + 1;
    }

    res.status(206).send({ gameList: games, totalDocs, nextPage, prevPage });
  } catch (error) {
    console.log(`Error: ${error}`.red.bgBlack);

    res.sendStatus(500);
  }
};
