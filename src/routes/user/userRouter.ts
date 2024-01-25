import express from "express";
import { controller } from "../../controllers/controllers";

export const userRouter = express.Router();

userRouter.post("/user/login", controller.login);
userRouter.post("/user/register", controller.register);
userRouter.put("/user/update/:id", controller.update);

