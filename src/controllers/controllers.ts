import { defaultGameSearch } from "./gameList/defaultGameSearch";
import { likeGameSearch } from "./gameList/likeGameSearch";
import { ratingGameSearch } from "./gameList/ratingGameSearch";
import { deleteUser } from "./user/deleteUser";
import { userData } from "./user/userData";
import { googleLogin, userLogin } from "./user/userLogin";
import { googleRegister, userRegister } from "./user/userRegister";
import { userUpdate } from "./user/userUpdate";

export const controllers = {
  userRegister,
  googleRegister,
  userLogin,
  googleLogin,
  userUpdate,
  userData,
  deleteUser,
  defaultGameSearch,
  likeGameSearch,
  ratingGameSearch,
};
