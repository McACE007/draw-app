import express from "express";
import cors from "cors";

import authRouter from "./routers/authRoutes";
import roomRouter from "./routers/roomRoutes";
import chatRouter from "./routers/chatRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chats", chatRouter);
app.use("/api/auth", authRouter);
app.use("/api/room", roomRouter);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
