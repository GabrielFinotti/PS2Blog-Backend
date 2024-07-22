import { userModel } from "../../../models/userModel";

export const findUserByEmail = async (email: string) => {
  const user = await userModel.findOne({ email });

  if (!user) return false;

  return user;
};
