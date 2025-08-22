import { z } from 'zod';
import { BankCodeSchema } from './BankInsitutionGetAllDto';

export const BankInstitutionSearchSchema = z.object({
  query: z.string().optional(),
  page: z.coerce.number(),
  totalPerPage: z.coerce.number().optional().default(50),
});

export const BankInstitutionSearchResponseSchema = z.object({
  bankInstitutions: z.array(BankCodeSchema),
  total: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
  hasMore: z.boolean(),
});

export type BankInstitutionSearchDto = z.infer<typeof BankInstitutionSearchSchema>;
export type BankInstitutionSearchResponseDto = z.infer<typeof BankInstitutionSearchResponseSchema>;