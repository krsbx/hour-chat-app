import { z } from 'zod';

export const messageSchema = z
  .object({
    body: z.string().optional(),
    files: z
      .array(
        z.object({
          uri: z.string().url(),
          name: z.string(),
          type: z.string().optional().nullable(),
        })
      )
      .optional(),
  })
  .superRefine((values, ctx) => {
    if (!values.body && !values.files?.length) {
      ctx.addIssue({
        code: 'custom',
        path: ['body', 'file'],
        message: 'Body or File are required',
      });
    }
  });
