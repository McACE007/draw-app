import { Router } from "express";
import { createRoom, getAllChatsByRoomId } from "../controllers/roomController";
import { authMiddleware } from "../middlewares/authMiddleware";

const roomRouter: Router = Router();

roomRouter.post("/", authMiddleware, createRoom);
roomRouter.get("/:roomId", authMiddleware, getAllChatsByRoomId);

export default roomRouter;
