import { Router } from "express";

export const userRouter = Router();

userRouter.post("/user/register");
userRouter.post("/user/login");
userRouter.put("/user/update");
