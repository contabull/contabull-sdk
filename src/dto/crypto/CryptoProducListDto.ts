import { z } from 'zod';
import { CryptoNetwork, CryptoOtcSettlementSchedule, CryptoSymbol } from '../../types';

export const ProductListOutputDto = z.object({
  symbol: z.nativeEnum(CryptoSymbol),
  settlement: z.nativeEnum(CryptoOtcSettlementSchedule),
  supportedNetworks: z.array(z.nativeEnum(CryptoNetwork)),
});

export type ProductListOutputDto = z.infer<typeof ProductListOutputDto>;
