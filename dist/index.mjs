// src/sdk.ts
import axios from "axios";
import jwt from "jsonwebtoken";
import SHA256 from "crypto-js/sha256";

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
var AuthorizationResource = class extends BaseResource {
  constructor(client) {
    super(client, "/try");
  }
  /**
   * Try API Authorization
   */
  async try() {
    return this.get("");
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
    this.authorization = new AuthorizationResource(this.client);
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
  async request(config) {
    const response = await this.client.request(config);
    return response.data;
  }
};
export {
  AuthorizationResource,
  Contabull
};
