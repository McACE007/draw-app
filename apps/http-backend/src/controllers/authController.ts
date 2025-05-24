import { Prisma, prisma } from "@repo/db";
import { Request, Response } from "express";
import { CreateUserRequest, LoginUserRequest } from "@repo/common/types";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/constants";

export const signup = async (req: Request, res: Response): Promise<any> => {
  try {
    const parsedBody = CreateUserRequest.safeParse(req.body);

    if (!parsedBody.success) throw new Error("Invaild format");

    const newUser = await prisma.user.create({
      data: {
        email: parsedBody.data.username,
        password: parsedBody.data.password,
      },
    });
    return res.status(201).json({ userId: newUser.id });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        console.log(e);
        return res.status(411).json({ message: "User already exists" });
      }
    } else if (e instanceof Error) {
      console.log(e);
      return res.status(500).json({ message: "User not created" });
    }
  }
};

export const signin = async (req: Request, res: Response): Promise<any> => {
  try {
    const parsedBody = LoginUserRequest.safeParse(req.body);

    if (!parsedBody.success) throw new Error("Invaild input format");

    const user = await prisma.user.findUnique({
      where: {
        email: parsedBody.data.username,
        password: parsedBody.data.password,
      },
    });

    if (user === null) throw new Error("Invaild username or password");

    const token = jwt.sign({ id: user.id }, JWT_SECRET);

    return res.send({ token });
  } catch (e) {
    if (e instanceof Error) {
      console.log(e);
      return res.status(500).json({ error: e.message });
    }
  }
};

export const me = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.userId;

    if (!userId) throw new Error("Invaild token");

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return res.json(user);
  } catch (e) {
    if (e instanceof Error) {
      console.log(e);
      return res.send(e);
    }
  }
};
