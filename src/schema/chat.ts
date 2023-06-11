import { z } from 'zod';

export const messageSchema = z.object({
  body: z.string().min(3),
});
