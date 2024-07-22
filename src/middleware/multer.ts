import { NextFunction, Request, Response } from "express";
import multer from "multer";

export const userImageMulter = (req: Request, res: Response, next: NextFunction) => {
  multer().single("image")(req, res, (err) => {
    if (err) {
      return res.sendStatus(500);
    }

    return next();
  });
};
