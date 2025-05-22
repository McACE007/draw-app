import { Router } from "express";
import { createRoom } from "../controllers/roomController";
import { authMiddleware } from "../middlewares/authMiddleware";

const roomRouter: Router = Router();

roomRouter.get("/", authMiddleware, createRoom);

export default roomRouter;
