import { z } from "zod";

export const AccountGetAllResponseSchema = z.object({
  label: z.string(),
  kind: z.string(),
  balance: z.object({
    availableBalance: z.number(),
    pendingBalance: z.number(),
  }),
  bankProvider: z.string(),
  digit: z.string(),
  agency: z.string(),
  ispb: z.string(),
});

export type AccountGetAllResponseDto = z.infer<
  typeof AccountGetAllResponseSchema
>;
