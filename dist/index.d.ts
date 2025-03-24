import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { z } from 'zod';

declare const AccountGetAllResponseSchema: z.ZodObject<{
    label: z.ZodString;
    balance: z.ZodObject<{
        availableBalance: z.ZodNumber;
        pendingBalance: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        availableBalance: number;
        pendingBalance: number;
    }, {
        availableBalance: number;
        pendingBalance: number;
    }>;
    number: z.ZodString;
    bankProvider: z.ZodString;
}, "strip", z.ZodTypeAny, {
    number: string;
    label: string;
    balance: {
        availableBalance: number;
        pendingBalance: number;
    };
    bankProvider: string;
}, {
    number: string;
    label: string;
    balance: {
        availableBalance: number;
        pendingBalance: number;
    };
    bankProvider: string;
}>;
type AccountGetAllResponseDto = z.infer<typeof AccountGetAllResponseSchema>;

declare abstract class BaseResource {
    protected client: AxiosInstance;
    protected basePath: string;
    constructor(client: AxiosInstance, basePath: string);
    protected get<T>(path: string, config?: AxiosRequestConfig): Promise<T>;
    protected post<T>(path: string, data?: any): Promise<T>;
    protected put<T>(path: string, data?: any): Promise<T>;
    protected patch<T>(path: string, data?: any): Promise<T>;
    protected delete<T>(path: string): Promise<T>;
}

declare class Accounts extends BaseResource {
    constructor(client: AxiosInstance);
    /**
     * Get all accounts
     */
    getAll(): Promise<AccountGetAllResponseDto>;
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

interface ChargeCancelResponseDto {
    success: boolean;
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
declare enum PaymentStatus {
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
    cancelled = "cancelled"
}
declare enum TransactionType {
    inbound = "inbound",
    outbound = "outbound",
    refund = "refund"
}

declare const ChargeCreateSchema: z.ZodObject<{
    account: z.ZodString;
    amountCents: z.ZodNumber;
    currency: z.ZodNativeEnum<typeof Currency>;
    methods: z.ZodArray<z.ZodEnum<["boleto", "pix"]>, "many">;
    externalId: z.ZodOptional<z.ZodString>;
    customer: z.ZodObject<{
        name: z.ZodString;
        document: z.ZodString;
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
        document: string;
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
        document: string;
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
    amountCents: number;
    currency: Currency;
    methods: ("boleto" | "pix")[];
    customer: {
        type: "individual" | "company";
        name: string;
        document: string;
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
    externalId?: string | undefined;
    taxes?: {
        fine?: number | undefined;
        interest?: number | undefined;
    } | undefined;
    dueAt?: string | undefined;
    expiredAt?: string | undefined;
}, {
    account: string;
    amountCents: number;
    currency: Currency;
    methods: ("boleto" | "pix")[];
    customer: {
        type: "individual" | "company";
        name: string;
        document: string;
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

declare const ChargeGetAllSchema: z.ZodObject<{
    account: z.ZodString;
    status: z.ZodOptional<z.ZodEnum<["ALL", ...ChargeStatus[]]>>;
    query: z.ZodOptional<z.ZodString>;
    from: z.ZodOptional<z.ZodDate>;
    to: z.ZodOptional<z.ZodDate>;
    page: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    account: string;
    page: number;
    status?: "ALL" | ChargeStatus | undefined;
    query?: string | undefined;
    from?: Date | undefined;
    to?: Date | undefined;
}, {
    account: string;
    page: number;
    status?: "ALL" | ChargeStatus | undefined;
    query?: string | undefined;
    from?: Date | undefined;
    to?: Date | undefined;
}>;
declare const ChargeGetAllResponseSchema: z.ZodObject<{
    charges: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        externalId: z.ZodString;
        customer: z.ZodObject<{
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
        }, {
            name: string;
        }>;
        transactionId: z.ZodString;
        paymentMethods: z.ZodArray<z.ZodString, "many">;
        amount: z.ZodNumber;
        taxFine: z.ZodNumber;
        taxInterest: z.ZodNumber;
        status: z.ZodNativeEnum<typeof ChargeStatus>;
        dueAt: z.ZodDate;
        expiredAt: z.ZodDate;
        createdAt: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        status: ChargeStatus;
        externalId: string;
        customer: {
            name: string;
        };
        dueAt: Date;
        expiredAt: Date;
        id: string;
        transactionId: string;
        paymentMethods: string[];
        amount: number;
        taxFine: number;
        taxInterest: number;
        createdAt: Date;
    }, {
        status: ChargeStatus;
        externalId: string;
        customer: {
            name: string;
        };
        dueAt: Date;
        expiredAt: Date;
        id: string;
        transactionId: string;
        paymentMethods: string[];
        amount: number;
        taxFine: number;
        taxInterest: number;
        createdAt: Date;
    }>, "many">;
    total: z.ZodNumber;
    page: z.ZodNumber;
    totalPages: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    page: number;
    charges: {
        status: ChargeStatus;
        externalId: string;
        customer: {
            name: string;
        };
        dueAt: Date;
        expiredAt: Date;
        id: string;
        transactionId: string;
        paymentMethods: string[];
        amount: number;
        taxFine: number;
        taxInterest: number;
        createdAt: Date;
    }[];
    total: number;
    totalPages: number;
}, {
    page: number;
    charges: {
        status: ChargeStatus;
        externalId: string;
        customer: {
            name: string;
        };
        dueAt: Date;
        expiredAt: Date;
        id: string;
        transactionId: string;
        paymentMethods: string[];
        amount: number;
        taxFine: number;
        taxInterest: number;
        createdAt: Date;
    }[];
    total: number;
    totalPages: number;
}>;
type ChargeGetAllDto = z.infer<typeof ChargeGetAllSchema>;
type ChargeGetAllResponseDto = z.infer<typeof ChargeGetAllResponseSchema>;

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
    create(data: ChargeCreateDto, sourceKey?: string): Promise<ChargeCreateResponseDto>;
    /**
     * Get a charge
     */
    getOne(id: string): Promise<ChargeGetResponseDto>;
    /**
     * Get all charges
     */
    getAll(params: ChargeGetAllDto): Promise<ChargeGetAllResponseDto>;
    /**
     * Download the charge's PDF as array buffer
     */
    downloadPdfAsBuffer(id: string): Promise<Buffer>;
    /**
     * Cancel a charge
     */
    cancel(id: string): Promise<ChargeCancelResponseDto>;
}

declare const TransactionGetAllSchema: z.ZodObject<{
    account: z.ZodOptional<z.ZodString>;
    type: z.ZodEnum<[TransactionType.inbound, TransactionType.outbound, "all"]>;
    from: z.ZodOptional<z.ZodDate>;
    to: z.ZodOptional<z.ZodDate>;
    page: z.ZodNumber;
    status: z.ZodEnum<[PaymentStatus.succeeded, PaymentStatus.incomplete, PaymentStatus.failed, PaymentStatus.refunded, PaymentStatus.created, "all"]>;
}, "strip", z.ZodTypeAny, {
    type: TransactionType.inbound | TransactionType.outbound | "all";
    status: "all" | PaymentStatus.created | PaymentStatus.succeeded | PaymentStatus.failed | PaymentStatus.refunded | PaymentStatus.incomplete;
    page: number;
    account?: string | undefined;
    from?: Date | undefined;
    to?: Date | undefined;
}, {
    type: TransactionType.inbound | TransactionType.outbound | "all";
    status: "all" | PaymentStatus.created | PaymentStatus.succeeded | PaymentStatus.failed | PaymentStatus.refunded | PaymentStatus.incomplete;
    page: number;
    account?: string | undefined;
    from?: Date | undefined;
    to?: Date | undefined;
}>;
declare const TransactionGetAllResponseSchema: z.ZodObject<{
    transactions: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        customer: z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            cpfCnpj: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: string;
            email: string;
            cpfCnpj: string;
        }, {
            name: string;
            id: string;
            email: string;
            cpfCnpj: string;
        }>;
        payerName: z.ZodString;
        payerCpfCnpj: z.ZodString;
        description: z.ZodString;
        e2eID: z.ZodString;
        status: z.ZodNativeEnum<typeof PaymentStatus>;
        method: z.ZodString;
        type: z.ZodNativeEnum<typeof TransactionType>;
        currency: z.ZodNativeEnum<typeof Currency>;
        bankAccountId: z.ZodString;
        fees: z.ZodNumber;
        disputed: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        type: TransactionType;
        status: PaymentStatus;
        disputed: boolean;
        currency: Currency;
        customer: {
            name: string;
            id: string;
            email: string;
            cpfCnpj: string;
        };
        id: string;
        amount: number;
        payerName: string;
        payerCpfCnpj: string;
        description: string;
        e2eID: string;
        method: string;
        bankAccountId: string;
        fees: number;
    }, {
        type: TransactionType;
        status: PaymentStatus;
        disputed: boolean;
        currency: Currency;
        customer: {
            name: string;
            id: string;
            email: string;
            cpfCnpj: string;
        };
        id: string;
        amount: number;
        payerName: string;
        payerCpfCnpj: string;
        description: string;
        e2eID: string;
        method: string;
        bankAccountId: string;
        fees: number;
    }>, "many">;
    total: z.ZodNumber;
    totalPages: z.ZodNumber;
    currentPage: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    total: number;
    totalPages: number;
    transactions: {
        type: TransactionType;
        status: PaymentStatus;
        disputed: boolean;
        currency: Currency;
        customer: {
            name: string;
            id: string;
            email: string;
            cpfCnpj: string;
        };
        id: string;
        amount: number;
        payerName: string;
        payerCpfCnpj: string;
        description: string;
        e2eID: string;
        method: string;
        bankAccountId: string;
        fees: number;
    }[];
    currentPage: number;
}, {
    total: number;
    totalPages: number;
    transactions: {
        type: TransactionType;
        status: PaymentStatus;
        disputed: boolean;
        currency: Currency;
        customer: {
            name: string;
            id: string;
            email: string;
            cpfCnpj: string;
        };
        id: string;
        amount: number;
        payerName: string;
        payerCpfCnpj: string;
        description: string;
        e2eID: string;
        method: string;
        bankAccountId: string;
        fees: number;
    }[];
    currentPage: number;
}>;
type TransactionGetAllDto = z.infer<typeof TransactionGetAllSchema>;
type TransactionGetAllResponseDto = z.infer<typeof TransactionGetAllResponseSchema>;

declare class Transactions extends BaseResource {
    constructor(client: AxiosInstance);
    /**
     * Get all transactions
     */
    getAll(params: TransactionGetAllDto): Promise<TransactionGetAllResponseDto>;
}

declare enum CustomerType {
    COMPANY = 0,
    INDIVIDUAL = 1
}
declare const CustomerGetAllSchema: z.ZodObject<{
    type: z.ZodOptional<z.ZodNativeEnum<typeof CustomerType>>;
    isBeneficiary: z.ZodOptional<z.ZodBoolean>;
    query: z.ZodOptional<z.ZodString>;
    page: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    page: number;
    type?: CustomerType | undefined;
    query?: string | undefined;
    isBeneficiary?: boolean | undefined;
}, {
    page: number;
    type?: CustomerType | undefined;
    query?: string | undefined;
    isBeneficiary?: boolean | undefined;
}>;
declare const CustomerGetAllResponseSchema: z.ZodObject<{
    customers: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        document: z.ZodString;
        type: z.ZodNativeEnum<typeof CustomerType>;
        isBeneficiary: z.ZodBoolean;
        addressStreet: z.ZodString;
        addressNumber: z.ZodString;
        addressNeighborhood: z.ZodString;
        addressCity: z.ZodString;
        addressState: z.ZodString;
        addressPostalCode: z.ZodString;
        addressCountryCode: z.ZodString;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: CustomerType;
        name: string;
        document: string;
        id: string;
        createdAt: string;
        email: string;
        isBeneficiary: boolean;
        addressStreet: string;
        addressNumber: string;
        addressNeighborhood: string;
        addressCity: string;
        addressState: string;
        addressPostalCode: string;
        addressCountryCode: string;
    }, {
        type: CustomerType;
        name: string;
        document: string;
        id: string;
        createdAt: string;
        email: string;
        isBeneficiary: boolean;
        addressStreet: string;
        addressNumber: string;
        addressNeighborhood: string;
        addressCity: string;
        addressState: string;
        addressPostalCode: string;
        addressCountryCode: string;
    }>, "many">;
    total: z.ZodNumber;
    totalPages: z.ZodNumber;
    currentPage: z.ZodNumber;
    hasMore: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    total: number;
    totalPages: number;
    currentPage: number;
    customers: {
        type: CustomerType;
        name: string;
        document: string;
        id: string;
        createdAt: string;
        email: string;
        isBeneficiary: boolean;
        addressStreet: string;
        addressNumber: string;
        addressNeighborhood: string;
        addressCity: string;
        addressState: string;
        addressPostalCode: string;
        addressCountryCode: string;
    }[];
    hasMore: boolean;
}, {
    total: number;
    totalPages: number;
    currentPage: number;
    customers: {
        type: CustomerType;
        name: string;
        document: string;
        id: string;
        createdAt: string;
        email: string;
        isBeneficiary: boolean;
        addressStreet: string;
        addressNumber: string;
        addressNeighborhood: string;
        addressCity: string;
        addressState: string;
        addressPostalCode: string;
        addressCountryCode: string;
    }[];
    hasMore: boolean;
}>;
type CustomerGetAllDto = z.infer<typeof CustomerGetAllSchema>;
type CustomerGetAllResponseDto = z.infer<typeof CustomerGetAllResponseSchema>;

declare class Customers extends BaseResource {
    constructor(client: AxiosInstance);
    /**
     * Get all customers
     */
    getAll(params: CustomerGetAllDto): Promise<CustomerGetAllResponseDto>;
}

interface ContabullOptions {
    apiKey: string;
    privateKey: string;
    baseUrl?: string;
    timeout?: number;
}
declare class Contabull {
    private client;
    private options;
    authorization: Authorization;
    accounts: Accounts;
    charges: Charges;
    customers: Customers;
    transactions: Transactions;
    constructor(options: ContabullOptions);
    request<T>(config: AxiosRequestConfig): Promise<T>;
    private signRequest;
}

export { Accounts, ApiError, Authorization, ChargeStatus, Charges, Contabull, ContabullOptions, Currency, PaginatedResponse, PaginationParams, PaymentStatus, TransactionType, Transactions };
