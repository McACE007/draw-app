import { z } from "zod";

export const SignUpRequest = z.object({
  username: z.string().email(),
  password: z.string(),
});
