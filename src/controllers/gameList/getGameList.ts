import { Request, Response } from "express";
import gameListModel from "../../models/gameListModels";

export const allGames = async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const gameName = req.query.name ? req.query.name.toString() : "";

    if (isNaN(page)) {
      return res
        .status(400)
        .json({ message: "Os parâmetro de consultas devem ser números!" });
    }

    const gameList = await gameFilter(page, gameName);
    
    res.status(200).json({ gameList });
  } catch (err) {
    res.status(500).json({ message: `Erro interno do servidor: ${err}` });
  }
};

async function gameFilter(page: number, gameName: string) {
  const totalDocs = await gameListModel.countDocuments({
    gameName: { $regex: gameName, $options: "i" },
  });

  const totalPages = Math.ceil(totalDocs / 20);

  const games = await gameListModel
    .find({
      gameName: { $regex: gameName, $options: "i" },
    })
    .skip((page - 1) * 20)
    .limit(20);

  let nextPage;
  let prevPage;

  if (page > 1) {
    prevPage = `?page=${page - 1}&name=${gameName}`;
  }

  if (page < totalPages) {
    nextPage = `?page=${page + 1}&name=${gameName}`;
  }

  return { games, prevPage, nextPage, totalPages };
}
