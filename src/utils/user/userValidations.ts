import bcrypt from "bcrypt";
import { User } from "../../interfaces/user";
import { userModel } from "../../models/userModel";
import { Document } from "mongoose";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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

export const dataLogin = async (data: User) => {
  const { email, password } = data;

  if (!email || !password) {
    return { message: "No field can be empty!" };
  } else if (!emailRegex.test(email)) {
    return { message: "Enter a valid email!" };
  }

  return true;
};

export const dataUpdate = async (
  data: Partial<User>,
  user: Document<unknown, {}, User> & User,
  currentPass?: string
) => {
  let newData!: Partial<User>;
  const messages: string[] = [];

  if (data.username) {
    if (data.username != data.username.trim()) {
      messages.push("Username cannot begin and end with spaces");
    } else if (data.username.length < 6 || data.username.length > 16) {
      messages.push(
        "Username must be a minimum of 6 and a maximum of 16 characters!"
      );
    } else if (data.username === user.username) {
      messages.push("That's the username!");
    } else {
      newData.username = data.username;

      messages.push("Username updated successfully!");
    }
  }

  if (data.password) {
    if (!currentPass) {
      messages.push(
        "Please enter your current password to create a new password."
      );
    } else {
      const isPass = await verifyHasPass(currentPass, data.password);

      if (data.password.length < 8 || data.password.length > 20) {
        messages.push(
          "Password must be a minimum of 8 and a maximum of 20 characters!"
        );
      } else if (!isPass) {
        messages.push(
          "Current password sent is not the same as saved, check and try again to create a new password!"
        );
      } else if (data.password === user.password) {
        messages.push("That's the password!");
      } else {
        newData.password = await hashPass(data.password);

        messages.push("Password updated successfully!");
      }
    }
  }

  if (data.email) {
    if (!emailRegex.test(data.email)) {
      messages.push("Enter a valid email for update!");
    } else if (data.email === user.email) {
      messages.push("That's the email!");
    } else {
      const existingUser = await findUserByEmail(data.email);

      if (existingUser) {
        messages.push("This email is already in use!");
      } else {
        newData.email = data.email;

        messages.push("Email updated successfully!");
      }
    }
  }

  if (data.bio) {
    if (data.bio != data.bio.trim()) {
      messages.push("Your biography cannot begin or end with spaces!");
    } else if (data.bio.length > 500) {
      messages.push(
        "We are eager to know your full story, but try to summarize it in a maximum of 500 characters"
      );
    } else if (data.bio === user.bio) {
      messages.push("That's the bio!");
    } else {
      newData.bio = data.bio;

      messages.push("Bio updated successfully!");
    }
  }

  if (Object.keys(newData).length > 0) {
    await user.updateOne({ $set: newData });

    return messages;
  }
};

export const findUserByEmail = async (email: string) => {
  const user = await userModel.findOne({ email });

  if (!user) return false;

  return user;
};

export const findUserById = async (id: string) => {
  const user = await userModel.findById(id);

  if (!user) return false;

  return user;
};

export const hashPass = async (pass: string) => {
  const password = await bcrypt.hash(pass, 10);

  return password;
};

export const verifyHasPass = async (pass: string, userSavePass: string) => {
  const isPass = await bcrypt.compare(pass, userSavePass);

  return isPass;
};
