import { JWT_SECRET } from "@repo/backend-common/constants";
import jwt, { JwtPayload } from "jsonwebtoken";

export type JwtPayloadWithId = {
  id: string;
} & JwtPayload;

export function verifyToken(rawToken?: string): string | null {
  if (!rawToken) return null;

  const token = rawToken.startsWith("Bearer ") ? rawToken.slice(7) : rawToken;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayloadWithId;
    return decoded.id ?? null;
  } catch (e) {
    return null;
  }
}
