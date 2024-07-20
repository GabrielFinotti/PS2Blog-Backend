import { gameModel } from "../../../models/gameModel";

export const ratingGameFilter = async () => {
  try {
    const gameList = await gameModel
      .find()
      .select("image name rating")
      .sort({ rating: -1 })
      .limit(5)
      .lean();

    return gameList;
  } catch (error) {
    throw error;
  }
};
