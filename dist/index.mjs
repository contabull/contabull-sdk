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
  async get(path, params) {
    const response = await this.client.get(`${this.basePath}${path}`, { params });
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

// src/resources/charges.ts
import { z } from "zod";

// src/types.ts
var Currency = /* @__PURE__ */ ((Currency2) => {
  Currency2["BRL"] = "BRL";
  Currency2["USD"] = "USD";
  Currency2["EUR"] = "EUR";
  return Currency2;
})(Currency || {});

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
var ChargeCreateSchemaDto = z.object({
  account: z.string(),
  amount: z.number().positive(),
  currency: z.nativeEnum(Currency),
  externalId: z.string().optional()
});
var Charges = class extends BaseResource {
  constructor(client) {
    super(client, "/charges");
  }
  /**
   * Create a new charge
   */
  async create(data) {
    await validateOrThrow(ChargeCreateSchemaDto, data);
    return this.post("/create", data);
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
      baseURL: this.options.baseUrl,
      timeout: this.options.timeout
    });
    this.authorization = new Authorization(this.client);
    this.charges = new Charges(this.client);
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
    const signedJwt = jwt.sign(jwtPayload, this.options.privateKey, { algorithm: "RS256" });
    config.headers = config.headers || {};
    config.headers["X-API-KEY"] = this.options.apiKey;
    config.headers["Authorization"] = `Bearer ${signedJwt}`;
    return config;
  }
};
export {
  Authorization,
  Contabull,
  Currency
};
