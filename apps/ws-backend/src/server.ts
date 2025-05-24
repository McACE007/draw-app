import { WebSocket, WebSocketServer } from "ws";
import { User } from "./types";
import { verifyToken } from "./auth";
import { handleMessage } from "./handlers";

const wss = new WebSocketServer({ port: 8081 });
const users = new Map<WebSocket, User>();

wss.on("connection", (ws, req) => {
  const authHeader = req.headers.authorization;
  const userId = verifyToken(authHeader);

  if (!userId) {
    ws.close(1008, "Unauthorized");
    return;
  }

  const user: User = { ws, userId, rooms: new Set<string>() };
  users.set(ws, user);

  ws.on("message", (data) => handleMessage(data.toString(), user, users));
  ws.on("close", () => users.delete(ws));
});
