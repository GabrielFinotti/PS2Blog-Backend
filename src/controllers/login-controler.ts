import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../models/user-model";

const loginControler = express.Router();

loginControler.post("/", async (req: Request, res: Response) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("Player Name não existe!");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).send("Senha inválida");
    }
    res.send("Save carregado com sucesso!");
  } catch (err) {
    res.status(500).send(err);
  }
});

export default loginControler;
