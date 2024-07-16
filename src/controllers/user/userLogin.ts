import { Request, Response } from "express";
import { newJwtLogin } from "../../utils/auth/jwtGenerate";
import {
  dataLogin,
  findUserByEmail,
  verifyHasPass,
} from "../../utils/user/userValidations";

export const userLogin = async (req: Request, res: Response) => {
  try {
    const validationResult = await dataLogin(req.body);
    const isSaveData = req.body.isSaveData as boolean;

    if (typeof validationResult === "object") {
      return res.status(400).json(validationResult);
    }

    const findUser = await findUserByEmail(req.body.email);

    if (!findUser) {
      return res.status(404).send({ message: "No saves found!" });
    }

    const validationPass = await verifyHasPass(
      req.body.password,
      findUser.password
    );

    if (!validationPass) {
      return res
        .status(403)
        .send({ message: "Incorrect data, check and try again!" });
    }

    const token = await newJwtLogin(findUser.id, isSaveData);

    if (!token.token) {
      return res.status(500).json(token.message);
    }

    return res.status(200).send({
      message: "Save loaded successfully, good play!",
      token: token.token,
    });
  } catch (error) {
    console.log(`Error: ${error}`.red.bgBlack);

    return res.sendStatus(500);
  }
};
