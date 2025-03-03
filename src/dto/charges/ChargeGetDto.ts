import { z } from 'zod';
import { ChargeStatus } from "../../types";
  
export const ChargeGetResponseSchema = z.object({
  status: z.nativeEnum(ChargeStatus),
  boleto: z.object({
      barCode: z.string(),
  }).optional(),
});
  
export type ChargeGetResponseDto = z.infer<typeof ChargeGetResponseSchema>;