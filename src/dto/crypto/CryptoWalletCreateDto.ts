import { z } from 'zod';
import { CryptoNetwork, CryptoSymbol } from '../../types';
import * as walletValidator from 'multicoin-address-validator';

export const WalletCreateDto = z
  .object({
    name: z.string(),
    symbol: z.nativeEnum(CryptoSymbol),
    network: z.nativeEnum(CryptoNetwork),
    address: z.string(),
  })
  .refine(
    (data) => {
      let network = data.network;

      if (network === CryptoNetwork.binance) network = CryptoNetwork.ethereum;
      if (network === CryptoNetwork.polygon) network = CryptoNetwork.ethereum;

      return walletValidator.validate(data.address, network);
    },
    {
      message: 'Invalid wallet address for the specified network',
      path: ['address'], // Points the error to the address field
    },
  );

export type WalletCreateDto = z.infer<typeof WalletCreateDto>;

// output
export const WalletCreateOutputDto = z.object({
  id: z.string(),
  name: z.string(),
  symbol: z.nativeEnum(CryptoSymbol),
  network: z.nativeEnum(CryptoNetwork),
  address: z.string(),
});

export type WalletCreateOutputDto = z.infer<typeof WalletCreateOutputDto>;
