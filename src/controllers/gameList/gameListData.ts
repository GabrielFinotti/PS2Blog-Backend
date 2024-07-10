import { Request, Response } from "express";

export const gameListData = async (req: Request, res: Response) => {
  try {
    
  } catch (error) {
    console.log(`Error: ${error}`.red.bgBlack);

    return res.sendStatus(500);
  }
};
