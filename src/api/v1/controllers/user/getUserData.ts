import { Request, Response } from "express";
import { requestUserData } from "../../utils/userValidations";

export const getUserData = async (req: Request, res: Response) => {
  try {
    const result = await requestUserData(req.params.id);

    if (typeof result === "string") {
      return res.status(401).send({ message: result });
    }

    res.status(200).send(result);
  } catch (error) {
    console.log(`Error: ${error}`.red.bgBlack);

    res.sendStatus(500);
  }
};
