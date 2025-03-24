import { z } from "zod";
import { ChargeStatus } from "../../types";

export const ChargeGetAllSchema = z.object({
  account: z.string(),
  status: z.enum(["ALL", ...Object.values(ChargeStatus)]).optional(),
  query: z.string().optional(),
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
  page: z.coerce.number(),
});

export const ChargeSchema = z.object({
  id: z.string(),
  externalId: z.string(),
  customer: z.object({
    name: z.string(),
  }),
  transactionId: z.string(),
  paymentMethods: z.array(z.string()),
  amountCents: z.number(),
  taxFine: z.number(),
  taxInterest: z.number(),
  status: z.nativeEnum(ChargeStatus),
  dueAt: z.coerce.date(),
  expiredAt: z.coerce.date(),
  createdAt: z.coerce.date(),
});

export const ChargeGetAllResponseSchema = z.object({
  charges: z.array(ChargeSchema),
  total: z.number(),
  page: z.number(),
  totalPages: z.number(),
});

export type ChargeGetAllDto = z.infer<typeof ChargeGetAllSchema>;
export type ChargeGetAllResponseDto = z.infer<
  typeof ChargeGetAllResponseSchema
>;
