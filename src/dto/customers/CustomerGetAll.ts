import { z } from "zod";

export enum CustomerType {
  COMPANY,
  INDIVIDUAL,
}

export const CustomerGetAllSchema = z.object({
  type: z.nativeEnum(CustomerType).optional(),
  isBeneficiary: z.boolean().optional(),
  query: z.string().optional(),
  page: z.coerce.number(),
});

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

export const CustomerGetAllResponseSchema = z.object({
  customers: z.array(CustomerSchema),
  total: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
  hasMore: z.boolean(),
});

export type CustomerGetAllDto = z.infer<typeof CustomerGetAllSchema>;
export type CustomerGetAllResponseDto = z.infer<
  typeof CustomerGetAllResponseSchema
>;
