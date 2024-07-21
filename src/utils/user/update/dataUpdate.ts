import { Document } from "mongoose";
import { User } from "../../../interfaces/user";
import { emailRegex } from "../../auth/emailRegex";
import { hashPass } from "../../auth/hashPass";
import { findUserByEmail } from "../search/findUserByEmail";
import { verifyHashPass } from "../../auth/verifyHashPass";

export const dataUpdate = async (
  data: Partial<User>,
  user: Document<unknown, {}, User> & User,
  currentPass?: string
) => {
  let newData: Partial<User> = {};
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
      const isPass = await verifyHashPass(currentPass, user.password);

      if (data.password.length < 8 || data.password.length > 20) {
        messages.push(
          "Password must be a minimum of 8 and a maximum of 20 characters!"
        );
      } else if (data.password != data.password.trim()) {
        messages.push("Password cannot begin and end with spaces");
      } else if (!isPass) {
        messages.push(
          "Current password sent is not the same as saved, check and try again to create a new password!"
        );
      } else {
        if (data.password === currentPass) {
          messages.push("That's the password!");
        } else {
          newData.password = await hashPass(data.password);

          messages.push("Password updated successfully!");
        }
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

  if (data.image) {
    newData.image = data.image;

    messages.push("Image updated successfully!");
  }

  if (Object.keys(newData).length > 0) {
    await user.updateOne({ $set: newData });
  }

  return messages;
};
