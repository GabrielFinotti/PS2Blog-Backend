import express from "express";
import { login, register, update } from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.put("/update", update);

export default userRouter;
