import { Router } from "express";
import { controllers } from "../../controllers/controllers";
import { authenticate } from "../../middleware/authRouter";

export const userRouter = Router();

userRouter.post("/user/register", controllers.userRegister);
userRouter.post("/user/login", controllers.userLogin);
userRouter.post("/user/data", authenticate, controllers.getUserData);
userRouter.put("/user/update", authenticate, controllers.userUpdate);
