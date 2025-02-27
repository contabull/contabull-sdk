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
  Contabull: () => Contabull,
  ProductsResource: () => ProductsResource,
  UsersResource: () => UsersResource
});
module.exports = __toCommonJS(src_exports);

// src/sdk.ts
var import_axios = __toESM(require("axios"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_sha256 = __toESM(require("crypto-js/sha256"));

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

// src/resources/users.ts
var UsersResource = class extends BaseResource {
  constructor(client) {
    super(client, "/users");
  }
  /**
   * Get a list of users
   */
  async getAll(params) {
    return this.get("", params);
  }
  /**
   * Get a user by ID
   */
  async getById(id) {
    return this.get(`/${id}`);
  }
  /**
   * Create a new user
   */
  async create(data) {
    return this.post("", data);
  }
  /**
   * Update a user
   */
  async update(id, data) {
    return this.patch(`/${id}`, data);
  }
};

// src/resources/products.ts
var ProductsResource = class extends BaseResource {
  constructor(client) {
    super(client, "/products");
  }
  /**
   * Get a list of products
   */
  async getAll(params) {
    return this.get("", params);
  }
  /**
   * Get a product by ID
   */
  async getById(id) {
    return this.get(`/${id}`);
  }
  /**
   * Create a new product
   */
  async create(data) {
    return this.post("", data);
  }
  /**
   * Update a product
   */
  async update(id, data) {
    return this.patch(`/${id}`, data);
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
    this.users = new UsersResource(this.client);
    this.products = new ProductsResource(this.client);
    this.client.interceptors.request.use(
      async (config) => this.signRequest(config),
      (error) => {
        return Promise.reject(error);
      }
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
    const signedJwt = import_jsonwebtoken.default.sign(jwtPayload, this.options.privateKey, { algorithm: "RS256" });
    config.headers = config.headers || {};
    config.headers["X-API-KEY"] = this.options.apiKey;
    config.headers["Authorization"] = `Bearer ${signedJwt}`;
    return config;
  }
  async request(config) {
    const response = await this.client.request(config);
    return response.data;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Contabull,
  ProductsResource,
  UsersResource
});
