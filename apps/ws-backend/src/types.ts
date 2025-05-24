import { WebSocket } from "ws";

export type ClientMessage = {
  type: "join_room" | "leave_room" | "chat";
  roomId: string;
  message?: string;
};

export type ServerMessage = {
  type: "chat";
  roomId: string;
  message: string;
  from: string;
};

export type User = {
  ws: WebSocket;
  userId: string;
  rooms: Set<string>;
};
