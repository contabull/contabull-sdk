import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import SHA256 from "crypto-js/sha256";
import jwt from "jsonwebtoken";
import { Accounts, Authorization, Charges, Transactions } from "./resources";
import type { ApiError } from "./types";

export interface ContabullOptions {
  apiKey: string;
  privateKey: string;
  baseUrl?: string;
  timeout?: number;
}

export class Contabull {
  private client: AxiosInstance;
  private options: ContabullOptions;

  public authorization: Authorization;

  public accounts: Accounts;
  public charges: Charges;
  public transactions: Transactions;

  constructor(options: ContabullOptions) {
    this.options = {
      timeout: 10000,
      ...options,
    };

    this.client = axios.create({
      baseURL: this.options.baseUrl || "https://api.contabull.com",
      timeout: this.options.timeout,
    });

    this.authorization = new Authorization(this.client);

    this.accounts = new Accounts(this.client);
    this.charges = new Charges(this.client);
    this.transactions = new Transactions(this.client);
    this.client.interceptors.request.use(
      async (config) => this.signRequest(config),
      (error: any) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response: any) => response,
      (error: any) => {
        const apiError: ApiError = {
          status: error.response?.status || 0,
          message: error.response?.data?.message || error.message,
          data: error.response?.data || null,
          originalError: error,
        };
        return Promise.reject(apiError);
      }
    );
  }

  async request<T>(config: AxiosRequestConfig): Promise<T> {
    const response = await this.client.request<T>(config);

    return response.data;
  }

  private async signRequest(config: AxiosRequestConfig): Promise<any> {
    const url = new URL(config.url!, this.options.baseUrl);
    const path = url.pathname + url.search;

    const body = config.data ? JSON.stringify(config.data) : "{}";
    const bodyHash = SHA256(body).toString();

    const now = Math.floor(Date.now() / 1000);
    const jwtPayload = {
      uri: path,
      iat: now,
      exp: now + 55,
      sub: this.options.apiKey,
      bodyHash: bodyHash,
    };

    const signedJwt = jwt.sign(jwtPayload, this.options.privateKey, {
      algorithm: "RS256",
    });

    config.headers = config.headers || {};
    config.headers["X-API-KEY"] = this.options.apiKey;
    config.headers["Authorization"] = `Bearer ${signedJwt}`;

    return config;
  }
}
