import { gameSearch } from "./gameList/gameSearch";
import { likeGameSearch } from "./gameList/likeGameSearch";
import { ratingGameSearch } from "./gameList/ratingGameSearch";
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
  gameSearch,
  likeGameSearch,
  ratingGameSearch,
};
