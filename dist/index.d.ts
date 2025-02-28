import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { z } from 'zod';

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

interface AuthorizationTrialReturn {
    message: string;
}
declare class Authorization extends BaseResource {
    constructor(client: AxiosInstance);
    /**
     * Try API Authorization
     */
    try(): Promise<AuthorizationTrialReturn>;
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
declare enum Currency {
    BRL = "BRL",
    USD = "USD",
    EUR = "EUR"
}

declare const ChargeCreateSchemaDto: z.ZodObject<{
    account: z.ZodString;
    amount: z.ZodNumber;
    currency: z.ZodNativeEnum<typeof Currency>;
    externalId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    account: string;
    amount: number;
    currency: Currency;
    externalId?: string | undefined;
}, {
    account: string;
    amount: number;
    currency: Currency;
    externalId?: string | undefined;
}>;
type ChargeCreateDto = z.infer<typeof ChargeCreateSchemaDto>;
interface CreateChargeReturn {
    message: string;
}
declare class Charges extends BaseResource {
    constructor(client: AxiosInstance);
    /**
     * Create a new charge
     */
    create(data: ChargeCreateDto): Promise<CreateChargeReturn>;
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
    authorization: Authorization;
    charges: Charges;
    constructor(options: ContabullOptions);
    request<T>(config: AxiosRequestConfig): Promise<T>;
    private signRequest;
}

export { ApiError, Authorization, Contabull, ContabullOptions, Currency, PaginatedResponse, PaginationParams };
