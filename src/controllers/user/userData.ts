import { Request, Response } from "express";
import { findUserById, getData } from "../../utils/user/userValidations";

export const userData = async (req: Request, res: Response) => {
  try {
    const verifyUser = await findUserById(req.params.id);

    if (!verifyUser) {
      return res.status(404).send({ message: "No saves found!" });
    }

    const userData = await getData(req.params.id);

    return res.status(200).send(userData);
  } catch (error) {
    console.log(`Error: ${error}`);

    return res.sendStatus(500);
  }
};
