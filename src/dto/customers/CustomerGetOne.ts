import { z } from "zod";
import { CustomerType } from "../../types";

export const CustomerSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  document: z.string(),
  type: z.nativeEnum(CustomerType),
  isBeneficiary: z.boolean(),
  addressStreet: z.string(),
  addressNumber: z.string(),
  addressNeighborhood: z.string(),
  addressCity: z.string(),
  addressState: z.string(),
  addressPostalCode: z.string(),
  addressCountryCode: z.string(),
  createdAt: z.string(),
});

export const CustomerGetOneResponseSchema = z.object({
  customer: CustomerSchema
});

export type CustomerGetOneResponseDto = z.infer<typeof CustomerGetOneResponseSchema>;
