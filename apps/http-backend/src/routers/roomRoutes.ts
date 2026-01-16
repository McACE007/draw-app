import { Router } from "express";
import { createRoom, getRoomIdBySlug } from "../controllers/roomController";
import { authMiddleware } from "../middlewares/authMiddleware";

const roomRouter: Router = Router();

roomRouter.post("/", authMiddleware, createRoom);
roomRouter.get("/:slug", authMiddleware, getRoomIdBySlug);

export default roomRouter;
