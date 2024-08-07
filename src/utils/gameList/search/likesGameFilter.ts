import { gameModel } from "../../../models/gameModel";

export const likesGameFilter = async () => {
  try {
    const gameList = await gameModel
      .find()
      .select("image name likes.totalLikes")
      .sort({ 'likes.totalLikes': -1 })
      .limit(5)
      .lean();

    return gameList;
  } catch (error) {
    throw error;
  }
};
