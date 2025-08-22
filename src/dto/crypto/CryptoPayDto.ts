import { z } from 'zod';

export const PayDto = z.object({
  accountId: z.string(),
  amount: z.number().positive(),
});

export type PayDto = z.infer<typeof PayDto>;

// output
export const PayOutputDto = z.object({
  txId: z.string(),
});

export type PayOutputDto = z.infer<typeof PayOutputDto>;