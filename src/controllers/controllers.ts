import { allGames } from "./gameList/getGameList";
import { login } from "./user/authUser";
import { getUserData } from "./user/getUser";
import { register } from "./user/registerUser";
import { update } from "./user/updateUser";

export const controller = {
  login,
  register,
  update,
  getUserData,
  allGames,
};
