import { defaultGameSearch } from "./gameList/defaultGameSearch";
import { deleteGameComment } from "./gameList/deleteGameComment";
import { deleteGameLike } from "./gameList/deleteGameLike";
import { gameCategoriesAndYears } from "./gameList/gameCategoriesAndYears";
import { gameData } from "./gameList/gameData";
import { likeGameSearch } from "./gameList/likeGameSearch";
import { ratingGameSearch } from "./gameList/ratingGameSearch";
import { sendCommentGame } from "./gameList/sendCommentGame";
import { sendLikeGame } from "./gameList/sendLikeGame";

import { deleteUser } from "./user/deleteUser";
import { userData } from "./user/userData";
import { userLogin } from "./user/userLogin";
import { userRegister } from "./user/userRegister";
import { userUpdate } from "./user/userUpdate";

export const controllers = {
  userRegister,
  userLogin,
  userUpdate,
  userData,
  deleteUser,
  defaultGameSearch,
  likeGameSearch,
  ratingGameSearch,
  gameCategoriesAndYears,
  gameData,
  sendCommentGame,
  sendLikeGame,
  deleteGameComment,
  deleteGameLike,
};
