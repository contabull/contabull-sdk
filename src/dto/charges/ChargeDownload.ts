import { z } from 'zod';
import { AvailableLanguages } from '../../types';

export const ChargeDownloadSchema = z.object({
  id: z.string(),
  language: z.nativeEnum(AvailableLanguages).optional().default(AvailableLanguages.pt),
});

export type ChargeDownloadDto = z.infer<typeof ChargeDownloadSchema>;