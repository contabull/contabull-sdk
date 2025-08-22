import { z } from "zod";
import { ChargeStatus } from "../../types";

export const ChargeGetResponseSchema = z.object({
  status: z.nativeEnum(ChargeStatus),
  boleto: z
    .object({
      barCode: z.string(),
      status: z.nativeEnum(ChargeStatus),
    })
    .optional(),
  pix: z
    .object({
      emv: z.string(),
      status: z.nativeEnum(ChargeStatus),
    })
    .optional(),
});

export type ChargeGetResponseDto = z.infer<typeof ChargeGetResponseSchema>;