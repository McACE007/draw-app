import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { me, signin, signup } from "../controllers/authController";

const authRouter: Router = Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.get("/me", authMiddleware, me);

export default authRouter;
