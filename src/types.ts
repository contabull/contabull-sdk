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

// Add more common types as needed

