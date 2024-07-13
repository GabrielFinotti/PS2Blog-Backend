import { Request, Response } from "express";
import {
  dataRegister,
  findUserByEmail,
  hashPass,
} from "../../utils/user/userValidations";
import { userModel } from "../../models/userModel";

export const userRegister = async (req: Request, res: Response) => {
  try {
    const validationResult = await dataRegister(req.body);

    if (typeof validationResult === "object") {
      return res.status(400).send(validationResult);
    }

    const findUser = await findUserByEmail(req.body.email);

    if (findUser) {
      return res.status(409).json({ message: "This email is already in use!" });
    }

    const password = await hashPass(req.body.password);
    req.body.password = password;

    const user = new userModel(req.body);

    await user.save();

    return res.status(201).json({ message: "Save created successfully!" });
  } catch (error) {
    console.log(`Error: ${error}`.red.bgBlack);
    return res.sendStatus(500);
  }
};
