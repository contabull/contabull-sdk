import { z } from 'zod';
import { CryptoNetwork, CryptoOtcSettlementSchedule, CryptoSymbol } from '../../types';

export const ExecuteDto = z
  .object({
    quoteId: z.string(),
    cost: z.number().optional(),
    quantity: z.number().optional(),
    accountId: z.string(),
    walletId: z.string(),
  })
  .refine((data) => !(data.cost !== undefined && data.quantity !== undefined), {
    message: "Cannot specify both 'cost' and 'value' together",
    path: ['cost', 'value'],
  })
  .refine((data) => data.cost !== undefined || data.quantity !== undefined, {
    message: "At least one of 'cost' or 'value' is required",
    path: ['cost', 'value'],
  });

export type ExecuteDto = z.infer<typeof ExecuteDto>;

// output

export const ExecuteOutputDto = z.object({
  cryptoTransactionId: z.string(),
  quantity: z.number(),
  cost: z.number(),
  price: z.number(),
  network: z.nativeEnum(CryptoNetwork),
  symbol: z.nativeEnum(CryptoSymbol),
  currency: z.string(),
  walletId: z.string(),
  walletAddress: z.string(),
  walletName: z.string(),
  settlementSchedule: z.nativeEnum(CryptoOtcSettlementSchedule).nullable(),
  settlementDate: z.date().nullable(),
});

export type ExecuteOutputDto = z.infer<typeof ExecuteOutputDto>;