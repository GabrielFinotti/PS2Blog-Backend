import { User } from "../interfaces/user";

export const userDataRegister = async (
  userData: User
): Promise<User | string> => {
  const { username, email, password } = userData;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!username || !email || !password) return "No field can be empty!";

  if (
    username != username.trim() ||
    email != email.trim() ||
    password != password.trim()
  ) {
    return "Fields cannot begin or end with spaces!";
  }

  if (username.length < 5 || username.length > 16) {
    return "Username must be a minimum of 5 and a maximum of 16 characters";
  } else if (password.length < 8 || password.length > 20) {
    return "Password must have a minimum of 8 and a maximum of 16 characters";
  }

  if (!emailRegex.test(email)) return "Enter a valid email";

  return userData;
};
