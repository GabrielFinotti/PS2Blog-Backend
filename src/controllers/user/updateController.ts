import { Request, Response } from "express";
import mongoose from "mongoose";
import userModel from "../../models/user-model";
import { updateData, validateUserData } from "../../utils/userValidation";

export const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(406)
        .json({ message: "Id de usuário não correspondente!" });
    }

    const userId = new mongoose.Types.ObjectId(id);
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    const data = await validateUserData(req.body);

    if (typeof data === "string") {
      return res.status(400).json({ message: data });
    }

    await updateData(data, userId);
    res.status(200).json({ message: "Save atualizado com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: `Erro interno no servidor: ${err}` });
  }
};
