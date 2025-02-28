import type { AxiosInstance } from "axios";
import { z } from 'zod';
import { Currency } from '../types';
import { validateOrThrow } from '../utils/validate-or-throw';
import { BaseResource } from "./base-resource";

export const ChargeCreateSchemaDto = z
  .object({
    account: z.string(),
    amount: z.number().positive(),
    currency: z.nativeEnum(Currency),
    externalId: z.string().optional(),
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
