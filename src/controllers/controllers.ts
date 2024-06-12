import { getUserData } from "./user/getUserData";
import { userImageUpdate } from "./user/userImageUpdate";
import { userLogin } from "./user/userLogin";
import { userRegister } from "./user/userRegister";
import { userUpdate } from "./user/userUpdate";

export const controllers = {
  userRegister,
  userLogin,
  getUserData,
  userUpdate,
  userImageUpdate,
};
