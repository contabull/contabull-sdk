"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Accounts: () => Accounts,
  Authorization: () => Authorization,
  AvailableLanguages: () => AvailableLanguages,
  BankInstitution: () => BankInstitution,
  BeneficiaryAccountType: () => BeneficiaryAccountType,
  ChargeStatus: () => ChargeStatus,
  Charges: () => Charges,
  Contabull: () => Contabull,
  Crypto: () => Crypto,
  CryptoNetwork: () => CryptoNetwork,
  CryptoOtcSettlementSchedule: () => CryptoOtcSettlementSchedule,
  CryptoOtcTransactionStatus: () => CryptoOtcTransactionStatus,
  CryptoSymbol: () => CryptoSymbol,
  Currency: () => Currency,
  CustomerType: () => CustomerType,
  Customers: () => Customers,
  PaymentStatus: () => PaymentStatus,
  TransactionType: () => TransactionType,
  Transactions: () => Transactions,
  TransferMethod: () => TransferMethod,
  Transfers: () => Transfers
});
module.exports = __toCommonJS(src_exports);

// src/sdk.ts
var import_axios = __toESM(require("axios"));
var import_sha256 = __toESM(require("crypto-js/sha256"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));

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
var import_zod = require("zod");

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
var ChargeCreateCustomerAddressSchema = import_zod.z.object({
  street: import_zod.z.string(),
  number: import_zod.z.string(),
  postalCode: import_zod.z.string(),
  complement: import_zod.z.string().optional(),
  neighborhood: import_zod.z.string().optional(),
  city: import_zod.z.string(),
  countryCode: import_zod.z.string(),
  state: import_zod.z.string().optional()
});
var ChargeCreateCustomerSchema = import_zod.z.object({
  name: import_zod.z.string(),
  document: import_zod.z.string(),
  type: import_zod.z.enum(["individual", "company"]),
  address: ChargeCreateCustomerAddressSchema.optional()
});
var ChargeCreateSchema = import_zod.z.object({
  accountId: import_zod.z.string(),
  amountCents: import_zod.z.number().positive(),
  currency: import_zod.z.nativeEnum(Currency),
  externalId: import_zod.z.string().optional(),
  sourceKey: import_zod.z.string().optional(),
  methods: import_zod.z.array(import_zod.z.enum(["boleto", "pix"])),
  customer: ChargeCreateCustomerSchema,
  taxes: import_zod.z.object({
    fine: import_zod.z.number().optional(),
    interest: import_zod.z.number().optional()
  }).optional(),
  dueAt: import_zod.z.string().optional(),
  expiredAt: import_zod.z.string().optional()
});
var ChargeCreateResponseSchema = import_zod.z.object({
  id: import_zod.z.string(),
  boleto: import_zod.z.object({
    success: import_zod.z.boolean(),
    status: import_zod.z.nativeEnum(ChargeStatus)
  }).optional(),
  pix: import_zod.z.object({
    success: import_zod.z.boolean(),
    emv: import_zod.z.string(),
    status: import_zod.z.nativeEnum(ChargeStatus)
  }).optional()
});

// src/dto/charges/ChargeDownload.ts
var import_zod2 = require("zod");
var ChargeDownloadSchema = import_zod2.z.object({
  id: import_zod2.z.string(),
  language: import_zod2.z.nativeEnum(AvailableLanguages).optional().default("pt" /* pt */)
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
var import_zod3 = require("zod");
var walletValidator = __toESM(require("multicoin-address-validator"));
var WalletCreateDto = import_zod3.z.object({
  name: import_zod3.z.string(),
  symbol: import_zod3.z.nativeEnum(CryptoSymbol),
  network: import_zod3.z.nativeEnum(CryptoNetwork),
  address: import_zod3.z.string()
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
var WalletCreateOutputDto = import_zod3.z.object({
  id: import_zod3.z.string(),
  name: import_zod3.z.string(),
  symbol: import_zod3.z.nativeEnum(CryptoSymbol),
  network: import_zod3.z.nativeEnum(CryptoNetwork),
  address: import_zod3.z.string()
});

// src/dto/crypto/CryptoQuote.ts
var import_zod4 = require("zod");
var QuoteDto = import_zod4.z.object({
  symbol: import_zod4.z.nativeEnum(CryptoSymbol),
  settlement: import_zod4.z.nativeEnum(CryptoOtcSettlementSchedule)
});
var QuoteOutputDto = import_zod4.z.object({
  quoteId: import_zod4.z.string(),
  symbol: import_zod4.z.nativeEnum(CryptoSymbol),
  settlement: import_zod4.z.nativeEnum(CryptoOtcSettlementSchedule),
  price: import_zod4.z.number(),
  expireAtUnix: import_zod4.z.number()
});

// src/dto/crypto/CryptoExecuteDto.ts
var import_zod5 = require("zod");
var ExecuteDto = import_zod5.z.object({
  quoteId: import_zod5.z.string(),
  cost: import_zod5.z.number().optional(),
  quantity: import_zod5.z.number().optional(),
  accountId: import_zod5.z.string(),
  walletId: import_zod5.z.string()
}).refine((data) => !(data.cost !== void 0 && data.quantity !== void 0), {
  message: "Cannot specify both 'cost' and 'value' together",
  path: ["cost", "value"]
}).refine((data) => data.cost !== void 0 || data.quantity !== void 0, {
  message: "At least one of 'cost' or 'value' is required",
  path: ["cost", "value"]
});
var ExecuteOutputDto = import_zod5.z.object({
  cryptoTransactionId: import_zod5.z.string(),
  quantity: import_zod5.z.number(),
  cost: import_zod5.z.number(),
  price: import_zod5.z.number(),
  network: import_zod5.z.nativeEnum(CryptoNetwork),
  symbol: import_zod5.z.nativeEnum(CryptoSymbol),
  currency: import_zod5.z.string(),
  walletId: import_zod5.z.string(),
  walletAddress: import_zod5.z.string(),
  walletName: import_zod5.z.string(),
  settlementSchedule: import_zod5.z.nativeEnum(CryptoOtcSettlementSchedule).nullable(),
  settlementDate: import_zod5.z.date().nullable()
});

// src/dto/crypto/CryptoPayDto.ts
var import_zod6 = require("zod");
var PayDto = import_zod6.z.object({
  accountId: import_zod6.z.string(),
  amount: import_zod6.z.number().positive()
});
var PayOutputDto = import_zod6.z.object({
  txId: import_zod6.z.string()
});

// src/dto/crypto/CryptoTransactionListDto.ts
var import_zod7 = require("zod");
var TransactionsListDto = import_zod7.z.object({
  symbol: import_zod7.z.nativeEnum(CryptoSymbol).optional(),
  status: import_zod7.z.nativeEnum(CryptoOtcTransactionStatus).optional(),
  from: import_zod7.z.coerce.date().optional(),
  to: import_zod7.z.coerce.date().optional(),
  page: import_zod7.z.coerce.number().positive().default(1)
});
var TransactionsListOutput = import_zod7.z.object({
  transactions: import_zod7.z.array(
    import_zod7.z.object({
      transactionId: import_zod7.z.string(),
      status: import_zod7.z.nativeEnum(CryptoOtcTransactionStatus),
      quantity: import_zod7.z.number(),
      cost: import_zod7.z.number(),
      price: import_zod7.z.number(),
      network: import_zod7.z.nativeEnum(CryptoNetwork),
      symbol: import_zod7.z.nativeEnum(CryptoSymbol),
      currency: import_zod7.z.nativeEnum(Currency),
      walletId: import_zod7.z.string(),
      walletAddress: import_zod7.z.string(),
      walletName: import_zod7.z.string(),
      settlementDate: import_zod7.z.date().nullable(),
      createdAt: import_zod7.z.date(),
      updatedAt: import_zod7.z.date()
    })
  ),
  total: import_zod7.z.number(),
  totalPages: import_zod7.z.number(),
  currentPage: import_zod7.z.number(),
  hasMore: import_zod7.z.boolean()
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
var import_zod8 = require("zod");
var CustomerGetAllSchema = import_zod8.z.object({
  type: import_zod8.z.nativeEnum(CustomerType).optional(),
  isBeneficiary: import_zod8.z.boolean().optional(),
  query: import_zod8.z.string().optional(),
  page: import_zod8.z.coerce.number()
});
var CustomerSchema = import_zod8.z.object({
  id: import_zod8.z.string(),
  name: import_zod8.z.string(),
  email: import_zod8.z.string(),
  document: import_zod8.z.string(),
  type: import_zod8.z.nativeEnum(CustomerType),
  isBeneficiary: import_zod8.z.boolean(),
  addressStreet: import_zod8.z.string(),
  addressNumber: import_zod8.z.string(),
  addressNeighborhood: import_zod8.z.string(),
  addressCity: import_zod8.z.string(),
  addressState: import_zod8.z.string(),
  addressPostalCode: import_zod8.z.string(),
  addressCountryCode: import_zod8.z.string(),
  createdAt: import_zod8.z.string()
});
var CustomerGetAllResponseSchema = import_zod8.z.object({
  customers: import_zod8.z.array(CustomerSchema),
  total: import_zod8.z.number(),
  totalPages: import_zod8.z.number(),
  currentPage: import_zod8.z.number(),
  hasMore: import_zod8.z.boolean()
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
var import_zod9 = require("zod");
var TransactionGetAllSchema = import_zod9.z.object({
  customerId: import_zod9.z.string().optional(),
  accountId: import_zod9.z.string().optional(),
  type: import_zod9.z.enum(["inbound" /* inbound */, "outbound" /* outbound */, "all"]).optional().default("all"),
  query: import_zod9.z.string().optional(),
  from: import_zod9.z.coerce.date().optional(),
  to: import_zod9.z.coerce.date().optional(),
  page: import_zod9.z.coerce.number().optional().default(1),
  status: import_zod9.z.enum([
    "succeeded" /* succeeded */,
    "incomplete" /* incomplete */,
    "failed" /* failed */,
    "refunded" /* refunded */,
    "created" /* created */,
    "all"
  ]).optional().default("all")
});
var CustomerSchema2 = import_zod9.z.object({
  id: import_zod9.z.string(),
  name: import_zod9.z.string().nullable().transform((val) => val ?? ""),
  email: import_zod9.z.string().nullable().transform((val) => val ?? ""),
  cpfCnpj: import_zod9.z.string().nullable().transform((val) => val ?? "")
});
var TransactionSchema = import_zod9.z.object({
  id: import_zod9.z.string(),
  amountCents: import_zod9.z.number(),
  account: import_zod9.z.string(),
  customer: CustomerSchema2,
  payerName: import_zod9.z.string().nullable().transform((val) => val ?? ""),
  payerCpfCnpj: import_zod9.z.string().nullable().transform((val) => val ?? ""),
  description: import_zod9.z.string(),
  e2eID: import_zod9.z.string(),
  status: import_zod9.z.string(),
  method: import_zod9.z.string(),
  type: import_zod9.z.string(),
  currency: import_zod9.z.string(),
  fees: import_zod9.z.number(),
  disputed: import_zod9.z.boolean(),
  pixKey: import_zod9.z.string().optional().nullable().transform((val) => val ?? ""),
  createdAt: import_zod9.z.coerce.date(),
  updatedAt: import_zod9.z.coerce.date(),
  completedAt: import_zod9.z.coerce.date().nullable()
});
var TransactionGetAllResponseSchema = import_zod9.z.object({
  transactions: import_zod9.z.array(TransactionSchema),
  total: import_zod9.z.number(),
  totalPages: import_zod9.z.number(),
  currentPage: import_zod9.z.number(),
  hasMore: import_zod9.z.boolean()
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
var import_zod10 = require("zod");
var baseSchema = import_zod10.z.object({
  accountId: import_zod10.z.string().nonempty("Account Id is required")
});
var beneficiarySchema = import_zod10.z.object({
  beneficiaryAccountType: import_zod10.z.nativeEnum(BeneficiaryAccountType).optional(),
  beneficiaryAccountNumber: import_zod10.z.string().optional(),
  beneficiaryDocument: import_zod10.z.string().optional(),
  beneficiaryAgency: import_zod10.z.string().optional(),
  beneficiaryName: import_zod10.z.string().optional(),
  beneficiaryId: import_zod10.z.string().optional(),
  beneficiaryBankId: import_zod10.z.string().optional()
});
var TransferPrepareBaseSchema = baseSchema.merge(
  import_zod10.z.object({
    method: import_zod10.z.nativeEnum(TransferMethod)
  })
);
var TransferPreparePixKeySchema = baseSchema.extend({
  method: import_zod10.z.literal("pix-key" /* PIX_KEY */),
  pixKey: import_zod10.z.string().nonempty("Pix Key is required")
});
var TransferPreparePixEmvSchema = baseSchema.extend({
  method: import_zod10.z.literal("pix-emv" /* PIX_EMV */),
  emv: import_zod10.z.string().nonempty("Pix EMV is required")
});
var TransferPreparePixAccountSchema = baseSchema.merge(beneficiarySchema).extend({ method: import_zod10.z.literal("pix-account" /* PIX_ACCOUNT */) });
var TransferPrepareSameBankSchema = baseSchema.merge(beneficiarySchema.omit({ beneficiaryAccountType: true, beneficiaryAgency: true })).extend({
  method: import_zod10.z.literal("same-bank" /* SAME_BANK */)
});
var TransferPrepareTedSchema = baseSchema.merge(beneficiarySchema).extend({ method: import_zod10.z.literal("ted" /* TED */) });
var TransferPrepareSameCompanySchema = baseSchema.extend({
  method: import_zod10.z.literal("same-company" /* SAME_COMPANY */),
  destinationAccountId: import_zod10.z.string().nonempty("Destination Account Id is required")
});
var TransferPrepareSchemas = {
  ["pix-key" /* PIX_KEY */]: TransferPreparePixKeySchema,
  ["pix-emv" /* PIX_EMV */]: TransferPreparePixEmvSchema,
  ["pix-account" /* PIX_ACCOUNT */]: TransferPreparePixAccountSchema,
  ["same-bank" /* SAME_BANK */]: TransferPrepareSameBankSchema,
  ["ted" /* TED */]: TransferPrepareTedSchema,
  ["same-company" /* SAME_COMPANY */]: TransferPrepareSameCompanySchema
};
var TransferPrepareResponseSchema = import_zod10.z.object({
  transferId: import_zod10.z.string(),
  beneficiaryDocument: import_zod10.z.string(),
  bankName: import_zod10.z.string()
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
var import_zod11 = require("zod");
var TransferConfirmSchema = import_zod11.z.object({
  transferId: import_zod11.z.string().nonempty("Transfer Id is required"),
  amountCent: import_zod11.z.number().min(1, "Amount in cents is required"),
  accountId: import_zod11.z.string().nonempty("Account Id is required"),
  reference: import_zod11.z.string().optional()
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
var import_zod13 = require("zod");

// src/dto/bank-institutions/BankInsitutionGetAllDto.ts
var import_zod12 = require("zod");
var BankCodeSchema = import_zod12.z.object({
  id: import_zod12.z.string(),
  name: import_zod12.z.string(),
  ispb: import_zod12.z.string(),
  compe: import_zod12.z.string().nullable(),
  indexationNumber: import_zod12.z.bigint()
});
var BankInstitutionGetAllSchema = import_zod12.z.object({
  query: import_zod12.z.string().optional(),
  page: import_zod12.z.coerce.number(),
  totalPerPage: import_zod12.z.coerce.number().optional().default(50)
});
var BankInstitutionGetAllResponseSchema = import_zod12.z.object({
  bankInstitutions: import_zod12.z.array(BankCodeSchema),
  total: import_zod12.z.number(),
  totalPages: import_zod12.z.number(),
  currentPage: import_zod12.z.number(),
  hasMore: import_zod12.z.boolean()
});

// src/dto/bank-institutions/BankInstitutionSearchDto.ts
var BankInstitutionSearchSchema = import_zod13.z.object({
  query: import_zod13.z.string().optional(),
  page: import_zod13.z.coerce.number(),
  totalPerPage: import_zod13.z.coerce.number().optional().default(50)
});
var BankInstitutionSearchResponseSchema = import_zod13.z.object({
  bankInstitutions: import_zod13.z.array(BankCodeSchema),
  total: import_zod13.z.number(),
  totalPages: import_zod13.z.number(),
  currentPage: import_zod13.z.number(),
  hasMore: import_zod13.z.boolean()
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
    this.client = import_axios.default.create({
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
    const bodyHash = (0, import_sha256.default)(body).toString();
    const now = Math.floor(Date.now() / 1e3);
    const jwtPayload = {
      uri: path,
      iat: now,
      exp: now + 55,
      sub: this.options.apiKey,
      bodyHash
    };
    const signedJwt = import_jsonwebtoken.default.sign(jwtPayload, this.options.privateKey, {
      algorithm: "RS256"
    });
    config.headers = config.headers || {};
    config.headers["X-API-KEY"] = this.options.apiKey;
    config.headers["Authorization"] = `Bearer ${signedJwt}`;
    return config;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
