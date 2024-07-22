import { userModel } from "../../../models/userModel";

export const findUserData = async (id: string) => {
    try {
      let user = await userModel
        .findById(id, { password: false })
        .populate("likedGames.games.gameId", "image name");
  
      if (user) {
        user = user.toObject();
      }
  
      return user;
    } catch (error) {
      throw error;
    }
  };