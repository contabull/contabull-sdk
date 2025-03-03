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
declare enum ChargeStatus {
    CREATED = "CREATED",
    CREATED_WAITING = "CREATED_WAITING",
    PAID = "PAID",
    CANCELLED = "CANCELLED"
}

declare const ChargeCreateSchema: z.ZodObject<{
    account: z.ZodString;
    document: z.ZodOptional<z.ZodString>;
    amount: z.ZodNumber;
    currency: z.ZodNativeEnum<typeof Currency>;
    externalId: z.ZodOptional<z.ZodString>;
    customer: z.ZodObject<{
        name: z.ZodString;
        cpfCnpj: z.ZodString;
        type: z.ZodEnum<["individual", "company"]>;
        address: z.ZodOptional<z.ZodObject<{
            street: z.ZodString;
            number: z.ZodString;
            postalCode: z.ZodString;
            complement: z.ZodOptional<z.ZodString>;
            neighborhood: z.ZodOptional<z.ZodString>;
            city: z.ZodString;
            countryCode: z.ZodString;
            state: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            number: string;
            street: string;
            postalCode: string;
            city: string;
            countryCode: string;
            complement?: string | undefined;
            neighborhood?: string | undefined;
            state?: string | undefined;
        }, {
            number: string;
            street: string;
            postalCode: string;
            city: string;
            countryCode: string;
            complement?: string | undefined;
            neighborhood?: string | undefined;
            state?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "individual" | "company";
        name: string;
        cpfCnpj: string;
        address?: {
            number: string;
            street: string;
            postalCode: string;
            city: string;
            countryCode: string;
            complement?: string | undefined;
            neighborhood?: string | undefined;
            state?: string | undefined;
        } | undefined;
    }, {
        type: "individual" | "company";
        name: string;
        cpfCnpj: string;
        address?: {
            number: string;
            street: string;
            postalCode: string;
            city: string;
            countryCode: string;
            complement?: string | undefined;
            neighborhood?: string | undefined;
            state?: string | undefined;
        } | undefined;
    }>;
    taxes: z.ZodOptional<z.ZodObject<{
        fine: z.ZodOptional<z.ZodNumber>;
        interest: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        fine?: number | undefined;
        interest?: number | undefined;
    }, {
        fine?: number | undefined;
        interest?: number | undefined;
    }>>;
    dueAt: z.ZodOptional<z.ZodString>;
    expiredAt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    account: string;
    amount: number;
    currency: Currency;
    customer: {
        type: "individual" | "company";
        name: string;
        cpfCnpj: string;
        address?: {
            number: string;
            street: string;
            postalCode: string;
            city: string;
            countryCode: string;
            complement?: string | undefined;
            neighborhood?: string | undefined;
            state?: string | undefined;
        } | undefined;
    };
    document?: string | undefined;
    externalId?: string | undefined;
    taxes?: {
        fine?: number | undefined;
        interest?: number | undefined;
    } | undefined;
    dueAt?: string | undefined;
    expiredAt?: string | undefined;
}, {
    account: string;
    amount: number;
    currency: Currency;
    customer: {
        type: "individual" | "company";
        name: string;
        cpfCnpj: string;
        address?: {
            number: string;
            street: string;
            postalCode: string;
            city: string;
            countryCode: string;
            complement?: string | undefined;
            neighborhood?: string | undefined;
            state?: string | undefined;
        } | undefined;
    };
    document?: string | undefined;
    externalId?: string | undefined;
    taxes?: {
        fine?: number | undefined;
        interest?: number | undefined;
    } | undefined;
    dueAt?: string | undefined;
    expiredAt?: string | undefined;
}>;
declare const ChargeCreateResponseSchema: z.ZodObject<{
    id: z.ZodString;
    success: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    id: string;
    success: boolean;
}, {
    id: string;
    success: boolean;
}>;
type ChargeCreateDto = z.infer<typeof ChargeCreateSchema>;
type ChargeCreateResponseDto = z.infer<typeof ChargeCreateResponseSchema>;

declare const ChargeGetSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
type ChargeGetDto = z.infer<typeof ChargeGetSchema>;
declare const ChargeGetResponseSchema: z.ZodObject<{
    status: z.ZodNativeEnum<typeof ChargeStatus>;
    boleto: z.ZodOptional<z.ZodObject<{
        barCode: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        barCode: string;
    }, {
        barCode: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    status: ChargeStatus;
    boleto?: {
        barCode: string;
    } | undefined;
}, {
    status: ChargeStatus;
    boleto?: {
        barCode: string;
    } | undefined;
}>;
type ChargeGetResponseDto = z.infer<typeof ChargeGetResponseSchema>;

declare class Charges extends BaseResource {
    constructor(client: AxiosInstance);
    /**
     * Create a new charge
     */
    create(data: ChargeCreateDto): Promise<ChargeCreateResponseDto>;
    /**
     * Get a charge
     */
    getOne(data: ChargeGetDto): Promise<ChargeGetResponseDto>;
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

export { ApiError, Authorization, ChargeStatus, Contabull, ContabullOptions, Currency, PaginatedResponse, PaginationParams };
