import { z } from 'zod';
import { Currency } from '../../types';

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
  cpfCnpj: z.string(),
  type: z.enum(['individual', 'company']),
  address: ChargeCreateCustomerAddressSchema.optional(),
});

export const ChargeCreateSchema = z.object({
  account: z.string(),
  document: z.string().optional(),
  amount: z.number().positive(),
  currency: z.nativeEnum(Currency),
  method: z.enum(['boleto']),
  externalId: z.string().optional(),
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
  success: z.boolean(),
});

export type ChargeCreateDto = z.infer<typeof ChargeCreateSchema>;
export type ChargeCreateResponseDto = z.infer<typeof ChargeCreateResponseSchema>;