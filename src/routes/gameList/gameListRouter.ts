import express from "express";
import { controller } from "../../controllers/controllers";

export const gameListRouter = express.Router();

gameListRouter.get("/games", controller.allGames);

