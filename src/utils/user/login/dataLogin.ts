import { User } from "../../../interfaces/user";
import { emailRegex } from "../../auth/emailRegex";

export const dataLogin = async (data: User) => {
  const { email, password } = data;

  if (!email || !password) {
    return { message: "No field can be empty!" };
  } else if (!emailRegex.test(email)) {
    return { message: "Enter a valid email!" };
  }

  return true;
};
