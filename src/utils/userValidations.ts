import mongoose from "mongoose";
import { User } from "../interfaces/user";
import { userModel } from "../models/userModel";
import bcrypt from "bcrypt";

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
    return "Username must be a minimum of 5 and a maximum of 16 characters!";
  } else if (password.length < 8 || password.length > 20) {
    return "Password must have a minimum of 8 and a maximum of 16 characters!";
  }

  if (!emailRegex.test(email)) return "Enter a valid email";

  const hashPassword = await bcrypt.hash(password, 10);

  userData.password = hashPassword;

  return userData;
};

export const userDataLogin = async (userData: User) => {
  const { email, password } = userData;

  if (!email || !password) {
    return { message: "No field can be empty!", status: 400 };
  }

  const existingUser = await userModel.findOne({ email });

  if (!existingUser) return { message: "No users found!", status: 404 };

  if (existingUser?.password) {
    const verifyPass = await bcrypt.compare(password, existingUser.password);

    if (!verifyPass)
      return { message: "Incorrect data, check and try again!", status: 403 };
  }

  return { message: "Save loaded successfully, good game!", status: 200 };
};

export const requestUserData = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return "Invalid id!";

  const user = await userModel.findById(id, {
    _id: false,
    password: false,
  });

  if (!user) {
    return "Id does not match any user!";
  }

  return user;
};
