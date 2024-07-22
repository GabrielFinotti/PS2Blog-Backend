import { Request, Response } from "express";
import { userDataRegister } from "../../utils/userValidations";
import { userModel } from "../../models/userModel";

export const userRegister = async (req: Request, res: Response) => {
  try {
    const result = await userDataRegister(req.body);

    if (typeof result === "string") {
      return res.status(400).json({ message: result });
    }

    const existingUser = await userModel.findOne({ email: result.email });

    if (existingUser) {
      return res
        .status(409)
        .send({ message: "There is already an account linked to this email!" });
    }

    const user = new userModel({
      username: result.username,
      email: result.email,
      password: result.password,
    });

    await user.save();

    res.status(201).json({
      message: "Save created successfully, have fun!",
      data: {
        username: result.username,
        email: result.email,
      },
    });
  } catch (error) {
    console.log(`Error: ${error}`.red.bgBlack);

    res.sendStatus(500);
  }
};
