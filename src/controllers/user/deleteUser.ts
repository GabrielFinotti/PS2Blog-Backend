import { Request, Response } from "express";
import { findUserById } from "../../utils/user/search/findUserById";
import { deleteLike } from "../../utils/gameList/likes/deleteLike";
import { deleteComment } from "../../utils/gameList/comments/deleteComment";

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await findUserById(req.params.id);

    if (!user) {
      return res.status(404).send({ message: "No saves found!" });
    }

    await deleteLike(user.id);
    await deleteComment(user.id);

    await user.deleteOne();

    return res.status(200).send({
      message: "Save deleted successfully!",
    });
  } catch (error) {
    console.log(
      `Error trying to delete your save, try again. Error: ${error}`.red.bgBlack
    );

    return res.status(500).send({
      message: `Error trying to delete your save, try again. Error: ${error}`,
    });
  }
};
