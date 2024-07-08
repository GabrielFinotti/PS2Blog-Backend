import { getGameList } from "./gameList/getGameList";
import { getUserData } from "./user/getUserData";
import { userLogin } from "./user/userLogin";
import { userRegister } from "./user/userRegister";
import { userUpdate } from "./user/userUpdate";

export const controllers = {
  userRegister,
  userLogin,
  getUserData,
  userUpdate,
  getGameList,
};
