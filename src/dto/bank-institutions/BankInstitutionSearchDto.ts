import { z } from 'zod';

export const BankInstitutionSearchSchema = z.object({
  query: z.string().optional(),
  page: z.coerce.number(),
  totalPerPage: z.coerce.number().optional().default(50),
});

export type BankInstitutionSearchDto = z.infer<typeof BankInstitutionSearchSchema>;