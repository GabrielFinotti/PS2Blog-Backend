import { getGameList } from "./gameList/getGameList";
import { userData } from "./user/userData";
import { userLogin } from "./user/userLogin";
import { googleRegister, userRegister } from "./user/userRegister";
import { userUpdate } from "./user/userUpdate";

export const controllers = {
  userRegister,
  googleRegister,
  userLogin,
  userUpdate,
  userData,
  getGameList,
};
