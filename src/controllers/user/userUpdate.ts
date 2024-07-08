import { Request, Response } from "express";
import { userDataUpdate } from "../../utils/user/userValidations";

export const userUpdate = async (req: Request, res: Response) => {
  try {
    const { message, status } = await userDataUpdate(req.body, req.params.id);

    res.status(status).send({ message: message });
  } catch (error) {
    console.log(`Error: ${error}`.red.bgBlack);
  }
};
