// Common types used across the SDK

export interface ApiError {
  status: number
  message: string
  data: any
  originalError: any
}

export interface PaginationParams {
  page?: number
  limit?: number
  sort?: string
  order?: "asc" | "desc"
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export enum Currency { BRL = 'BRL', USD = 'USD', EUR = 'EUR' }

export enum ChargeStatus {
  CREATED = 'CREATED',
  CREATED_WAITING = 'CREATED_WAITING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED'
}