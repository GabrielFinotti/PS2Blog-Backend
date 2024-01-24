import express from "express";
import { controller } from "../../controllers/controllers";

const gameListRouter = express.Router();

gameListRouter.get("/games", controller.allGames);

export default gameListRouter;
