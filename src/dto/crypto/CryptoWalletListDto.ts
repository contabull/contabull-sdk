import { z } from 'zod';
import { CryptoNetwork, CryptoSymbol } from '../../types';

export const WalletListOutputDto = z.object({
  walletId: z.string(),
  active: z.boolean(),
  name: z.string(),
  address: z.string(),
  symbol: z.nativeEnum(CryptoSymbol),
  network: z.nativeEnum(CryptoNetwork),
  createdAt: z.date(),
});

export type WalletListOutputDto = z.infer<typeof WalletListOutputDto>;