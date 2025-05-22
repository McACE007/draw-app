import express from "express";
import authRouter from "./routers/authRoutes";
import roomRouter from "./routers/roomRoutes";

const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/room", roomRouter);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
