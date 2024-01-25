import { allGames } from "./gameList/list";
import { login } from "./user/auth";
import { register } from "./user/register";
import { update } from "./user/update";

export const controller = {
  login,
  register,
  update,
  allGames,
};
