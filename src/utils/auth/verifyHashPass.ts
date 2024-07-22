import bcrypt from "bcrypt";

export const verifyHashPass = async (pass: string, userSavePass: string) => {
  const isPass = await bcrypt.compare(pass, userSavePass);

  return isPass;
};
