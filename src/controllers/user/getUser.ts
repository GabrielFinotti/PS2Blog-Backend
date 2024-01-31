import { Request, Response } from "express";
import mongoose from "mongoose";
import userModels from "../../models/userModels";

export const getUserData = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      return res
        .status(406)
        .json({ message: "Id de usuário não correspondente!" });
    }

    const userId = new mongoose.Types.ObjectId(id);
    const user = await userModels.findById(userId, {
      username: true,
      _id: false,
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
