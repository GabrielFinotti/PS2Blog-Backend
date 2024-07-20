import { Router } from "express";
import { authenticate } from "../../middleware/authRouter";
import { controllers } from "../../controllers/controllers";

export const gameList = Router();

gameList.get("/games", authenticate, controllers.defaultGameSearch);
gameList.get("/games/rating", authenticate, controllers.ratingGameSearch);
gameList.get("/games/likes", authenticate, controllers.likeGameSearch);
gameList.get(
  "/games/categoriesAndYears",
  authenticate,
  controllers.gameCategoriesAndYears
);

gameList.put("/games/sendLike/:gameId", authenticate, controllers.sendLikeGame);
gameList.put(
  "/games/sendComment/:gameId",
  authenticate,
  controllers.sendCommentGame
);

gameList.delete(
  "/games/deleteLike/:gameId",
  authenticate,
  controllers.deleteGameLike
);
gameList.delete("/games/deleteComment/:gameId", authenticate),
  controllers.deleteGameComment;
