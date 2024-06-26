import { Router } from "express";
import { authenticate } from "../../middleware/authRouter";
import { controllers } from "../../controllers/controllers";

export const gameList = Router();

gameList.get("/games", authenticate, controllers.getGameList);
