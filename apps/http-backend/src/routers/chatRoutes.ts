import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getAllChatsByRoomId } from "../controllers/chatController";

const chatRouter: Router = Router();

chatRouter.get("/:roomId", authMiddleware, getAllChatsByRoomId);

export default chatRouter;
