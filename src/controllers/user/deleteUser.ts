import { Request, Response } from "express";
import { findUserById } from "../../utils/user/userValidations";
import admin from "firebase-admin";

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await findUserById(req.params.id);

    if (!user) {
      return res.status(404).send({ message: "No saves found!" });
    }

    await user.deleteOne();

    return res.status(200).send({
      message: "Save deleted successfully!",
    });
  } catch (error) {
    console.log(`Error: ${error}`);
    
    return res.status(500).send({
      message: `Error trying to delete your save, try again. Error: ${error}`,
    });
  }
};
