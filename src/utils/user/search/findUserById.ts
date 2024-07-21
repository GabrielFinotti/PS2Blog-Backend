import { userModel } from "../../../models/userModel";

export const findUserById = async (id: string) => {
    const user = await userModel.findById(id);
  
    if (!user) return false;
  
    return user;
  };