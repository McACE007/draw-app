import { prisma } from "@repo/db";
import { Request, Response } from "express";
import z from "zod";
import { SignUpRequest } from "@repo/common/types";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/constants";
import { uuid } from "zod/v4";

export const signup = async (req: Request, res: Response): Promise<any> => {
  try {
    const parsedBody = SignUpRequest.safeParse(req.body);

    if (parsedBody.error) throw new Error("Invaild format");

    const newUser = await prisma.user.create({
      data: {
        email: parsedBody.data.username,
        password: parsedBody.data.password,
      },
    });

    return res.status(201).json(newUser);
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e);
      return res.status(500).json({ message: "User not created" });
    }
  }
};

export const signin = async (req: Request, res: Response): Promise<any> => {
  try {
    const parsedBody = SignUpRequest.safeParse(req.body);

    if (parsedBody.error) throw new Error("Invaild format");

    const user = await prisma.user.findUnique({
      where: {
        email: parsedBody.data.username,
        password: parsedBody.data.password,
      },
    });

    if (user === null) throw new Error("Invaild username or password");

    const token = jwt.sign({ id: user.id }, JWT_SECRET);

    return res.send(token);
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

    if (!userId) throw new Error("Something something");

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
