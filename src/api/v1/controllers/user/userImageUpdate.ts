import { Request, Response } from "express";
import uploudUserImage from "../../utils/uploudUserImage";

export const userImageUpdate = async (req: Request, res: Response) => {
  try {
    if (!req.file) return res.status(404).send({ message: "File not found!" });

    const results = await uploudUserImage(
      req.body.username,
      req.params.id,
      req.file
    );

    if (results.status != 201) {
      return res.status(results.status).send({ message: results.message });
    }

    res.status(201).send({ message: results.message });
  } catch (error) {
    console.log(`Error: ${error}`.red.bgBlack);
    res.sendStatus(500);
  }
};
