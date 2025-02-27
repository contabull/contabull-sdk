import { AxiosInstance, AxiosRequestConfig } from 'axios';

declare abstract class BaseResource {
    protected client: AxiosInstance;
    protected basePath: string;
    constructor(client: AxiosInstance, basePath: string);
    protected get<T>(path: string, params?: Record<string, any>): Promise<T>;
    protected post<T>(path: string, data?: any): Promise<T>;
    protected put<T>(path: string, data?: any): Promise<T>;
    protected patch<T>(path: string, data?: any): Promise<T>;
    protected delete<T>(path: string): Promise<T>;
}

interface ApiError {
    status: number;
    message: string;
    data: any;
    originalError: any;
}
interface PaginationParams {
    page?: number;
    limit?: number;
    sort?: string;
    order?: "asc" | "desc";
}
interface PaginatedResponse<T> {
    data: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

interface AuthorizationTrialReturn {
    message: string;
}
declare class AuthorizationResource extends BaseResource {
    constructor(client: AxiosInstance);
    /**
     * Try API Authorization
     */
    try(): Promise<PaginatedResponse<AuthorizationTrialReturn>>;
}

interface ContabullOptions {
    baseUrl: string;
    apiKey: string;
    privateKey: string;
    timeout?: number;
}
declare class Contabull {
    private client;
    private options;
    authorization: AuthorizationResource;
    constructor(options: ContabullOptions);
    private signRequest;
    request<T>(config: AxiosRequestConfig): Promise<T>;
}

export { ApiError, AuthorizationResource, Contabull, ContabullOptions, PaginatedResponse, PaginationParams };
