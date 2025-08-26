import { z } from 'zod';
import { CryptoNetwork, CryptoOtcTransactionStatus, CryptoSymbol, Currency } from '../../types';

export const TransactionsListDto = z.object({
  symbol: z.nativeEnum(CryptoSymbol).optional(),
  status: z.nativeEnum(CryptoOtcTransactionStatus).optional(),
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
  page: z.coerce.number().positive().default(1),
});

export type TransactionsListDto = z.infer<typeof TransactionsListDto>;

// output
export const TransactionsListOutput = z.object({
  transactions: z.array(
    z.object({
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
      settlementDate: z.date().nullable(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }),
  ),
  total: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
  hasMore: z.boolean(),
});

export type TransactionsListOutput = z.infer<typeof TransactionsListOutput>;
