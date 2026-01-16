import { z } from "zod";

export const CreateUserRequest = z.object({
  username: z.string().email("Must a be a valid email"),
  password: z.string().min(1, "Must be atleast one Character"),
});

export type CreateUserFormType = z.infer<typeof CreateUserRequest>;

export const LoginUserRequest = z.object({
  username: z.string().email("Must a be a valid email"),
  password: z.string().min(1, "Must be atleast one Character"),
});

export type LoginUserFormType = z.infer<typeof LoginUserRequest>;

export const CreateRoomRequest = z.object({
  name: z.string().min(5).max(30),
});

export type CreateRoomFormType = z.infer<typeof CreateRoomRequest>;
