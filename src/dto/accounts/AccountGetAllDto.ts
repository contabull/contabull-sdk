import { z } from "zod";

export const AccountGetAllResponseSchema = z.object({
  id: z.string(),
  label: z
  .string()
  .nullable()
  .transform((val) => val ?? ""),
  balance: z.object({
    availableBalanceCents: z.number(),
    pendingBalanceCents: z.number(),
  }),
  number: z.string(),
  bankProvider: z.string(),
  ispb: z
  .string()
  .nullable()
  .transform((val) => val ?? ""),
  agency: z
  .string()
  .nullable()
  .transform((val) => val ?? ""),
});

export type AccountGetAllItemOutputDto = z.infer<typeof AccountGetAllResponseSchema>;

export const AccountGetAllOutputSchema = z.array(AccountGetAllResponseSchema);

export type AccountGetAllOutputDto = z.infer<typeof AccountGetAllOutputSchema>;