import { defaultGameSearch } from "./gameList/defaultGameSearch";
import { gameCategoriesAndYears } from "./gameList/gameCategoriesAndYears";
import { likeGameSearch } from "./gameList/likeGameSearch";
import { ratingGameSearch } from "./gameList/ratingGameSearch";
import { deleteUser } from "./user/deleteUser";
import { userData } from "./user/userData";
import { userLogin } from "./user/userLogin";
import { userRegister } from "./user/userRegister";
import { userUpdate } from "./user/userUpdate";

export const controllers = {
  userRegister,
  userLogin,
  userUpdate,
  userData,
  deleteUser,
  defaultGameSearch,
  likeGameSearch,
  ratingGameSearch,
  gameCategoriesAndYears,
};
