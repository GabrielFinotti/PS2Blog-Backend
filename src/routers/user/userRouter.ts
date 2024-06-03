import { Router } from "express";
import { controllers } from "../../controllers/controllers";

export const userRouter = Router();

userRouter.post("/user/register", controllers.userRegister);
userRouter.post("/user/login", controllers.userLogin);
userRouter.post("/user/data/:id", controllers.getUserData);
userRouter.post("/user/update/:id", controllers.userUpdate);
