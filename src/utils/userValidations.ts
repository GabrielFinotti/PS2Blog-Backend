import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../interfaces/user";
import { userModel } from "../models/userModel";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const userDataRegister = async (
  userData: User
): Promise<User | string> => {
  const { username, email, password } = userData;

  if (!username || !email || !password) return "No field can be empty!";

  if (username != username.trim() || password != password.trim()) {
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
    const verifyPass: boolean = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!verifyPass) {
      return { message: "Incorrect data, check and try again!", status: 403 };
    }
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

export const userDataUpdate = async (userData: User, id: string) => {
  const { username, email, bio } = userData;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return { message: "Invalid id!", status: 401 };
  }

  const user = await userModel.findById(id);

  if (!user) {
    return { message: "Id does not match any user!", status: 400 };
  } else if (!username || !email) {
    return { message: "User and email cannot be empty!", status: 400 };
  }

  if (username != username.trim() || email != email.trim()) {
    return {
      message: "Email and user field cannot contain spacing!",
      status: 400,
    };
  }

  if (bio && bio.length > 500) {
    return {
      message:
        "Your story must be incredible, but we can't receive it all. Please enter a maximum of 500 characters!",
      status: 400,
    };
  } else if (username.length < 5 || username.length > 16) {
    return { message: "User cannot be empty!", status: 400 };
  }

  if (!emailRegex.test(email)) {
    return { message: "Enter a valid email!", status: 400 };
  }

  const update: Partial<User> = {};

  if (user.email != email) {
    update.email = email;
  }
  if (user.username != username) {
    update.username = username;
  }
  if (user.bio != bio && bio != undefined) {
    update.bio = bio;
  }

  if (Object.keys(update).length > 0) {
    await user.updateOne({ $set: update });

    return { message: "Save updated successfully!", status: 200 };
  } else {
    return { message: "No new values, save the same!", status: 403 };
  }
};
