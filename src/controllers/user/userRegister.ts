import { Request, Response } from "express";
import {
  dataRegister,
  findUserByEmail,
  hashPass,
} from "../../utils/user/userValidations";
import { userModel } from "../../models/userModel";
import firebaseConfig from "../../db/firebaseConfig";

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

export const googleRegister = async (req: Request, res: Response) => {
  try {
    const uid = req.body.uid as string;

    if (!uid) {
      return res.status(401).send({
        message: "Credentials required to register with Google account!",
      });
    }

    const app = await firebaseConfig();
    const userRecord = await app.auth().getUser(uid);

    if (!userRecord) {
      return res.status(404).send({
        message:
          "Unable to retrieve the data required to register the account!",
      });
    }

    const findUser = await findUserByEmail(userRecord.email as string);

    if (findUser) {
      return res.status(409).json({ message: "This email is already in use!" });
    }

    const password = await hashPass(userRecord.email as string);

    const user = new userModel({
      email: userRecord.email,
      username: userRecord.displayName,
      password: password,
    });

    await user.save();

    return res.status(201).json({
      message: "Save created successfully!",
    });
  } catch (error) {
    console.log(`Error: ${error}`.red.bgBlack);
    return res.sendStatus(500);
  }
};
