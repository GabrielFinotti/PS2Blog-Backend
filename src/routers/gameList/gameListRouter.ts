import { Router } from "express";
import { authenticate } from "../../middleware/authRouter";
import { controllers } from "../../controllers/controllers";

export const gameList = Router();

gameList.get("/games", authenticate, controllers.defaultGameSearch);
gameList.get("/games/rating", authenticate, controllers.ratingGameSearch);
gameList.get("/games/likes", authenticate, controllers.likeGameSearch);
