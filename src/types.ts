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
