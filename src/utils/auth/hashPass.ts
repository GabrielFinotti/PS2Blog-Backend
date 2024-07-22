import bcrypt from "bcrypt";

export const hashPass = async (pass: string) => {
  const password = await bcrypt.hash(pass, 10);

  return password;
};
