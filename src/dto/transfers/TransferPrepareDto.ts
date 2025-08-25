import { z } from 'zod';
import { TransferMethod, BeneficiaryAccountType } from '../../types';

const baseSchema = z.object({
  accountId: z.string().nonempty('Account Id is required'),
});

const beneficiarySchema = z.object({
  beneficiaryAccountType: z.nativeEnum(BeneficiaryAccountType).optional(),
  beneficiaryAccountNumber: z.string().optional(),
  beneficiaryDocument: z.string().optional(),
  beneficiaryAgency: z.string().optional(),
  beneficiaryName: z.string().optional(),
  beneficiaryId: z.string().optional(),
  beneficiaryBankId: z.string().optional(),
});

export const TransferPrepareBaseSchema = baseSchema.merge(
  z.object({
    method: z.nativeEnum(TransferMethod),
  }),
);

export const TransferPreparePixKeySchema = baseSchema.extend({
  method: z.literal(TransferMethod.PIX_KEY),
  pixKey: z.string().nonempty('Pix Key is required'),
});

export const TransferPreparePixEmvSchema = baseSchema.extend({
  method: z.literal(TransferMethod.PIX_EMV),
  emv: z.string().nonempty('Pix EMV is required'),
});

export const TransferPreparePixAccountSchema = baseSchema.merge(beneficiarySchema).extend({ method: z.literal(TransferMethod.PIX_ACCOUNT) });

export const TransferPrepareSameBankSchema = baseSchema
  .merge(beneficiarySchema.omit({ beneficiaryAccountType: true, beneficiaryAgency: true }))
  .extend({
    method: z.literal(TransferMethod.SAME_BANK),
  });

export const TransferPrepareTedSchema = baseSchema.merge(beneficiarySchema).extend({ method: z.literal(TransferMethod.TED) });

export const TransferPrepareSameCompanySchema = baseSchema.extend({
  method: z.literal(TransferMethod.SAME_COMPANY),
  destinationAccountId: z.string().nonempty('Destination Account Id is required'),
});

export const TransferPrepareSchemas = {
  [TransferMethod.PIX_KEY]: TransferPreparePixKeySchema,
  [TransferMethod.PIX_EMV]: TransferPreparePixEmvSchema,
  [TransferMethod.PIX_ACCOUNT]: TransferPreparePixAccountSchema,
  [TransferMethod.SAME_BANK]: TransferPrepareSameBankSchema,
  [TransferMethod.TED]: TransferPrepareTedSchema,
  [TransferMethod.SAME_COMPANY]: TransferPrepareSameCompanySchema,
};

export const TransferPrepareResponseSchema = z.object({
  transferId: z.string(),
  beneficiaryDocument: z.string(),
  bankName: z.string(),
});

export const TransferSameBankRefinedSchema = TransferPrepareSameBankSchema.refine(
  (data) =>
    (data.beneficiaryId && data.beneficiaryId !== '') ||
    (data.beneficiaryName &&
      data.beneficiaryName !== '' &&
      data.beneficiaryAccountNumber &&
      data.beneficiaryAccountNumber !== '' &&
      data.beneficiaryDocument &&
      data.beneficiaryDocument !== '' &&
      data.beneficiaryBankId &&
      data.beneficiaryBankId !== ''),
  {
    message: 'Beneficiary is required by either ID or all fields',
    path: ['beneficiaryId', 'beneficiaryName', 'beneficiaryAccountNumber', 'beneficiaryDocument', 'beneficiaryBankId'],
  },
);

export const TransferPreparePixAccountRefinedSchema = TransferPreparePixAccountSchema.refine(
  (data) =>
    (data.beneficiaryId && data.beneficiaryId !== '') ||
    (data.beneficiaryName &&
      data.beneficiaryName !== '' &&
      data.beneficiaryAccountNumber &&
      data.beneficiaryAccountNumber !== '' &&
      data.beneficiaryDocument &&
      data.beneficiaryDocument !== '' &&
      data.beneficiaryBankId &&
      data.beneficiaryBankId !== '' &&
      data.beneficiaryAccountType &&
      data.beneficiaryAgency &&
      data.beneficiaryAgency !== ''),
  {
    message: 'Beneficiary is required by either ID or all fields',
    path: [
      'beneficiaryId',
      'beneficiaryName',
      'beneficiaryAccountNumber',
      'beneficiaryDocument',
      'beneficiaryBankId',
      'beneficiaryAccountType',
      'beneficiaryAgency',
    ],
  },
);

export const TransferPrepareTedRefinedSchema = TransferPrepareTedSchema.refine(
  (data) =>
    (data.beneficiaryId && data.beneficiaryId !== '') ||
    (data.beneficiaryName &&
      data.beneficiaryName !== '' &&
      data.beneficiaryAccountNumber &&
      data.beneficiaryAccountNumber !== '' &&
      data.beneficiaryDocument &&
      data.beneficiaryDocument !== '' &&
      data.beneficiaryBankId &&
      data.beneficiaryBankId !== '' &&
      data.beneficiaryAccountType &&
      data.beneficiaryAgency &&
      data.beneficiaryAgency !== ''),
  {
    message: 'Beneficiary is required by either ID or all fields',
    path: [
      'beneficiaryId',
      'beneficiaryName',
      'beneficiaryAccountNumber',
      'beneficiaryDocument',
      'beneficiaryBankId',
      'beneficiaryAccountType',
      'beneficiaryAgency',
    ],
  },
);

export type InternalTransferPrepareDto = {
  bypassOtp?: boolean;
  noFee?: boolean;
  bypassLimits?: boolean;
};

export type TransferPrepareBaseDto = z.infer<typeof TransferPrepareBaseSchema>;
export type TransferPreparePixKeyDto = z.infer<typeof TransferPreparePixKeySchema>;
export type TransferPreparePixEmvDto = z.infer<typeof TransferPreparePixEmvSchema>;
export type TransferPreparePixAccountDto = z.infer<typeof TransferPreparePixAccountSchema>;
export type TransferPrepareTedDto = z.infer<typeof TransferPrepareTedSchema>;
export type TransferPrepareSameBankDto = z.infer<typeof TransferPrepareSameBankSchema>;
export type TransferPrepareSameCompanyDto = z.infer<typeof TransferPrepareSameCompanySchema>;
export type TransferPrepareResponseDto = z.infer<typeof TransferPrepareResponseSchema>;

export type TransferPrepareDto =
  | TransferPrepareBaseDto
  | TransferPreparePixKeyDto
  | TransferPreparePixEmvDto
  | TransferPreparePixAccountDto
  | TransferPrepareTedDto
  | TransferPrepareSameBankDto
  | TransferPrepareSameCompanyDto;

// export { TransferMethod };

