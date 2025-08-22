import { z } from 'zod';
import { CryptoOtcSettlementSchedule, CryptoSymbol } from '../../types';

export const QuoteDto = z.object({
  symbol: z.nativeEnum(CryptoSymbol),
  settlement: z.nativeEnum(CryptoOtcSettlementSchedule),
});
export type QuoteDto = z.infer<typeof QuoteDto>;

// output dto
export const QuoteOutputDto = z.object({
  quoteId: z.string(),
  symbol: z.nativeEnum(CryptoSymbol),
  settlement: z.nativeEnum(CryptoOtcSettlementSchedule),
  price: z.number(),
  expireAtUnix: z.number(),
});
export type QuoteOutputDto = z.infer<typeof QuoteOutputDto>;
