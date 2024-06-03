import { Request, Response } from "express";
import { userDataLogin } from "../../utils/userValidations";
import { userModel } from "../../models/userModel";

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { message, status } = await userDataLogin(req.body);

    if (status != 200) {
      return res.status(status).send({ message: message });
    }

    const userData = await userModel.findOne(
      { email: req.body.email },
      { _id: true }
    );

    res.status(status).json({ message: message, id: userData?.id });
  } catch (error) {
    console.log(`Error: ${error}`.red.bgBlack);

    res.sendStatus(500);
  }
};
