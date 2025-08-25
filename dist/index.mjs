// src/sdk.ts
import axios from "axios";
import SHA256 from "crypto-js/sha256";
import jwt from "jsonwebtoken";

// src/resources/base-resource.ts
var BaseResource = class {
  constructor(client, basePath) {
    this.client = client;
    this.basePath = basePath;
  }
  async get(path, config) {
    const response = await this.client.get(`${this.basePath}${path}`, config);
    return response.data;
  }
  async post(path, data) {
    const response = await this.client.post(`${this.basePath}${path}`, data);
    return response.data;
  }
  async put(path, data) {
    const response = await this.client.put(`${this.basePath}${path}`, data);
    return response.data;
  }
  async patch(path, data) {
    const response = await this.client.patch(`${this.basePath}${path}`, data);
    return response.data;
  }
  async delete(path) {
    const response = await this.client.delete(`${this.basePath}${path}`);
    return response.data;
  }
};

// src/resources/accounts.ts
var Accounts = class extends BaseResource {
  constructor(client) {
    super(client, "/accounts");
  }
  /**
   * Get all accounts
   */
  async getAll() {
    return this.get("");
  }
};

// src/resources/authorization.ts
var Authorization = class extends BaseResource {
  constructor(client) {
    super(client, "/auth");
  }
  /**
   * Try API Authorization
   */
  async try() {
    return this.get("/try");
  }
};

// src/dto/charges/ChargeCreateDto.ts
import { z } from "zod";

// src/types.ts
var Currency = /* @__PURE__ */ ((Currency2) => {
  Currency2["BRL"] = "BRL";
  Currency2["USD"] = "USD";
  Currency2["EUR"] = "EUR";
  return Currency2;
})(Currency || {});
var ChargeStatus = /* @__PURE__ */ ((ChargeStatus2) => {
  ChargeStatus2["CREATED"] = "CREATED";
  ChargeStatus2["CREATED_WAITING"] = "CREATED_WAITING";
  ChargeStatus2["PAID"] = "PAID";
  ChargeStatus2["CANCELLED"] = "CANCELLED";
  return ChargeStatus2;
})(ChargeStatus || {});
var PaymentStatus = /* @__PURE__ */ ((PaymentStatus2) => {
  PaymentStatus2["created"] = "created";
  PaymentStatus2["emv_generated"] = "emv_generated";
  PaymentStatus2["payer_viewed"] = "payer_viewed";
  PaymentStatus2["succeeded"] = "succeeded";
  PaymentStatus2["failed"] = "failed";
  PaymentStatus2["disputed"] = "disputed";
  PaymentStatus2["processing_refund"] = "processing_refund";
  PaymentStatus2["processing"] = "processing";
  PaymentStatus2["refunded"] = "refunded";
  PaymentStatus2["incomplete"] = "incomplete";
  PaymentStatus2["refund_failed"] = "refund_failed";
  PaymentStatus2["cancelled"] = "cancelled";
  return PaymentStatus2;
})(PaymentStatus || {});
var TransactionType = /* @__PURE__ */ ((TransactionType2) => {
  TransactionType2["inbound"] = "inbound";
  TransactionType2["outbound"] = "outbound";
  TransactionType2["refund"] = "refund";
  return TransactionType2;
})(TransactionType || {});
var AvailableLanguages = /* @__PURE__ */ ((AvailableLanguages2) => {
  AvailableLanguages2["en"] = "en";
  AvailableLanguages2["pt"] = "pt";
  AvailableLanguages2["zh"] = "zh";
  return AvailableLanguages2;
})(AvailableLanguages || {});
var CustomerType = /* @__PURE__ */ ((CustomerType2) => {
  CustomerType2["COMPANY"] = "COMPANY";
  CustomerType2["INDIVIDUAL"] = "INDIVIDUAL";
  return CustomerType2;
})(CustomerType || {});
var CryptoNetwork = /* @__PURE__ */ ((CryptoNetwork2) => {
  CryptoNetwork2["ethereum"] = "ethereum";
  CryptoNetwork2["tron"] = "tron";
  CryptoNetwork2["polygon"] = "polygon";
  CryptoNetwork2["binance"] = "binance";
  CryptoNetwork2["solana"] = "solana";
  return CryptoNetwork2;
})(CryptoNetwork || {});
var CryptoOtcSettlementSchedule = /* @__PURE__ */ ((CryptoOtcSettlementSchedule2) => {
  CryptoOtcSettlementSchedule2["instant"] = "instant";
  CryptoOtcSettlementSchedule2["d0d0"] = "d0d0";
  CryptoOtcSettlementSchedule2["d1d1"] = "d1d1";
  CryptoOtcSettlementSchedule2["d2d2"] = "d2d2";
  return CryptoOtcSettlementSchedule2;
})(CryptoOtcSettlementSchedule || {});
var CryptoSymbol = /* @__PURE__ */ ((CryptoSymbol2) => {
  CryptoSymbol2["usdt"] = "usdt";
  CryptoSymbol2["usdc"] = "usdc";
  CryptoSymbol2["trx"] = "trx";
  CryptoSymbol2["eth"] = "eth";
  return CryptoSymbol2;
})(CryptoSymbol || {});
var CryptoOtcTransactionStatus = /* @__PURE__ */ ((CryptoOtcTransactionStatus2) => {
  CryptoOtcTransactionStatus2["fulfilled"] = "fulfilled";
  CryptoOtcTransactionStatus2["fulfilling"] = "fulfilling";
  CryptoOtcTransactionStatus2["pending_payment"] = "pending_payment";
  CryptoOtcTransactionStatus2["pending_fulfillment"] = "pending_fulfillment";
  CryptoOtcTransactionStatus2["fulfillment_scheduled"] = "fulfillment_scheduled";
  return CryptoOtcTransactionStatus2;
})(CryptoOtcTransactionStatus || {});
var TransferMethod = /* @__PURE__ */ ((TransferMethod2) => {
  TransferMethod2["PIX_KEY"] = "pix-key";
  TransferMethod2["PIX_EMV"] = "pix-emv";
  TransferMethod2["PIX_ACCOUNT"] = "pix-account";
  TransferMethod2["TED"] = "ted";
  TransferMethod2["SAME_BANK"] = "same-bank";
  TransferMethod2["SAME_COMPANY"] = "same-company";
  return TransferMethod2;
})(TransferMethod || {});
var BeneficiaryAccountType = /* @__PURE__ */ ((BeneficiaryAccountType2) => {
  BeneficiaryAccountType2["CHECKING"] = "checking";
  BeneficiaryAccountType2["SAVINGS"] = "savings";
  BeneficiaryAccountType2["PAYMENT"] = "payment";
  BeneficiaryAccountType2["SALARY"] = "salary";
  return BeneficiaryAccountType2;
})(BeneficiaryAccountType || {});

// src/dto/charges/ChargeCreateDto.ts
var ChargeCreateCustomerAddressSchema = z.object({
  street: z.string(),
  number: z.string(),
  postalCode: z.string(),
  complement: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string(),
  countryCode: z.string(),
  state: z.string().optional()
});
var ChargeCreateCustomerSchema = z.object({
  name: z.string(),
  document: z.string(),
  type: z.enum(["individual", "company"]),
  address: ChargeCreateCustomerAddressSchema.optional()
});
var ChargeCreateSchema = z.object({
  accountId: z.string(),
  amountCents: z.number().positive(),
  currency: z.nativeEnum(Currency),
  externalId: z.string().optional(),
  sourceKey: z.string().optional(),
  methods: z.array(z.enum(["boleto", "pix"])),
  customer: ChargeCreateCustomerSchema,
  taxes: z.object({
    fine: z.number().optional(),
    interest: z.number().optional()
  }).optional(),
  dueAt: z.string().optional(),
  expiredAt: z.string().optional()
});
var ChargeCreateResponseSchema = z.object({
  id: z.string(),
  boleto: z.object({
    success: z.boolean(),
    status: z.nativeEnum(ChargeStatus)
  }).optional(),
  pix: z.object({
    success: z.boolean(),
    emv: z.string(),
    status: z.nativeEnum(ChargeStatus)
  }).optional()
});

// src/dto/charges/ChargeDownload.ts
import { z as z2 } from "zod";
var ChargeDownloadSchema = z2.object({
  id: z2.string(),
  language: z2.nativeEnum(AvailableLanguages).optional().default("pt" /* pt */)
});

// src/utils/safe-await.ts
var safeAwait = async (promise) => {
  try {
    const result = await promise;
    return { result, error: null };
  } catch (error) {
    return { result: null, error };
  }
};

// src/utils/validate-or-throw.ts
var validateOrThrow = async (schema, data) => {
  const validation = await safeAwait(schema.parseAsync(data));
  if (validation.error) {
    console.error(validation.error.issues);
    throw new Error(`Error while validating your input data : ${JSON.stringify(validation.error.issues)}`);
  }
  return validation.result;
};

// src/resources/charges.ts
var Charges = class extends BaseResource {
  constructor(client) {
    super(client, "/charges");
  }
  /**
   * Create a new charge
   */
  async create(data, sourceKey) {
    await validateOrThrow(ChargeCreateSchema, data);
    return this.post(
      `${sourceKey ? `?sourceKey=${sourceKey}` : ""}`,
      data
    );
  }
  /**
   * Get a charge
   */
  async getOne(id) {
    return this.get(`/${id}`);
  }
  /**
   * Get all charges
   */
  async getAll(params) {
    return this.get("", { params });
  }
  /**
   * Download the charge's PDF as array buffer
   */
  async downloadPdfAsBuffer(data) {
    await validateOrThrow(ChargeDownloadSchema, data);
    const { id, language } = data;
    const params = language ? { language } : {};
    return this.get(`/${id}/download`, {
      responseType: "arraybuffer",
      params
    });
  }
  /**
   * Cancel a charge
   */
  async cancel(id) {
    return this.delete(`/${id}`);
  }
};

// src/dto/crypto/CryptoWalletCreateDto.ts
import { z as z3 } from "zod";
import * as walletValidator from "multicoin-address-validator";
var WalletCreateDto = z3.object({
  name: z3.string(),
  symbol: z3.nativeEnum(CryptoSymbol),
  network: z3.nativeEnum(CryptoNetwork),
  address: z3.string()
}).refine(
  (data) => {
    let network = data.network;
    if (network === "binance" /* binance */)
      network = "ethereum" /* ethereum */;
    if (network === "polygon" /* polygon */)
      network = "ethereum" /* ethereum */;
    return walletValidator.validate(data.address, network);
  },
  {
    message: "Invalid wallet address for the specified network",
    path: ["address"]
    // Points the error to the address field
  }
);
var WalletCreateOutputDto = z3.object({
  id: z3.string(),
  name: z3.string(),
  symbol: z3.nativeEnum(CryptoSymbol),
  network: z3.nativeEnum(CryptoNetwork),
  address: z3.string()
});

// src/dto/crypto/CryptoQuote.ts
import { z as z4 } from "zod";
var QuoteDto = z4.object({
  symbol: z4.nativeEnum(CryptoSymbol),
  settlement: z4.nativeEnum(CryptoOtcSettlementSchedule)
});
var QuoteOutputDto = z4.object({
  quoteId: z4.string(),
  symbol: z4.nativeEnum(CryptoSymbol),
  settlement: z4.nativeEnum(CryptoOtcSettlementSchedule),
  price: z4.number(),
  expireAtUnix: z4.number()
});

// src/dto/crypto/CryptoExecuteDto.ts
import { z as z5 } from "zod";
var ExecuteDto = z5.object({
  quoteId: z5.string(),
  cost: z5.number().optional(),
  quantity: z5.number().optional(),
  accountId: z5.string(),
  walletId: z5.string()
}).refine((data) => !(data.cost !== void 0 && data.quantity !== void 0), {
  message: "Cannot specify both 'cost' and 'value' together",
  path: ["cost", "value"]
}).refine((data) => data.cost !== void 0 || data.quantity !== void 0, {
  message: "At least one of 'cost' or 'value' is required",
  path: ["cost", "value"]
});
var ExecuteOutputDto = z5.object({
  cryptoTransactionId: z5.string(),
  quantity: z5.number(),
  cost: z5.number(),
  price: z5.number(),
  network: z5.nativeEnum(CryptoNetwork),
  symbol: z5.nativeEnum(CryptoSymbol),
  currency: z5.string(),
  walletId: z5.string(),
  walletAddress: z5.string(),
  walletName: z5.string(),
  settlementSchedule: z5.nativeEnum(CryptoOtcSettlementSchedule).nullable(),
  settlementDate: z5.date().nullable()
});

// src/dto/crypto/CryptoPayDto.ts
import { z as z6 } from "zod";
var PayDto = z6.object({
  accountId: z6.string(),
  amount: z6.number().positive()
});
var PayOutputDto = z6.object({
  txId: z6.string()
});

// src/dto/crypto/CryptoTransactionListDto.ts
import { z as z7 } from "zod";
var TransactionsListDto = z7.object({
  symbol: z7.nativeEnum(CryptoSymbol).optional(),
  status: z7.nativeEnum(CryptoOtcTransactionStatus).optional(),
  from: z7.coerce.date().optional(),
  to: z7.coerce.date().optional(),
  page: z7.coerce.number().positive().default(1)
});
var TransactionsListOutput = z7.object({
  transactions: z7.array(
    z7.object({
      transactionId: z7.string(),
      status: z7.nativeEnum(CryptoOtcTransactionStatus),
      quantity: z7.number(),
      cost: z7.number(),
      price: z7.number(),
      network: z7.nativeEnum(CryptoNetwork),
      symbol: z7.nativeEnum(CryptoSymbol),
      currency: z7.nativeEnum(Currency),
      walletId: z7.string(),
      walletAddress: z7.string(),
      walletName: z7.string(),
      settlementDate: z7.date().nullable(),
      createdAt: z7.date(),
      updatedAt: z7.date()
    })
  ),
  total: z7.number(),
  totalPages: z7.number(),
  currentPage: z7.number(),
  hasMore: z7.boolean()
});

// src/resources/crypto.ts
var Crypto = class extends BaseResource {
  constructor(client) {
    super(client, "/crypto");
  }
  /**
   * Create a new crypto wallet
   */
  async createWallet(data) {
    await validateOrThrow(WalletCreateDto, data);
    return this.post("/wallets", data);
  }
  /**
   * List all crypto wallets
   */
  async listWallets() {
    return this.get("/wallets");
  }
  /**
   * Get list of available crypto products
   */
  async getProducts() {
    return this.get("/products");
  }
  /**
   * Get a quote for crypto trading
   */
  async getQuote(data) {
    await validateOrThrow(QuoteDto, data);
    return this.post("/quote", data);
  }
  /**
   * Execute a crypto trade
   */
  async executeOrder(data) {
    await validateOrThrow(ExecuteDto, data);
    return this.post("/execute", data);
  }
  /**
   * Pay for a crypto transaction
   */
  async pay(data) {
    await validateOrThrow(PayDto, data);
    return this.post("/pay", data);
  }
  /**
   * Get list of crypto transactions
   */
  async getTransactions(params) {
    await validateOrThrow(TransactionsListDto, params);
    return this.get("/transactions", { params });
  }
  /**
   * Get a specific crypto transaction
   */
  async getTransaction(transactionId) {
    return this.get(`/transactions/${transactionId}`);
  }
};

// src/dto/customers/CustomerGetAll.ts
import { z as z8 } from "zod";
var CustomerGetAllSchema = z8.object({
  type: z8.nativeEnum(CustomerType).optional(),
  isBeneficiary: z8.boolean().optional(),
  query: z8.string().optional(),
  page: z8.coerce.number()
});
var CustomerSchema = z8.object({
  id: z8.string(),
  name: z8.string(),
  email: z8.string(),
  document: z8.string(),
  type: z8.nativeEnum(CustomerType),
  isBeneficiary: z8.boolean(),
  addressStreet: z8.string(),
  addressNumber: z8.string(),
  addressNeighborhood: z8.string(),
  addressCity: z8.string(),
  addressState: z8.string(),
  addressPostalCode: z8.string(),
  addressCountryCode: z8.string(),
  createdAt: z8.string()
});
var CustomerGetAllResponseSchema = z8.object({
  customers: z8.array(CustomerSchema),
  total: z8.number(),
  totalPages: z8.number(),
  currentPage: z8.number(),
  hasMore: z8.boolean()
});

// src/resources/customers.ts
var Customers = class extends BaseResource {
  constructor(client) {
    super(client, "/customers");
  }
  /**
   * Get all customers
   */
  async getAll(params) {
    await validateOrThrow(CustomerGetAllSchema, params);
    return this.get("", {
      params
    });
  }
  /**
   * Get one customer by id
   */
  async getOne(id) {
    return this.get(`/${id}`);
  }
};

// src/dto/transactions/TransactionGetAllDto.ts
import { z as z9 } from "zod";
var TransactionGetAllSchema = z9.object({
  customerId: z9.string().optional(),
  accountId: z9.string().optional(),
  type: z9.enum(["inbound" /* inbound */, "outbound" /* outbound */, "all"]).optional().default("all"),
  query: z9.string().optional(),
  from: z9.coerce.date().optional(),
  to: z9.coerce.date().optional(),
  page: z9.coerce.number().optional().default(1),
  status: z9.enum([
    "succeeded" /* succeeded */,
    "incomplete" /* incomplete */,
    "failed" /* failed */,
    "refunded" /* refunded */,
    "created" /* created */,
    "all"
  ]).optional().default("all")
});
var CustomerSchema2 = z9.object({
  id: z9.string(),
  name: z9.string().nullable().transform((val) => val ?? ""),
  email: z9.string().nullable().transform((val) => val ?? ""),
  cpfCnpj: z9.string().nullable().transform((val) => val ?? "")
});
var TransactionSchema = z9.object({
  id: z9.string(),
  amountCents: z9.number(),
  account: z9.string(),
  customer: CustomerSchema2,
  payerName: z9.string().nullable().transform((val) => val ?? ""),
  payerCpfCnpj: z9.string().nullable().transform((val) => val ?? ""),
  description: z9.string(),
  e2eID: z9.string(),
  status: z9.string(),
  method: z9.string(),
  type: z9.string(),
  currency: z9.string(),
  fees: z9.number(),
  disputed: z9.boolean(),
  pixKey: z9.string().optional().nullable().transform((val) => val ?? ""),
  createdAt: z9.coerce.date(),
  updatedAt: z9.coerce.date(),
  completedAt: z9.coerce.date().nullable()
});
var TransactionGetAllResponseSchema = z9.object({
  transactions: z9.array(TransactionSchema),
  total: z9.number(),
  totalPages: z9.number(),
  currentPage: z9.number(),
  hasMore: z9.boolean()
});

// src/resources/transactions.ts
var Transactions = class extends BaseResource {
  constructor(client) {
    super(client, "/transactions");
  }
  /**
   * Get all transactions
   */
  async getAll(params) {
    await validateOrThrow(TransactionGetAllSchema, params);
    return this.get("", {
      params
    });
  }
};

// src/dto/transfers/TransferPrepareDto.ts
import { z as z10 } from "zod";
var baseSchema = z10.object({
  accountId: z10.string().nonempty("Account Id is required")
});
var beneficiarySchema = z10.object({
  beneficiaryAccountType: z10.nativeEnum(BeneficiaryAccountType).optional(),
  beneficiaryAccountNumber: z10.string().optional(),
  beneficiaryDocument: z10.string().optional(),
  beneficiaryAgency: z10.string().optional(),
  beneficiaryName: z10.string().optional(),
  beneficiaryId: z10.string().optional(),
  beneficiaryBankId: z10.string().optional()
});
var TransferPrepareBaseSchema = baseSchema.merge(
  z10.object({
    method: z10.nativeEnum(TransferMethod)
  })
);
var TransferPreparePixKeySchema = baseSchema.extend({
  method: z10.literal("pix-key" /* PIX_KEY */),
  pixKey: z10.string().nonempty("Pix Key is required")
});
var TransferPreparePixEmvSchema = baseSchema.extend({
  method: z10.literal("pix-emv" /* PIX_EMV */),
  emv: z10.string().nonempty("Pix EMV is required")
});
var TransferPreparePixAccountSchema = baseSchema.merge(beneficiarySchema).extend({ method: z10.literal("pix-account" /* PIX_ACCOUNT */) });
var TransferPrepareSameBankSchema = baseSchema.merge(beneficiarySchema.omit({ beneficiaryAccountType: true, beneficiaryAgency: true })).extend({
  method: z10.literal("same-bank" /* SAME_BANK */)
});
var TransferPrepareTedSchema = baseSchema.merge(beneficiarySchema).extend({ method: z10.literal("ted" /* TED */) });
var TransferPrepareSameCompanySchema = baseSchema.extend({
  method: z10.literal("same-company" /* SAME_COMPANY */),
  destinationAccountId: z10.string().nonempty("Destination Account Id is required")
});
var TransferPrepareSchemas = {
  ["pix-key" /* PIX_KEY */]: TransferPreparePixKeySchema,
  ["pix-emv" /* PIX_EMV */]: TransferPreparePixEmvSchema,
  ["pix-account" /* PIX_ACCOUNT */]: TransferPreparePixAccountSchema,
  ["same-bank" /* SAME_BANK */]: TransferPrepareSameBankSchema,
  ["ted" /* TED */]: TransferPrepareTedSchema,
  ["same-company" /* SAME_COMPANY */]: TransferPrepareSameCompanySchema
};
var TransferPrepareResponseSchema = z10.object({
  transferId: z10.string(),
  beneficiaryDocument: z10.string(),
  bankName: z10.string()
});
var TransferSameBankRefinedSchema = TransferPrepareSameBankSchema.refine(
  (data) => data.beneficiaryId && data.beneficiaryId !== "" || data.beneficiaryName && data.beneficiaryName !== "" && data.beneficiaryAccountNumber && data.beneficiaryAccountNumber !== "" && data.beneficiaryDocument && data.beneficiaryDocument !== "" && data.beneficiaryBankId && data.beneficiaryBankId !== "",
  {
    message: "Beneficiary is required by either ID or all fields",
    path: ["beneficiaryId", "beneficiaryName", "beneficiaryAccountNumber", "beneficiaryDocument", "beneficiaryBankId"]
  }
);
var TransferPreparePixAccountRefinedSchema = TransferPreparePixAccountSchema.refine(
  (data) => data.beneficiaryId && data.beneficiaryId !== "" || data.beneficiaryName && data.beneficiaryName !== "" && data.beneficiaryAccountNumber && data.beneficiaryAccountNumber !== "" && data.beneficiaryDocument && data.beneficiaryDocument !== "" && data.beneficiaryBankId && data.beneficiaryBankId !== "" && data.beneficiaryAccountType && data.beneficiaryAgency && data.beneficiaryAgency !== "",
  {
    message: "Beneficiary is required by either ID or all fields",
    path: [
      "beneficiaryId",
      "beneficiaryName",
      "beneficiaryAccountNumber",
      "beneficiaryDocument",
      "beneficiaryBankId",
      "beneficiaryAccountType",
      "beneficiaryAgency"
    ]
  }
);
var TransferPrepareTedRefinedSchema = TransferPrepareTedSchema.refine(
  (data) => data.beneficiaryId && data.beneficiaryId !== "" || data.beneficiaryName && data.beneficiaryName !== "" && data.beneficiaryAccountNumber && data.beneficiaryAccountNumber !== "" && data.beneficiaryDocument && data.beneficiaryDocument !== "" && data.beneficiaryBankId && data.beneficiaryBankId !== "" && data.beneficiaryAccountType && data.beneficiaryAgency && data.beneficiaryAgency !== "",
  {
    message: "Beneficiary is required by either ID or all fields",
    path: [
      "beneficiaryId",
      "beneficiaryName",
      "beneficiaryAccountNumber",
      "beneficiaryDocument",
      "beneficiaryBankId",
      "beneficiaryAccountType",
      "beneficiaryAgency"
    ]
  }
);

// src/dto/transfers/TransferConfirmDto.ts
import { z as z11 } from "zod";
var TransferConfirmSchema = z11.object({
  transferId: z11.string().nonempty("Transfer Id is required"),
  amountCent: z11.number().min(1, "Amount in cents is required"),
  accountId: z11.string().nonempty("Account Id is required"),
  reference: z11.string().optional()
});

// src/resources/transfers.ts
var Transfers = class extends BaseResource {
  constructor(client) {
    super(client, "/transfers");
  }
  /**
   * Prepare a transfer by method
   */
  async prepare(data) {
    const schema = TransferPrepareSchemas[data.method];
    if (!schema) {
      throw new Error(`Unsupported transfer method: ${data.method}`);
    }
    await validateOrThrow(schema, data);
    return this.post("/prepare", data);
  }
  /**
   * Confirm a prepared transfer
   */
  async confirm(data) {
    await validateOrThrow(TransferConfirmSchema, data);
    return this.post("/confirm", data);
  }
};

// src/dto/bank-institutions/BankInstitutionSearchDto.ts
import { z as z13 } from "zod";

// src/dto/bank-institutions/BankInsitutionGetAllDto.ts
import { z as z12 } from "zod";
var BankCodeSchema = z12.object({
  id: z12.string(),
  name: z12.string(),
  ispb: z12.string(),
  compe: z12.string().nullable(),
  indexationNumber: z12.bigint()
});
var BankInstitutionGetAllSchema = z12.object({
  query: z12.string().optional(),
  page: z12.coerce.number(),
  totalPerPage: z12.coerce.number().optional().default(50)
});
var BankInstitutionGetAllResponseSchema = z12.object({
  bankInstitutions: z12.array(BankCodeSchema),
  total: z12.number(),
  totalPages: z12.number(),
  currentPage: z12.number(),
  hasMore: z12.boolean()
});

// src/dto/bank-institutions/BankInstitutionSearchDto.ts
var BankInstitutionSearchSchema = z13.object({
  query: z13.string().optional(),
  page: z13.coerce.number(),
  totalPerPage: z13.coerce.number().optional().default(50)
});
var BankInstitutionSearchResponseSchema = z13.object({
  bankInstitutions: z13.array(BankCodeSchema),
  total: z13.number(),
  totalPages: z13.number(),
  currentPage: z13.number(),
  hasMore: z13.boolean()
});

// src/resources/bank-institution.ts
var BankInstitution = class extends BaseResource {
  constructor(client) {
    super(client, "/bank-institutions");
  }
  /**
   * Get all bank institutions
   */
  async getAll(params) {
    await validateOrThrow(BankInstitutionGetAllSchema, params);
    return this.get("", {
      params
    });
  }
  /**
   * Search a bank institution
   */
  async search(params) {
    await validateOrThrow(BankInstitutionSearchSchema, params);
    return this.get("", { params });
  }
};

// src/sdk.ts
var Contabull = class {
  constructor(options) {
    this.options = {
      timeout: 1e4,
      ...options
    };
    this.client = axios.create({
      baseURL: this.options.baseUrl || "https://api.contabull.com",
      timeout: this.options.timeout
    });
    this.authorization = new Authorization(this.client);
    this.accounts = new Accounts(this.client);
    this.charges = new Charges(this.client);
    this.crypto = new Crypto(this.client);
    this.customers = new Customers(this.client);
    this.transactions = new Transactions(this.client);
    this.transfers = new Transfers(this.client);
    this.bankInstitution = new BankInstitution(this.client);
    this.client.interceptors.request.use(
      async (config) => this.signRequest(config),
      (error) => Promise.reject(error)
    );
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        const apiError = {
          status: error.response?.status || 0,
          message: error.response?.data?.message || error.message,
          data: error.response?.data || null,
          originalError: error
        };
        return Promise.reject(apiError);
      }
    );
  }
  async request(config) {
    const response = await this.client.request(config);
    return response.data;
  }
  async signRequest(config) {
    const url = new URL(config.url, this.options.baseUrl);
    const path = url.pathname + url.search;
    const body = config.data ? JSON.stringify(config.data) : "{}";
    const bodyHash = SHA256(body).toString();
    const now = Math.floor(Date.now() / 1e3);
    const jwtPayload = {
      uri: path,
      iat: now,
      exp: now + 55,
      sub: this.options.apiKey,
      bodyHash
    };
    const signedJwt = jwt.sign(jwtPayload, this.options.privateKey, {
      algorithm: "RS256"
    });
    config.headers = config.headers || {};
    config.headers["X-API-KEY"] = this.options.apiKey;
    config.headers["Authorization"] = `Bearer ${signedJwt}`;
    return config;
  }
};
export {
  Accounts,
  Authorization,
  AvailableLanguages,
  BankInstitution,
  BeneficiaryAccountType,
  ChargeStatus,
  Charges,
  Contabull,
  Crypto,
  CryptoNetwork,
  CryptoOtcSettlementSchedule,
  CryptoOtcTransactionStatus,
  CryptoSymbol,
  Currency,
  CustomerType,
  Customers,
  PaymentStatus,
  TransactionType,
  Transactions,
  TransferMethod,
  Transfers
};
