import { prisma } from "@repo/db";
import { Request, Response } from "express";
import { v4 } from "uuid";

export const createRoom = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.userId;

    if (!userId) throw new Error("Something something");

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    const roomId = v4();
    console.log(roomId);
    return res.json(roomId);
  } catch (e) {
    if (e instanceof Error) {
      console.log(e);
      return res.send(e);
    }
  }
};
