import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/constants";

const wss = new WebSocketServer({ port: 8081 });

wss.on("connection", (ws, req) => {
  const token = req.headers.authorization;

  if (!token) {
    ws.close(1008, "token missing");
    console.log("token missing");
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    console.log("Authenticated user:", payload);

    ws.on("message", (data) => {
      ws.send("pong");
      ws.send(payload.id);
    });
  } catch (e) {
    console.log(e);
    ws.close();
  }
});
