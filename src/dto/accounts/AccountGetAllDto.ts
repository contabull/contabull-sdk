import { z } from "zod";

export const AccountGetAllResponseSchema = z.object({
  id: z.string(),
  label: z.string(),
  balance: z.object({
    availableBalanceCents: z.number(),
    pendingBalanceCents: z.number(),
  }),
  number: z.string(),
  bankProvider: z.string(),
  ispb: z.string(),
  agency: z.string(),
});

export type AccountGetAllResponseDto = z.infer<
  typeof AccountGetAllResponseSchema
>;
