import { Router } from "express";
import { controllers } from "../../controllers/controllers";
import { authenticate } from "../../middleware/authRouter";

export const userRouter = Router();

userRouter.post("/auth/register", controllers.userRegister);
userRouter.post("/auth/google/register", controllers.googleRegister);
userRouter.post("/auth/login", controllers.userLogin);
userRouter.post("/auth/google/login", controllers.googleLogin);
userRouter.get("/user/data", authenticate, controllers.userData);
userRouter.put("/user/data/update", authenticate, controllers.userUpdate);
