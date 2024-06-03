import { Request, Response } from "express";

export const userUpdate = async (req: Request, res: Response) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    console.log(`Error: ${error}`.red.bgBlack);
  }
};
