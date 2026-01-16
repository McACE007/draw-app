import { CreateRoomRequest } from "@repo/common/types";
import { Prisma, prisma } from "@repo/db";
import { Request, Response } from "express";

export const createRoom = async (req: Request, res: Response): Promise<any> => {
  try {
    const parsedBody = CreateRoomRequest.safeParse(req.body);
    if (!parsedBody.success) throw new Error("Invaild input format");

    const userId = req.userId;
    if (!userId) throw new Error("Invaild token");

    const newRoom = await prisma.room.create({
      data: {
        slug: parsedBody.data.name,
        adminId: userId,
      },
    });

    return res.json({ roomId: newRoom.id });
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

export const getRoomIdBySlug = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const slug = req.params.slug;

    if (!slug) throw new Error("Invaild input format");

    const room = await prisma.room.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
      },
    });

    return res.json({ roomId: room?.id });
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
