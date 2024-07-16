import { Request, Response } from "express";
import { gameModel } from "../../models/gameModel";

export const gameCategoriesAndYears = async (req: Request, res: Response) => {
  try {
    const categoriesAndYearsData = await gameModel
      .find()
      .select("category release")
      .lean();

    const categoriesAndYearsList = {
      categories: Array.from(
        new Set(categoriesAndYearsData.map((data) => data.category).sort())
      ),
      release: Array.from(
        new Set(
          categoriesAndYearsData
            .map((data) => {
              if (data.release.includes("-")) {
                return data.release.split("-")[0];
              } else {
                return data.release;
              }
            })
            .sort()
        )
      ),
    };

    return res.status(200).send(categoriesAndYearsList);
  } catch (error) {
    console.log(`Error: ${error}`);

    return res
      .status(500)
      .send({ message: "Error when trying to retrieve categories!" });
  }
};
