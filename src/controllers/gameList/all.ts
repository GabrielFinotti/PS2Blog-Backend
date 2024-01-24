import { Request, Response } from "express";
import gameList from "../../models/gameList";

export const allGames = async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const gameName = req.query.name ? req.query.name : "";

    if (isNaN(page)) {
      return res
        .status(400)
        .json({ message: "Os parâmetro de consultas devem ser números!" });
    }

    const totalDocs = await gameList.countDocuments({
      gameName: { $regex: gameName, $options: "i" },
    });

    const totalPages = Math.ceil(totalDocs / 20);

    const games = await gameList
      .find({ gameName: { $regex: gameName, $options: "i" } })
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

    res.status(200).json({ games, totalPages, prevPage, nextPage });
  } catch (err) {
    res.status(500).json({ message: `Erro interno do servidor: ${err}` });
  }
};
