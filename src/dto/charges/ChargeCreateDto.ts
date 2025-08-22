import { z } from "zod";
import { ChargeStatus, Currency } from "../../types";

export const ChargeCreateCustomerAddressSchema = z.object({
  street: z.string(),
  number: z.string(),
  postalCode: z.string(),
  complement: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string(),
  countryCode: z.string(),
  state: z.string().optional(),
});

export const ChargeCreateCustomerSchema = z.object({
  name: z.string(),
  document: z.string(),
  type: z.enum(["individual", "company"]),
  address: ChargeCreateCustomerAddressSchema.optional()
});

export const ChargeCreateSchema = z.object({
  accountId: z.string(),
  amountCents: z.number().positive(),
  currency: z.nativeEnum(Currency),
  externalId: z.string().optional(),
  sourceKey: z.string().optional(),
  methods: z.array(z.enum(["boleto", "pix"])),
  customer: ChargeCreateCustomerSchema,
  taxes: z
    .object({
      fine: z.number().optional(),
      interest: z.number().optional(),
    })
    .optional(),
  dueAt: z.string().optional(),
  expiredAt: z.string().optional(),
});

export const ChargeCreateResponseSchema = z.object({
  id: z.string(),
  boleto: z
    .object({
      success: z.boolean(),
      status: z.nativeEnum(ChargeStatus),
    })
    .optional(),
  pix: z
    .object({
      success: z.boolean(),
      emv: z.string(),
      status: z.nativeEnum(ChargeStatus),
    })
    .optional(),
});

export type ChargeCreateDto = z.infer<typeof ChargeCreateSchema>;
export type ChargeCreateResponseDto = z.infer<
  typeof ChargeCreateResponseSchema
>;
