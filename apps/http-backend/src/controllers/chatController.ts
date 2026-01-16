import { Prisma, prisma } from "@repo/db";
import { Request, Response } from "express";

export const getAllChatsByRoomId = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const roomId = req.params.roomId;
    if (!roomId) throw new Error("Got no roomId to fetch data for");

    const chats = await prisma.chat.findMany({
      where: {
        roomId,
      },
      take: 50,
      orderBy: {
        id: "desc",
      },
    });

    if (!chats) throw new Error("Invalid roomId");
    return res.json({ chats });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        console.log(e);
        return res
          .status(411)
          .json({ message: "Room with that name already exists" });
      }
    } else if (e instanceof Error) {
      console.log(e);
      return res.send(e);
    }
  }
};
