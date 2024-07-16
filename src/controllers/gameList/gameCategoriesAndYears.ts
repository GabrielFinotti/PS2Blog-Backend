import { categoriesAndYearsFilter } from "./../../utils/gameList/categoriesAndYearsFilter";
import { Request, Response } from "express";

export const gameCategoriesAndYears = async (req: Request, res: Response) => {
  try {
    const categoriesAndYearsList = await categoriesAndYearsFilter();

    return res.status(200).send(categoriesAndYearsList);
  } catch (error) {
    console.log(
      `Error when trying to retrieve the categories and years of the games. Error: ${error}`
        .red.bgBlack
    );

    return res
      .status(500)
      .send({
        message:
          "Error when trying to retrieve the categories and years of the games!",
      });
  }
};
