import { Request, Response } from "express";
import { dataUpdate, findUserById } from "../../utils/user/userValidations";

export const userUpdate = async (req: Request, res: Response) => {
  try {
    const verifyUser = await findUserById(req.params.id);
    const currentPass = req.body.currentPass as string | undefined;

    if (!verifyUser) {
      return res.status(404).send({ message: "No saves found!" });
    }

    const updateResult = await dataUpdate(req.body, verifyUser, currentPass);

    if (updateResult.length > 0) {
      return res.status(200).send(updateResult);
    }

    return res.sendStatus(204);
  } catch (error) {
    console.log(`Error: ${error}`.red.bgBlack);

    res.sendStatus(500);
  }
};
