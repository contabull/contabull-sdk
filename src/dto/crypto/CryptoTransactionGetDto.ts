import { z } from 'zod';
import { CryptoNetwork, CryptoOtcSettlementSchedule, CryptoOtcTransactionStatus, CryptoSymbol, Currency } from '../../types';

// output
const DebtSchema = z.object({
  initial: z.number(),
  remaining: z.number(),
});

const FillSchema = z.object({
  id: z.string(),
  amount: z.number(),
  hash: z.string(),
  filledAt: z.date().nullable(),
});

export const TransactionGetOutputDtoSchema = z.object({
  transactionId: z.string(),
  status: z.nativeEnum(CryptoOtcTransactionStatus),
  quantity: z.number(),
  cost: z.number(),
  price: z.number(),
  network: z.nativeEnum(CryptoNetwork),
  symbol: z.nativeEnum(CryptoSymbol),
  currency: z.nativeEnum(Currency),
  walletId: z.string(),
  walletAddress: z.string(),
  walletName: z.string(),
  settlementSchedule: z.nativeEnum(CryptoOtcSettlementSchedule).nullable(),
  settlementDate: z.date().nullable(),
  debt: DebtSchema,
  fills: z.array(FillSchema),
  createdAt: z.date(),
});

export type TransactionGetOutputDto = z.infer<typeof TransactionGetOutputDtoSchema>;
