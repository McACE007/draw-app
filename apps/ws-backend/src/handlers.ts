import { WebSocket } from "ws";
import { ClientMessage, ServerMessage, User } from "./types";
import { prisma } from "@repo/db";

export const handleMessage = async (
  rawData: string,
  user: User,
  users: Map<WebSocket, User>
) => {
  let data: ClientMessage;

  try {
    data = JSON.parse(rawData);
  } catch {
    user.ws.send(JSON.stringify({ error: "Invaild JSON" }));
    return;
  }

  switch (data.type) {
    case "join_room":
      user.rooms.add(data.roomId);
      break;
    case "leave_room":
      user.rooms.delete(data.roomId);
      break;
    case "chat":
      if (!data.roomId || !data.message) return;
      await prisma.chat.create({
        data: {
          message: data.message,
          roomId: data.roomId,
          userId: user.userId,
        },
      });
      broadcastToRoom(
        data.roomId,
        {
          type: "chat",
          roomId: data.roomId,
          message: data.message,
          from: user.userId,
        },
        users
      );
      break;
    default:
      user.ws.send(JSON.stringify({ error: "Unknown message type" }));
  }
};

function broadcastToRoom(
  roomId: string,
  message: ServerMessage,
  users: Map<WebSocket, User>
) {
  for (const user of users.values()) {
    if (user.rooms.has(roomId)) {
      user.ws.send(JSON.stringify(message));
    }
  }
}
