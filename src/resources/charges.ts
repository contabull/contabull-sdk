import type { AxiosInstance } from "axios";
import { z } from 'zod';
import { Currency } from '../types';
import { validateOrThrow } from '../utils/validate-or-throw';
import { BaseResource } from "./base-resource";

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

export const ChargeCreateSchemaDto = z.object({
  account: z.string(),
  document: z.string().optional(),
  amount: z.number().positive(),
  currency: z.nativeEnum(Currency),
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

export type ChargeCreateDto = z.infer<typeof ChargeCreateSchemaDto>;

interface CreateChargeReturn {
  message: string,
}

export class Charges extends BaseResource {
  constructor(client: AxiosInstance) {
    super(client, "/charges")
  }

  /**
   * Create a new charge
   */
  async create(data: ChargeCreateDto): Promise<CreateChargeReturn> {
    await validateOrThrow(ChargeCreateSchemaDto, data);

    return this.post<CreateChargeReturn>('/create', data);
  }
}
