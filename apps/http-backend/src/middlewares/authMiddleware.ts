import { JWT_SECRET } from "@repo/backend-common/constants";
import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(401).json({ message: "No token, authentication denied" });
    return;
  }

  try {
    const token = authHeader?.split(" ").at(1) || "";
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
    };

    req.userId = decoded.id;

    next();
  } catch (e) {
    res.status(401).json({ message: "Not authorized, token failed" });
    return;
  }
};
