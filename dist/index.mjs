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
    return this.get("/all");
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
  account: z.string(),
  amountCents: z.number().positive(),
  currency: z.nativeEnum(Currency),
  methods: z.array(z.enum(["boleto", "pix"])),
  externalId: z.string().optional(),
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
  success: z.boolean()
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
      `/create${sourceKey ? `?sourceKey=${sourceKey}` : ""}`,
      data
    );
  }
  /**
   * Get a charge
   */
  async getOne(id) {
    return this.get(`?uid=${id}`);
  }
  /**
   * Get all charges
   */
  async getAll(params) {
    return this.get(`/all`, { params });
  }
  /**
   * Download the charge's PDF as array buffer
   */
  async downloadPdfAsBuffer(id) {
    return this.get(`/download?uid=${id}`, {
      responseType: "arraybuffer"
    });
  }
  /**
   * Cancel a charge
   */
  async cancel(id) {
    return this.delete(`?uid=${id}`);
  }
};

// src/dto/transactions/TransactionGetAllDto.ts
import { z as z2 } from "zod";
var TransactionGetAllSchema = z2.object({
  account: z2.string().optional(),
  type: z2.enum(["inbound" /* inbound */, "outbound" /* outbound */, "all"]),
  from: z2.coerce.date().optional(),
  to: z2.coerce.date().optional(),
  page: z2.coerce.number(),
  status: z2.enum([
    "succeeded" /* succeeded */,
    "incomplete" /* incomplete */,
    "failed" /* failed */,
    "refunded" /* refunded */,
    "created" /* created */,
    "all"
  ])
});
var TransactionCustomerSchema = z2.object({
  id: z2.string(),
  name: z2.string(),
  email: z2.string(),
  cpfCnpj: z2.string()
});
var TransactionSchema = z2.object({
  id: z2.string(),
  amountCents: z2.number(),
  customer: TransactionCustomerSchema,
  payerName: z2.string(),
  payerCpfCnpj: z2.string(),
  description: z2.string(),
  e2eID: z2.string(),
  status: z2.nativeEnum(PaymentStatus),
  method: z2.string(),
  type: z2.nativeEnum(TransactionType),
  currency: z2.nativeEnum(Currency),
  bankAccountId: z2.string(),
  fees: z2.number(),
  disputed: z2.boolean()
});
var TransactionGetAllResponseSchema = z2.object({
  transactions: z2.array(TransactionSchema),
  total: z2.number(),
  totalPages: z2.number(),
  currentPage: z2.number()
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
    return this.get("/all", {
      params
    });
  }
};

// src/dto/customers/CustomerGetAll.ts
import { z as z3 } from "zod";
var CustomerType = /* @__PURE__ */ ((CustomerType2) => {
  CustomerType2["COMPANY"] = "COMPANY";
  CustomerType2["INDIVIDUAL"] = "INDIVIDUAL";
  return CustomerType2;
})(CustomerType || {});
var CustomerGetAllSchema = z3.object({
  type: z3.nativeEnum(CustomerType).optional(),
  isBeneficiary: z3.boolean().optional(),
  query: z3.string().optional(),
  page: z3.coerce.number()
});
var CustomerSchema = z3.object({
  id: z3.string(),
  name: z3.string(),
  email: z3.string(),
  document: z3.string(),
  type: z3.nativeEnum(CustomerType),
  isBeneficiary: z3.boolean(),
  addressStreet: z3.string(),
  addressNumber: z3.string(),
  addressNeighborhood: z3.string(),
  addressCity: z3.string(),
  addressState: z3.string(),
  addressPostalCode: z3.string(),
  addressCountryCode: z3.string(),
  createdAt: z3.string()
});
var CustomerGetAllResponseSchema = z3.object({
  customers: z3.array(CustomerSchema),
  total: z3.number(),
  totalPages: z3.number(),
  currentPage: z3.number(),
  hasMore: z3.boolean()
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
    return this.get("/all", {
      params
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
    this.client = axios.create({
      baseURL: this.options.baseUrl || "https://api.contabull.com",
      timeout: this.options.timeout
    });
    this.authorization = new Authorization(this.client);
    this.accounts = new Accounts(this.client);
    this.charges = new Charges(this.client);
    this.customers = new Customers(this.client);
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
  ChargeStatus,
  Charges,
  Contabull,
  Currency,
  PaymentStatus,
  TransactionType,
  Transactions
};
