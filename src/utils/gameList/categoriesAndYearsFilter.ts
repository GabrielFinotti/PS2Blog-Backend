import { gameModel } from "../../models/gameModel";

export const categoriesAndYearsFilter = async () => {
  try {
    const data = await gameModel.find().select("category release").lean();

    const categories = Array.from(
      new Set(data.map((data) => data.category).sort())
    );
    const releases = Array.from(
      new Set(
        data
          .map((data) => {
            if (data.release.includes("-")) {
              return data.release.split("-")[0];
            } else {
              return data.release;
            }
          })
          .sort()
      )
    );

    const dataMapping = {
      categories,
      releases,
    };

    return dataMapping;
  } catch (error) {
    throw error;
  }
};
