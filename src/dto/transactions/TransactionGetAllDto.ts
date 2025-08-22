import { z } from "zod";
import { PaymentStatus, TransactionType } from "../../types";

export const TransactionGetAllSchema = z.object({
  customerId: z.string().optional(),
  accountId: z.string().optional(),
  type: z.enum([TransactionType.inbound, TransactionType.outbound, "all"]).optional().default("all"),
  query: z.string().optional(),
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
  page: z.coerce.number().optional().default(1),
  status: z.enum([
    PaymentStatus.succeeded,
    PaymentStatus.incomplete,
    PaymentStatus.failed,
    PaymentStatus.refunded,
    PaymentStatus.created,
    "all",
  ]).optional().default("all"),
});

export const CustomerSchema = z.object({
  id: z.string(),
  name: z.string().nullable().transform((val) => val ?? ""),
  email: z.string().nullable().transform((val) => val ?? ""),
  cpfCnpj: z.string().nullable().transform((val) => val ?? ""),
});
export type Customer = z.infer<typeof CustomerSchema>;

export const TransactionSchema = z.object({
  id: z.string(),
  amountCents: z.number(),
  account: z.string(),
  customer: CustomerSchema,
  payerName: z.string().nullable().transform((val) => val ?? ""),
  payerCpfCnpj: z.string().nullable().transform((val) => val ?? ""),
  description: z.string(),
  e2eID: z.string(),
  status: z.string(),
  method: z.string(),
  type: z.string(),
  currency: z.string(),
  fees: z.number(),
  disputed: z.boolean(),
  pixKey: z.string().optional().nullable().transform((val) => val ?? ""),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  completedAt: z.coerce.date().nullable(),
});
export type Transaction = z.infer<typeof TransactionSchema>;

export const TransactionGetAllResponseSchema = z.object({
  transactions: z.array(TransactionSchema),
  total: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
  hasMore: z.boolean(),
});

export type TransactionGetAllDto = z.infer<typeof TransactionGetAllSchema>;
export type TransactionGetAllResponseDto = z.infer<typeof TransactionGetAllResponseSchema>;
