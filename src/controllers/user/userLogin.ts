import { Request, Response } from "express";
import { userDataLogin } from "../../utils/userValidations";
import { userModel } from "../../models/userModel";
import { newJwtLogin } from "../../utils/jwtGenerate";

export const userLogin = async (req: Request, res: Response) => {
  try {
    const saveProfile: boolean = req.body.save;
    const { message, status } = await userDataLogin(req.body);

    if (status != 200) {
      return res.status(status).send({ message: message });
    }

    const userData = await userModel.findOne(
      { email: req.body.email },
      { _id: true, username: true }
    );

    const getUserLoginToken = await newJwtLogin(userData?.id, saveProfile);

    if (!getUserLoginToken.token) {
      return res.status(500).send({ message: getUserLoginToken.message });
    }

    res.status(status).json({
      message: message,
      username: userData?.username,
      token: getUserLoginToken.token,
    });
  } catch (error) {
    console.log(`Error: ${error}`.red.bgBlack);

    res.sendStatus(500);
  }
};
