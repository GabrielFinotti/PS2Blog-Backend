import bcrypt from "bcrypt";
import mongoose from "mongoose";
import userModel from "../models/user-model";
import { UserData } from "../interfaces/user-data";

export const validateUserData = async (
  userData: UserData
): Promise<string | UserData> => {
  const { username, password, email } = userData;

  if (!username && !password && !email) {
    return "Nenhum dado fornecido!";
  }

  if (
    (username && username !== username.trim()) ||
    (password && password !== password.trim())
  ) {
    return "Os dados não podem começar com espaçamentos";
  }

  if (username && (username.length < 4 || username.length > 16)) {
    return "O nome de usuário deve ter entre 4 e 16 caracteres!";
  }

  if (email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return "Insira um email válido!";
    }
  }

  if (password && (password.length < 6 || password.length > 20)) {
    return "A senha deve ter entre 6 e 20 caracteres!";
  }

  return userData;
};

export const updateData = async (
  userData: UserData,
  id: mongoose.Types.ObjectId
): Promise<void> => {
  let updateData: Partial<UserData> = {};

  if (userData.username) updateData.username = userData.username;
  if (userData.email) updateData.email = userData.email.toLowerCase();

  if (userData.password) {
    const newPassword = await bcrypt.hash(userData.password, 10);
    updateData.password = newPassword;
  }

  await userModel.findByIdAndUpdate(id, { $set: updateData });
};
