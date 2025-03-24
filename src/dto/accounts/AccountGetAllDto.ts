import { z } from "zod";

export const AccountGetAllResponseSchema = z.object({
  label: z.string(),
  balance: z.object({
    availableBalanceCents: z.number(),
    pendingBalanceCents: z.number(),
  }),
  number: z.string(),
  bankProvider: z.string(),
});

export type AccountGetAllResponseDto = z.infer<
  typeof AccountGetAllResponseSchema
>;
