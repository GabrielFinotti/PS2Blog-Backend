import { User } from "../../../interfaces/user";
import { emailRegex } from "../../auth/emailRegex";

export const dataRegister = async (data: User) => {
  const { username, email, password } = data;

  if (!username || !email || !password) {
    return { message: "No field can be empty!" };
  } else if (!emailRegex.test(email)) {
    return { message: "Enter a valid email!" };
  }

  if (username != username.trim() || password != password.trim()) {
    return { message: "Fields cannot begin or end with spaces!" };
  }

  if (username.length < 6 || username.length > 16) {
    return {
      message:
        "Username must be a minimum of 6 and a maximum of 16 characters!",
    };
  } else if (password.length < 8 || password.length > 20) {
    return {
      message:
        "Password must be a minimum of 8 and a maximum of 20 characters!",
    };
  }

  return true;
};
