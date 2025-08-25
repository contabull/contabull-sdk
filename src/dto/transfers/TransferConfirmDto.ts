import { z } from 'zod';

export const TransferConfirmSchema = z.object({
  transferId: z.string().nonempty('Transfer Id is required'),
  amountCent: z.number().min(1, 'Amount in cents is required'),
  accountId: z.string().nonempty('Account Id is required'),
  reference: z.string().optional(),
});

export type TransferConfirmDto = z.infer<typeof TransferConfirmSchema>;