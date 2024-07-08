import { Request, Response } from "express";
import { userDataLogin } from "../../utils/user/userValidations";
import { newJwtLogin } from "../../utils/auth/jwtGenerate";

export const userLogin = async (req: Request, res: Response) => {
  try {
    const saveProfile: boolean = req.body.save;
    const { message, status, existingUser } = await userDataLogin(req.body);

    if (status != 200) {
      return res.status(status).send({ message: message });
    }

    const getUserLoginToken = await newJwtLogin(existingUser?.id, saveProfile);

    if (!getUserLoginToken.token) {
      return res.status(500).send({ message: getUserLoginToken.message });
    }

    res.status(status).json({
      message: message,
      username: existingUser?.username,
      token: getUserLoginToken.token,
    });
  } catch (error) {
    console.log(`Error: ${error}`.red.bgBlack);

    res.sendStatus(500);
  }
};
