import { z } from "zod";

export const BankCodeSchema = z.object({
  id: z.string(),
  name: z.string(),
  ispb: z.string(),
  compe: z.string().nullable(),
  indexationNumber: z.bigint(),
});

export const BankInstitutionGetAllSchema = z.object({
  query: z.string().optional(),
  page: z.coerce.number(),
  totalPerPage: z.coerce.number().optional().default(50),
});

export const BankInstitutionGetAllResponseSchema = z.object({
  bankInstitutions: z.array(BankCodeSchema),
  total: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
  hasMore: z.boolean(),
});

export type BankCode = z.infer<typeof BankCodeSchema>;
export type BankInstitutionGetAllDto = z.infer<typeof BankInstitutionGetAllSchema>;
export type BankInstitutionGetAllResponseDto = z.infer<typeof BankInstitutionGetAllResponseSchema>;