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
  Authorization: () => Authorization,
  ChargeStatus: () => ChargeStatus,
  Charges: () => Charges,
  Contabull: () => Contabull,
  Currency: () => Currency,
  PaymentStatus: () => PaymentStatus,
  TransactionType: () => TransactionType,
  Transactions: () => Transactions
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
  account: import_zod.z.string(),
  amountCents: import_zod.z.number().positive(),
  currency: import_zod.z.nativeEnum(Currency),
  methods: import_zod.z.array(import_zod.z.enum(["boleto", "pix"])),
  externalId: import_zod.z.string().optional(),
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
  success: import_zod.z.boolean()
});

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
    return this.post(`/create${sourceKey ? `?sourceKey=${sourceKey}` : ""}`, data);
  }
  /**
   * Get a charge
   */
  async getOne(id) {
    return this.get(`?uid=${id}`);
  }
  /**
   * Download the charge's PDF as array buffer
   */
  async downloadPdfAsBuffer(id) {
    return this.get(`/download?uid=${id}`, { responseType: "arraybuffer" });
  }
  /**
   * Cancel a charge
   */
  async cancel(id) {
    return this.delete(`?uid=${id}`);
  }
};

// src/dto/transactions/TransactionGetAllDto.ts
var import_zod2 = require("zod");
var TransactionGetAllSchema = import_zod2.z.object({
  customerId: import_zod2.z.string().optional(),
  accountId: import_zod2.z.string().optional(),
  type: import_zod2.z.enum(["inbound" /* inbound */, "outbound" /* outbound */, "all"]),
  query: import_zod2.z.string().optional(),
  from: import_zod2.z.coerce.date().optional(),
  to: import_zod2.z.coerce.date().optional(),
  page: import_zod2.z.coerce.number(),
  status: import_zod2.z.enum([
    "succeeded" /* succeeded */,
    "incomplete" /* incomplete */,
    "failed" /* failed */,
    "refunded" /* refunded */,
    "created" /* created */,
    "all"
  ])
});
var TransactionCustomerSchema = import_zod2.z.object({
  id: import_zod2.z.string(),
  name: import_zod2.z.string(),
  email: import_zod2.z.string(),
  cpfCnpj: import_zod2.z.string()
});
var TransactionSchema = import_zod2.z.object({
  id: import_zod2.z.string(),
  amount: import_zod2.z.number(),
  customer: TransactionCustomerSchema,
  payerName: import_zod2.z.string(),
  payerCpfCnpj: import_zod2.z.string(),
  description: import_zod2.z.string(),
  e2eID: import_zod2.z.string(),
  status: import_zod2.z.nativeEnum(PaymentStatus),
  method: import_zod2.z.string(),
  type: import_zod2.z.nativeEnum(TransactionType),
  currency: import_zod2.z.nativeEnum(Currency),
  bankAccountId: import_zod2.z.string(),
  fees: import_zod2.z.number(),
  disputed: import_zod2.z.boolean()
});
var TransactionGetAllResponseSchema = import_zod2.z.object({
  transactions: import_zod2.z.array(TransactionSchema),
  total: import_zod2.z.number(),
  totalPages: import_zod2.z.number(),
  currentPage: import_zod2.z.number()
});

// src/resources/transactions.ts
var Transactions = class extends BaseResource {
  constructor(client) {
    super(client, "/transactions");
  }
  /**
   * Get all transactions
   */
  async getAll(data) {
    await validateOrThrow(TransactionGetAllSchema, data);
    return this.get("", {
      params: data
    });
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
      baseURL: this.options.baseUrl,
      timeout: this.options.timeout
    });
    this.authorization = new Authorization(this.client);
    this.charges = new Charges(this.client);
    this.transactions = new Transactions(this.client);
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
  Authorization,
  ChargeStatus,
  Charges,
  Contabull,
  Currency,
  PaymentStatus,
  TransactionType,
  Transactions
});
