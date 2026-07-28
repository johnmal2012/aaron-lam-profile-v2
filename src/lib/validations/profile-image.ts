import { z } from "zod";

export const profileImageSchema =
  z.object({
    image: z.url(),
  });