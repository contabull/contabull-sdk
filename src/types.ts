// Common types used across the SDK

export interface ApiError {
  status: number;
  message: string;
  data: any;
  originalError: any;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export enum Currency {
  BRL = "BRL",
  USD = "USD",
  EUR = "EUR",
}

export enum ChargeStatus {
  CREATED = "CREATED",
  CREATED_WAITING = "CREATED_WAITING",
  PAID = "PAID",
  CANCELLED = "CANCELLED",
}

export enum PaymentStatus {
  created = "created",
  emv_generated = "emv_generated",
  payer_viewed = "payer_viewed",
  succeeded = "succeeded",
  failed = "failed",
  disputed = "disputed",
  processing_refund = "processing_refund",
  processing = "processing",
  refunded = "refunded",
  incomplete = "incomplete",
  refund_failed = "refund_failed",
  cancelled = "cancelled",
}

export enum TransactionType {
  inbound = "inbound",
  outbound = "outbound",
  refund = "refund",
}

export enum AvailableLanguages {
  en = "en",
  pt = "pt",
  zh = "zh",
}

export enum CustomerType {
  COMPANY = "COMPANY",
  INDIVIDUAL = "INDIVIDUAL",
}

export enum CryptoNetwork {
  ethereum = "ethereum",
  tron = "tron",
  polygon = "polygon",
  binance = "binance",
  solana = "solana",
}

export enum CryptoOtcSettlementSchedule {
  instant = "instant",
  d0d0 = "d0d0",
  d1d1 = "d1d1",
  d2d2 = "d2d2",
}

export enum CryptoSymbol {
  usdt = "usdt",
  usdc = "usdc",
  trx = "trx",
  eth = "eth",
}

export enum CryptoOtcTransactionStatus {
  fulfilled = "fulfilled",
  fulfilling = "fulfilling",
  pending_payment = "pending_payment",
  pending_fulfillment = "pending_fulfillment",
  fulfillment_scheduled = "fulfillment_scheduled",
}