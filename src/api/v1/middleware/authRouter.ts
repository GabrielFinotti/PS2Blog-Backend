import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "./src/env/.env" });

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.SECRET_KEY, (error, payload) => {
      if (error) return res.status(403).send({ message: "Invalid Token!" });

      if (payload && typeof payload != "string") {
        req.params.id = payload.userId;

        return next();
      }

      return res.sendStatus(401);
    });
  } catch (error) {
    console.log(
      `Error when trying to validate the token! Error: ${error}`.red.bgBlack
    );

    return res.sendStatus(500);
  }
};
