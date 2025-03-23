import { z } from "zod";
import { Currency, PaymentStatus, TransactionType } from "../../types";

export const TransactionGetAllSchema = z.object({
  customerId: z.string().optional(),
  accountId: z.string().optional(),
  type: z.enum([TransactionType.inbound, TransactionType.outbound, "all"]),
  query: z.string().optional(),
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
  page: z.coerce.number(),
  status: z.enum([
    PaymentStatus.succeeded,
    PaymentStatus.incomplete,
    PaymentStatus.failed,
    PaymentStatus.refunded,
    PaymentStatus.created,
    "all",
  ]),
});

export const TransactionCustomerSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  cpfCnpj: z.string(),
});

export const TransactionSchema = z.object({
  id: z.string(),
  amount: z.number(),
  customer: TransactionCustomerSchema,
  payerName: z.string(),
  payerCpfCnpj: z.string(),
  description: z.string(),
  e2eID: z.string(),
  status: z.nativeEnum(PaymentStatus),
  method: z.string(),
  type: z.nativeEnum(TransactionType),
  currency: z.nativeEnum(Currency),
  bankAccountId: z.string(),
  fees: z.number(),
  disputed: z.boolean(),
});

export const TransactionGetAllResponseSchema = z.object({
  transactions: z.array(TransactionSchema),
  total: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
});

export type TransactionGetAllDto = z.infer<typeof TransactionGetAllSchema>;
export type TransactionGetAllResponseDto = z.infer<
  typeof TransactionGetAllResponseSchema
>;
