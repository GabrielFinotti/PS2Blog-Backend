import { Request, Response } from "express";
import gameListModel from "../../models/gameListModels";
import userModels from "../../models/userModels";

export const allGames = async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const gameName = req.query.name ? req.query.name.toString() : "";
    const userId = req.headers["user-id"];

    if (!(await verifyUser(userId))) {
      return res
        .status(401)
        .json({ message: "Você não tem autorização para essa requisição" });
    }
    
    if (isNaN(page)) {
      return res.status(400).json({
        message: "O parâmetro de consulta de página deve ser do tipo numérico!",
      });
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

  const docLimit: number = 10;
  const totalPages = Math.ceil(totalDocs / docLimit);

  const games = await gameListModel
    .find(
      {
        gameName: { $regex: gameName, $options: "i" },
      },
      { createdAt: false, updatedAt: false, _id: false, __v: false }
    )
    .skip((page - 1) * docLimit)
    .limit(docLimit);

  let nextPage;
  let prevPage;

  if (page > 1) {
    prevPage = `?page=${page - 1}&name=${gameName}`;
  }

  if (page < totalPages) {
    nextPage = `?page=${page + 1}&name=${gameName}`;
  }

  return { games, prevPage, nextPage, totalPages, totalDocs };
}

async function verifyUser(id: string | string[] | undefined) {
  const existingUser = await userModels.findById(id);

  if (existingUser !== null) {
    return true;
  } else {
    return false;
  }
}
