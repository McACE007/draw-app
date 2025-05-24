import { z } from "zod";

export const CreateUserRequest = z.object({
  username: z.string().email(),
  password: z.string(),
});

export const LoginUserRequest = z.object({
  username: z.string().email(),
  password: z.string(),
});

export const CreateRoomRequest = z.object({
  name: z.string(),
});
