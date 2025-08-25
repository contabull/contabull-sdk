import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { z } from 'zod';

declare const AccountGetAllOutputSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    label: z.ZodEffects<z.ZodNullable<z.ZodString>, string, string | null>;
    balance: z.ZodObject<{
        availableBalanceCents: z.ZodNumber;
        pendingBalanceCents: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        availableBalanceCents: number;
        pendingBalanceCents: number;
    }, {
        availableBalanceCents: number;
        pendingBalanceCents: number;
    }>;
    number: z.ZodString;
    bankProvider: z.ZodString;
    ispb: z.ZodEffects<z.ZodNullable<z.ZodString>, string, string | null>;
    agency: z.ZodEffects<z.ZodNullable<z.ZodString>, string, string | null>;
}, "strip", z.ZodTypeAny, {
    number: string;
    id: string;
    label: string;
    balance: {
        availableBalanceCents: number;
        pendingBalanceCents: number;
    };
    bankProvider: string;
    ispb: string;
    agency: string;
}, {
    number: string;
    id: string;
    label: string | null;
    balance: {
        availableBalanceCents: number;
        pendingBalanceCents: number;
    };
    bankProvider: string;
    ispb: string | null;
    agency: string | null;
}>, "many">;
type AccountGetAllOutputDto = z.infer<typeof AccountGetAllOutputSchema>;

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
    getAll(): Promise<AccountGetAllOutputDto>;
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
declare enum AvailableLanguages {
    en = "en",
    pt = "pt",
    zh = "zh"
}
declare enum CustomerType {
    COMPANY = "COMPANY",
    INDIVIDUAL = "INDIVIDUAL"
}
declare enum CryptoNetwork {
    ethereum = "ethereum",
    tron = "tron",
    polygon = "polygon",
    binance = "binance",
    solana = "solana"
}
declare enum CryptoOtcSettlementSchedule {
    instant = "instant",
    d0d0 = "d0d0",
    d1d1 = "d1d1",
    d2d2 = "d2d2"
}
declare enum CryptoSymbol {
    usdt = "usdt",
    usdc = "usdc",
    trx = "trx",
    eth = "eth"
}
declare enum CryptoOtcTransactionStatus {
    fulfilled = "fulfilled",
    fulfilling = "fulfilling",
    pending_payment = "pending_payment",
    pending_fulfillment = "pending_fulfillment",
    fulfillment_scheduled = "fulfillment_scheduled"
}
declare enum TransferMethod {
    PIX_KEY = "pix-key",
    PIX_EMV = "pix-emv",
    PIX_ACCOUNT = "pix-account",
    TED = "ted",
    SAME_BANK = "same-bank",
    SAME_COMPANY = "same-company"
}
declare enum BeneficiaryAccountType {
    CHECKING = "checking",
    SAVINGS = "savings",
    PAYMENT = "payment",
    SALARY = "salary"
}

declare const ChargeCreateSchema: z.ZodObject<{
    accountId: z.ZodString;
    amountCents: z.ZodNumber;
    currency: z.ZodNativeEnum<typeof Currency>;
    externalId: z.ZodOptional<z.ZodString>;
    sourceKey: z.ZodOptional<z.ZodString>;
    methods: z.ZodArray<z.ZodEnum<["boleto", "pix"]>, "many">;
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
    accountId: string;
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
    sourceKey?: string | undefined;
    taxes?: {
        fine?: number | undefined;
        interest?: number | undefined;
    } | undefined;
    dueAt?: string | undefined;
    expiredAt?: string | undefined;
}, {
    accountId: string;
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
    sourceKey?: string | undefined;
    taxes?: {
        fine?: number | undefined;
        interest?: number | undefined;
    } | undefined;
    dueAt?: string | undefined;
    expiredAt?: string | undefined;
}>;
declare const ChargeCreateResponseSchema: z.ZodObject<{
    id: z.ZodString;
    boleto: z.ZodOptional<z.ZodObject<{
        success: z.ZodBoolean;
        status: z.ZodNativeEnum<typeof ChargeStatus>;
    }, "strip", z.ZodTypeAny, {
        status: ChargeStatus;
        success: boolean;
    }, {
        status: ChargeStatus;
        success: boolean;
    }>>;
    pix: z.ZodOptional<z.ZodObject<{
        success: z.ZodBoolean;
        emv: z.ZodString;
        status: z.ZodNativeEnum<typeof ChargeStatus>;
    }, "strip", z.ZodTypeAny, {
        status: ChargeStatus;
        success: boolean;
        emv: string;
    }, {
        status: ChargeStatus;
        success: boolean;
        emv: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    boleto?: {
        status: ChargeStatus;
        success: boolean;
    } | undefined;
    pix?: {
        status: ChargeStatus;
        success: boolean;
        emv: string;
    } | undefined;
}, {
    id: string;
    boleto?: {
        status: ChargeStatus;
        success: boolean;
    } | undefined;
    pix?: {
        status: ChargeStatus;
        success: boolean;
        emv: string;
    } | undefined;
}>;
type ChargeCreateDto = z.infer<typeof ChargeCreateSchema>;
type ChargeCreateResponseDto = z.infer<typeof ChargeCreateResponseSchema>;

declare const ChargeDownloadSchema: z.ZodObject<{
    id: z.ZodString;
    language: z.ZodDefault<z.ZodOptional<z.ZodNativeEnum<typeof AvailableLanguages>>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    language: AvailableLanguages;
}, {
    id: string;
    language?: AvailableLanguages | undefined;
}>;
type ChargeDownloadDto = z.infer<typeof ChargeDownloadSchema>;

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
    status?: ChargeStatus | "ALL" | undefined;
    query?: string | undefined;
    from?: Date | undefined;
    to?: Date | undefined;
}, {
    account: string;
    page: number;
    status?: ChargeStatus | "ALL" | undefined;
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
        amountCents: z.ZodNumber;
        taxFine: z.ZodNumber;
        taxInterest: z.ZodNumber;
        status: z.ZodNativeEnum<typeof ChargeStatus>;
        dueAt: z.ZodDate;
        expiredAt: z.ZodDate;
        createdAt: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        id: string;
        status: ChargeStatus;
        amountCents: number;
        externalId: string;
        customer: {
            name: string;
        };
        dueAt: Date;
        expiredAt: Date;
        transactionId: string;
        paymentMethods: string[];
        taxFine: number;
        taxInterest: number;
        createdAt: Date;
    }, {
        id: string;
        status: ChargeStatus;
        amountCents: number;
        externalId: string;
        customer: {
            name: string;
        };
        dueAt: Date;
        expiredAt: Date;
        transactionId: string;
        paymentMethods: string[];
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
        id: string;
        status: ChargeStatus;
        amountCents: number;
        externalId: string;
        customer: {
            name: string;
        };
        dueAt: Date;
        expiredAt: Date;
        transactionId: string;
        paymentMethods: string[];
        taxFine: number;
        taxInterest: number;
        createdAt: Date;
    }[];
    total: number;
    totalPages: number;
}, {
    page: number;
    charges: {
        id: string;
        status: ChargeStatus;
        amountCents: number;
        externalId: string;
        customer: {
            name: string;
        };
        dueAt: Date;
        expiredAt: Date;
        transactionId: string;
        paymentMethods: string[];
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
        status: z.ZodNativeEnum<typeof ChargeStatus>;
    }, "strip", z.ZodTypeAny, {
        status: ChargeStatus;
        barCode: string;
    }, {
        status: ChargeStatus;
        barCode: string;
    }>>;
    pix: z.ZodOptional<z.ZodObject<{
        emv: z.ZodString;
        status: z.ZodNativeEnum<typeof ChargeStatus>;
    }, "strip", z.ZodTypeAny, {
        status: ChargeStatus;
        emv: string;
    }, {
        status: ChargeStatus;
        emv: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    status: ChargeStatus;
    boleto?: {
        status: ChargeStatus;
        barCode: string;
    } | undefined;
    pix?: {
        status: ChargeStatus;
        emv: string;
    } | undefined;
}, {
    status: ChargeStatus;
    boleto?: {
        status: ChargeStatus;
        barCode: string;
    } | undefined;
    pix?: {
        status: ChargeStatus;
        emv: string;
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
    downloadPdfAsBuffer(data: ChargeDownloadDto): Promise<Buffer>;
    /**
     * Cancel a charge
     */
    cancel(id: string): Promise<ChargeCancelResponseDto>;
}

declare const WalletCreateDto: z.ZodEffects<z.ZodObject<{
    name: z.ZodString;
    symbol: z.ZodNativeEnum<typeof CryptoSymbol>;
    network: z.ZodNativeEnum<typeof CryptoNetwork>;
    address: z.ZodString;
}, "strip", z.ZodTypeAny, {
    symbol: CryptoSymbol;
    name: string;
    address: string;
    network: CryptoNetwork;
}, {
    symbol: CryptoSymbol;
    name: string;
    address: string;
    network: CryptoNetwork;
}>, {
    symbol: CryptoSymbol;
    name: string;
    address: string;
    network: CryptoNetwork;
}, {
    symbol: CryptoSymbol;
    name: string;
    address: string;
    network: CryptoNetwork;
}>;
type WalletCreateDto = z.infer<typeof WalletCreateDto>;
declare const WalletCreateOutputDto: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    symbol: z.ZodNativeEnum<typeof CryptoSymbol>;
    network: z.ZodNativeEnum<typeof CryptoNetwork>;
    address: z.ZodString;
}, "strip", z.ZodTypeAny, {
    symbol: CryptoSymbol;
    id: string;
    name: string;
    address: string;
    network: CryptoNetwork;
}, {
    symbol: CryptoSymbol;
    id: string;
    name: string;
    address: string;
    network: CryptoNetwork;
}>;
type WalletCreateOutputDto = z.infer<typeof WalletCreateOutputDto>;

declare const WalletListOutputDto: z.ZodObject<{
    walletId: z.ZodString;
    active: z.ZodBoolean;
    name: z.ZodString;
    address: z.ZodString;
    symbol: z.ZodNativeEnum<typeof CryptoSymbol>;
    network: z.ZodNativeEnum<typeof CryptoNetwork>;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    symbol: CryptoSymbol;
    name: string;
    address: string;
    createdAt: Date;
    network: CryptoNetwork;
    walletId: string;
    active: boolean;
}, {
    symbol: CryptoSymbol;
    name: string;
    address: string;
    createdAt: Date;
    network: CryptoNetwork;
    walletId: string;
    active: boolean;
}>;
type WalletListOutputDto = z.infer<typeof WalletListOutputDto>;

declare const QuoteDto: z.ZodObject<{
    symbol: z.ZodNativeEnum<typeof CryptoSymbol>;
    settlement: z.ZodNativeEnum<typeof CryptoOtcSettlementSchedule>;
}, "strip", z.ZodTypeAny, {
    symbol: CryptoSymbol;
    settlement: CryptoOtcSettlementSchedule;
}, {
    symbol: CryptoSymbol;
    settlement: CryptoOtcSettlementSchedule;
}>;
type QuoteDto = z.infer<typeof QuoteDto>;
declare const QuoteOutputDto: z.ZodObject<{
    quoteId: z.ZodString;
    symbol: z.ZodNativeEnum<typeof CryptoSymbol>;
    settlement: z.ZodNativeEnum<typeof CryptoOtcSettlementSchedule>;
    price: z.ZodNumber;
    expireAtUnix: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    symbol: CryptoSymbol;
    settlement: CryptoOtcSettlementSchedule;
    quoteId: string;
    price: number;
    expireAtUnix: number;
}, {
    symbol: CryptoSymbol;
    settlement: CryptoOtcSettlementSchedule;
    quoteId: string;
    price: number;
    expireAtUnix: number;
}>;
type QuoteOutputDto = z.infer<typeof QuoteOutputDto>;

declare const ExecuteDto: z.ZodEffects<z.ZodEffects<z.ZodObject<{
    quoteId: z.ZodString;
    cost: z.ZodOptional<z.ZodNumber>;
    quantity: z.ZodOptional<z.ZodNumber>;
    accountId: z.ZodString;
    walletId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    accountId: string;
    walletId: string;
    quoteId: string;
    cost?: number | undefined;
    quantity?: number | undefined;
}, {
    accountId: string;
    walletId: string;
    quoteId: string;
    cost?: number | undefined;
    quantity?: number | undefined;
}>, {
    accountId: string;
    walletId: string;
    quoteId: string;
    cost?: number | undefined;
    quantity?: number | undefined;
}, {
    accountId: string;
    walletId: string;
    quoteId: string;
    cost?: number | undefined;
    quantity?: number | undefined;
}>, {
    accountId: string;
    walletId: string;
    quoteId: string;
    cost?: number | undefined;
    quantity?: number | undefined;
}, {
    accountId: string;
    walletId: string;
    quoteId: string;
    cost?: number | undefined;
    quantity?: number | undefined;
}>;
type ExecuteDto = z.infer<typeof ExecuteDto>;
declare const ExecuteOutputDto: z.ZodObject<{
    cryptoTransactionId: z.ZodString;
    quantity: z.ZodNumber;
    cost: z.ZodNumber;
    price: z.ZodNumber;
    network: z.ZodNativeEnum<typeof CryptoNetwork>;
    symbol: z.ZodNativeEnum<typeof CryptoSymbol>;
    currency: z.ZodString;
    walletId: z.ZodString;
    walletAddress: z.ZodString;
    walletName: z.ZodString;
    settlementSchedule: z.ZodNullable<z.ZodNativeEnum<typeof CryptoOtcSettlementSchedule>>;
    settlementDate: z.ZodNullable<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    symbol: CryptoSymbol;
    currency: string;
    network: CryptoNetwork;
    walletId: string;
    price: number;
    cost: number;
    quantity: number;
    cryptoTransactionId: string;
    walletAddress: string;
    walletName: string;
    settlementSchedule: CryptoOtcSettlementSchedule | null;
    settlementDate: Date | null;
}, {
    symbol: CryptoSymbol;
    currency: string;
    network: CryptoNetwork;
    walletId: string;
    price: number;
    cost: number;
    quantity: number;
    cryptoTransactionId: string;
    walletAddress: string;
    walletName: string;
    settlementSchedule: CryptoOtcSettlementSchedule | null;
    settlementDate: Date | null;
}>;
type ExecuteOutputDto = z.infer<typeof ExecuteOutputDto>;

declare const PayDto: z.ZodObject<{
    accountId: z.ZodString;
    amount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    accountId: string;
    amount: number;
}, {
    accountId: string;
    amount: number;
}>;
type PayDto = z.infer<typeof PayDto>;
declare const PayOutputDto: z.ZodObject<{
    txId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    txId: string;
}, {
    txId: string;
}>;
type PayOutputDto = z.infer<typeof PayOutputDto>;

declare const ProductListOutputDto: z.ZodObject<{
    symbol: z.ZodNativeEnum<typeof CryptoSymbol>;
    settlement: z.ZodNativeEnum<typeof CryptoOtcSettlementSchedule>;
    supportedNetworks: z.ZodArray<z.ZodNativeEnum<typeof CryptoNetwork>, "many">;
}, "strip", z.ZodTypeAny, {
    symbol: CryptoSymbol;
    settlement: CryptoOtcSettlementSchedule;
    supportedNetworks: CryptoNetwork[];
}, {
    symbol: CryptoSymbol;
    settlement: CryptoOtcSettlementSchedule;
    supportedNetworks: CryptoNetwork[];
}>;
type ProductListOutputDto = z.infer<typeof ProductListOutputDto>;

declare const TransactionsListDto: z.ZodObject<{
    symbol: z.ZodOptional<z.ZodNativeEnum<typeof CryptoSymbol>>;
    status: z.ZodOptional<z.ZodNativeEnum<typeof CryptoOtcTransactionStatus>>;
    from: z.ZodOptional<z.ZodDate>;
    to: z.ZodOptional<z.ZodDate>;
    page: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    page: number;
    symbol?: CryptoSymbol | undefined;
    status?: CryptoOtcTransactionStatus | undefined;
    from?: Date | undefined;
    to?: Date | undefined;
}, {
    symbol?: CryptoSymbol | undefined;
    status?: CryptoOtcTransactionStatus | undefined;
    from?: Date | undefined;
    to?: Date | undefined;
    page?: number | undefined;
}>;
type TransactionsListDto = z.infer<typeof TransactionsListDto>;
declare const TransactionsListOutput: z.ZodObject<{
    transactions: z.ZodArray<z.ZodObject<{
        transactionId: z.ZodString;
        status: z.ZodNativeEnum<typeof CryptoOtcTransactionStatus>;
        quantity: z.ZodNumber;
        cost: z.ZodNumber;
        price: z.ZodNumber;
        network: z.ZodNativeEnum<typeof CryptoNetwork>;
        symbol: z.ZodNativeEnum<typeof CryptoSymbol>;
        currency: z.ZodNativeEnum<typeof Currency>;
        walletId: z.ZodString;
        walletAddress: z.ZodString;
        walletName: z.ZodString;
        settlementDate: z.ZodNullable<z.ZodDate>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        symbol: CryptoSymbol;
        status: CryptoOtcTransactionStatus;
        currency: Currency;
        transactionId: string;
        createdAt: Date;
        network: CryptoNetwork;
        walletId: string;
        price: number;
        cost: number;
        quantity: number;
        walletAddress: string;
        walletName: string;
        settlementDate: Date | null;
        updatedAt: Date;
    }, {
        symbol: CryptoSymbol;
        status: CryptoOtcTransactionStatus;
        currency: Currency;
        transactionId: string;
        createdAt: Date;
        network: CryptoNetwork;
        walletId: string;
        price: number;
        cost: number;
        quantity: number;
        walletAddress: string;
        walletName: string;
        settlementDate: Date | null;
        updatedAt: Date;
    }>, "many">;
    total: z.ZodNumber;
    totalPages: z.ZodNumber;
    currentPage: z.ZodNumber;
    hasMore: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    total: number;
    totalPages: number;
    transactions: {
        symbol: CryptoSymbol;
        status: CryptoOtcTransactionStatus;
        currency: Currency;
        transactionId: string;
        createdAt: Date;
        network: CryptoNetwork;
        walletId: string;
        price: number;
        cost: number;
        quantity: number;
        walletAddress: string;
        walletName: string;
        settlementDate: Date | null;
        updatedAt: Date;
    }[];
    currentPage: number;
    hasMore: boolean;
}, {
    total: number;
    totalPages: number;
    transactions: {
        symbol: CryptoSymbol;
        status: CryptoOtcTransactionStatus;
        currency: Currency;
        transactionId: string;
        createdAt: Date;
        network: CryptoNetwork;
        walletId: string;
        price: number;
        cost: number;
        quantity: number;
        walletAddress: string;
        walletName: string;
        settlementDate: Date | null;
        updatedAt: Date;
    }[];
    currentPage: number;
    hasMore: boolean;
}>;
type TransactionsListOutput = z.infer<typeof TransactionsListOutput>;

declare const TransactionGetOutputDtoSchema: z.ZodObject<{
    transactionId: z.ZodString;
    status: z.ZodNativeEnum<typeof CryptoOtcTransactionStatus>;
    quantity: z.ZodNumber;
    cost: z.ZodNumber;
    price: z.ZodNumber;
    network: z.ZodNativeEnum<typeof CryptoNetwork>;
    symbol: z.ZodNativeEnum<typeof CryptoSymbol>;
    currency: z.ZodNativeEnum<typeof Currency>;
    walletId: z.ZodString;
    walletAddress: z.ZodString;
    walletName: z.ZodString;
    settlementSchedule: z.ZodNullable<z.ZodNativeEnum<typeof CryptoOtcSettlementSchedule>>;
    settlementDate: z.ZodNullable<z.ZodDate>;
    debt: z.ZodObject<{
        initial: z.ZodNumber;
        remaining: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        initial: number;
        remaining: number;
    }, {
        initial: number;
        remaining: number;
    }>;
    fills: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        hash: z.ZodString;
        filledAt: z.ZodNullable<z.ZodDate>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        amount: number;
        hash: string;
        filledAt: Date | null;
    }, {
        id: string;
        amount: number;
        hash: string;
        filledAt: Date | null;
    }>, "many">;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    symbol: CryptoSymbol;
    status: CryptoOtcTransactionStatus;
    currency: Currency;
    transactionId: string;
    createdAt: Date;
    network: CryptoNetwork;
    walletId: string;
    price: number;
    cost: number;
    quantity: number;
    walletAddress: string;
    walletName: string;
    settlementSchedule: CryptoOtcSettlementSchedule | null;
    settlementDate: Date | null;
    debt: {
        initial: number;
        remaining: number;
    };
    fills: {
        id: string;
        amount: number;
        hash: string;
        filledAt: Date | null;
    }[];
}, {
    symbol: CryptoSymbol;
    status: CryptoOtcTransactionStatus;
    currency: Currency;
    transactionId: string;
    createdAt: Date;
    network: CryptoNetwork;
    walletId: string;
    price: number;
    cost: number;
    quantity: number;
    walletAddress: string;
    walletName: string;
    settlementSchedule: CryptoOtcSettlementSchedule | null;
    settlementDate: Date | null;
    debt: {
        initial: number;
        remaining: number;
    };
    fills: {
        id: string;
        amount: number;
        hash: string;
        filledAt: Date | null;
    }[];
}>;
type TransactionGetOutputDto = z.infer<typeof TransactionGetOutputDtoSchema>;

declare class Crypto extends BaseResource {
    constructor(client: AxiosInstance);
    /**
     * Create a new crypto wallet
     */
    createWallet(data: WalletCreateDto): Promise<WalletCreateOutputDto>;
    /**
     * List all crypto wallets
     */
    listWallets(): Promise<WalletListOutputDto[]>;
    /**
     * Get list of available crypto products
     */
    getProducts(): Promise<ProductListOutputDto[]>;
    /**
     * Get a quote for crypto trading
     */
    getQuote(data: QuoteDto): Promise<QuoteOutputDto>;
    /**
     * Execute a crypto trade
     */
    executeOrder(data: ExecuteDto): Promise<ExecuteOutputDto>;
    /**
     * Pay for a crypto transaction
     */
    pay(data: PayDto): Promise<PayOutputDto>;
    /**
     * Get list of crypto transactions
     */
    getTransactions(params: TransactionsListDto): Promise<TransactionsListOutput>;
    /**
     * Get a specific crypto transaction
     */
    getTransaction(transactionId: string): Promise<TransactionGetOutputDto>;
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
        id: string;
        type: CustomerType;
        name: string;
        document: string;
        createdAt: string;
        isBeneficiary: boolean;
        email: string;
        addressStreet: string;
        addressNumber: string;
        addressNeighborhood: string;
        addressCity: string;
        addressState: string;
        addressPostalCode: string;
        addressCountryCode: string;
    }, {
        id: string;
        type: CustomerType;
        name: string;
        document: string;
        createdAt: string;
        isBeneficiary: boolean;
        email: string;
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
    hasMore: boolean;
    customers: {
        id: string;
        type: CustomerType;
        name: string;
        document: string;
        createdAt: string;
        isBeneficiary: boolean;
        email: string;
        addressStreet: string;
        addressNumber: string;
        addressNeighborhood: string;
        addressCity: string;
        addressState: string;
        addressPostalCode: string;
        addressCountryCode: string;
    }[];
}, {
    total: number;
    totalPages: number;
    currentPage: number;
    hasMore: boolean;
    customers: {
        id: string;
        type: CustomerType;
        name: string;
        document: string;
        createdAt: string;
        isBeneficiary: boolean;
        email: string;
        addressStreet: string;
        addressNumber: string;
        addressNeighborhood: string;
        addressCity: string;
        addressState: string;
        addressPostalCode: string;
        addressCountryCode: string;
    }[];
}>;
type CustomerGetAllDto = z.infer<typeof CustomerGetAllSchema>;
type CustomerGetAllResponseDto = z.infer<typeof CustomerGetAllResponseSchema>;

declare const CustomerGetOneResponseSchema: z.ZodObject<{
    customer: z.ZodObject<{
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
        id: string;
        type: CustomerType;
        name: string;
        document: string;
        createdAt: string;
        isBeneficiary: boolean;
        email: string;
        addressStreet: string;
        addressNumber: string;
        addressNeighborhood: string;
        addressCity: string;
        addressState: string;
        addressPostalCode: string;
        addressCountryCode: string;
    }, {
        id: string;
        type: CustomerType;
        name: string;
        document: string;
        createdAt: string;
        isBeneficiary: boolean;
        email: string;
        addressStreet: string;
        addressNumber: string;
        addressNeighborhood: string;
        addressCity: string;
        addressState: string;
        addressPostalCode: string;
        addressCountryCode: string;
    }>;
}, "strip", z.ZodTypeAny, {
    customer: {
        id: string;
        type: CustomerType;
        name: string;
        document: string;
        createdAt: string;
        isBeneficiary: boolean;
        email: string;
        addressStreet: string;
        addressNumber: string;
        addressNeighborhood: string;
        addressCity: string;
        addressState: string;
        addressPostalCode: string;
        addressCountryCode: string;
    };
}, {
    customer: {
        id: string;
        type: CustomerType;
        name: string;
        document: string;
        createdAt: string;
        isBeneficiary: boolean;
        email: string;
        addressStreet: string;
        addressNumber: string;
        addressNeighborhood: string;
        addressCity: string;
        addressState: string;
        addressPostalCode: string;
        addressCountryCode: string;
    };
}>;
type CustomerGetOneResponseDto = z.infer<typeof CustomerGetOneResponseSchema>;

declare class Customers extends BaseResource {
    constructor(client: AxiosInstance);
    /**
     * Get all customers
     */
    getAll(params: CustomerGetAllDto): Promise<CustomerGetAllResponseDto>;
    /**
     * Get one customer by id
     */
    getOne(id: string): Promise<CustomerGetOneResponseDto>;
}

declare const TransactionGetAllSchema: z.ZodObject<{
    customerId: z.ZodOptional<z.ZodString>;
    accountId: z.ZodOptional<z.ZodString>;
    type: z.ZodDefault<z.ZodOptional<z.ZodEnum<[TransactionType.inbound, TransactionType.outbound, "all"]>>>;
    query: z.ZodOptional<z.ZodString>;
    from: z.ZodOptional<z.ZodDate>;
    to: z.ZodOptional<z.ZodDate>;
    page: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    status: z.ZodDefault<z.ZodOptional<z.ZodEnum<[PaymentStatus.succeeded, PaymentStatus.incomplete, PaymentStatus.failed, PaymentStatus.refunded, PaymentStatus.created, "all"]>>>;
}, "strip", z.ZodTypeAny, {
    status: "all" | PaymentStatus.created | PaymentStatus.succeeded | PaymentStatus.failed | PaymentStatus.refunded | PaymentStatus.incomplete;
    type: TransactionType.inbound | TransactionType.outbound | "all";
    page: number;
    accountId?: string | undefined;
    query?: string | undefined;
    from?: Date | undefined;
    to?: Date | undefined;
    customerId?: string | undefined;
}, {
    status?: "all" | PaymentStatus.created | PaymentStatus.succeeded | PaymentStatus.failed | PaymentStatus.refunded | PaymentStatus.incomplete | undefined;
    type?: TransactionType.inbound | TransactionType.outbound | "all" | undefined;
    accountId?: string | undefined;
    query?: string | undefined;
    from?: Date | undefined;
    to?: Date | undefined;
    page?: number | undefined;
    customerId?: string | undefined;
}>;
declare const TransactionGetAllResponseSchema: z.ZodObject<{
    transactions: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        amountCents: z.ZodNumber;
        account: z.ZodString;
        customer: z.ZodObject<{
            id: z.ZodString;
            name: z.ZodEffects<z.ZodNullable<z.ZodString>, string, string | null>;
            email: z.ZodEffects<z.ZodNullable<z.ZodString>, string, string | null>;
            cpfCnpj: z.ZodEffects<z.ZodNullable<z.ZodString>, string, string | null>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            name: string;
            email: string;
            cpfCnpj: string;
        }, {
            id: string;
            name: string | null;
            email: string | null;
            cpfCnpj: string | null;
        }>;
        payerName: z.ZodEffects<z.ZodNullable<z.ZodString>, string, string | null>;
        payerCpfCnpj: z.ZodEffects<z.ZodNullable<z.ZodString>, string, string | null>;
        description: z.ZodString;
        e2eID: z.ZodString;
        status: z.ZodString;
        method: z.ZodString;
        type: z.ZodString;
        currency: z.ZodString;
        fees: z.ZodNumber;
        disputed: z.ZodBoolean;
        pixKey: z.ZodEffects<z.ZodNullable<z.ZodOptional<z.ZodString>>, string, string | null | undefined>;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        completedAt: z.ZodNullable<z.ZodDate>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        status: string;
        type: string;
        disputed: boolean;
        amountCents: number;
        currency: string;
        customer: {
            id: string;
            name: string;
            email: string;
            cpfCnpj: string;
        };
        account: string;
        createdAt: Date;
        updatedAt: Date;
        payerName: string;
        payerCpfCnpj: string;
        description: string;
        e2eID: string;
        method: string;
        fees: number;
        pixKey: string;
        completedAt: Date | null;
    }, {
        id: string;
        status: string;
        type: string;
        disputed: boolean;
        amountCents: number;
        currency: string;
        customer: {
            id: string;
            name: string | null;
            email: string | null;
            cpfCnpj: string | null;
        };
        account: string;
        createdAt: Date;
        updatedAt: Date;
        payerName: string | null;
        payerCpfCnpj: string | null;
        description: string;
        e2eID: string;
        method: string;
        fees: number;
        completedAt: Date | null;
        pixKey?: string | null | undefined;
    }>, "many">;
    total: z.ZodNumber;
    totalPages: z.ZodNumber;
    currentPage: z.ZodNumber;
    hasMore: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    total: number;
    totalPages: number;
    transactions: {
        id: string;
        status: string;
        type: string;
        disputed: boolean;
        amountCents: number;
        currency: string;
        customer: {
            id: string;
            name: string;
            email: string;
            cpfCnpj: string;
        };
        account: string;
        createdAt: Date;
        updatedAt: Date;
        payerName: string;
        payerCpfCnpj: string;
        description: string;
        e2eID: string;
        method: string;
        fees: number;
        pixKey: string;
        completedAt: Date | null;
    }[];
    currentPage: number;
    hasMore: boolean;
}, {
    total: number;
    totalPages: number;
    transactions: {
        id: string;
        status: string;
        type: string;
        disputed: boolean;
        amountCents: number;
        currency: string;
        customer: {
            id: string;
            name: string | null;
            email: string | null;
            cpfCnpj: string | null;
        };
        account: string;
        createdAt: Date;
        updatedAt: Date;
        payerName: string | null;
        payerCpfCnpj: string | null;
        description: string;
        e2eID: string;
        method: string;
        fees: number;
        completedAt: Date | null;
        pixKey?: string | null | undefined;
    }[];
    currentPage: number;
    hasMore: boolean;
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

declare const TransferPrepareBaseSchema: z.ZodObject<{
    accountId: z.ZodString;
} & {
    method: z.ZodNativeEnum<typeof TransferMethod>;
}, "strip", z.ZodTypeAny, {
    accountId: string;
    method: TransferMethod;
}, {
    accountId: string;
    method: TransferMethod;
}>;
declare const TransferPreparePixKeySchema: z.ZodObject<{
    accountId: z.ZodString;
} & {
    method: z.ZodLiteral<TransferMethod.PIX_KEY>;
    pixKey: z.ZodString;
}, "strip", z.ZodTypeAny, {
    accountId: string;
    method: TransferMethod.PIX_KEY;
    pixKey: string;
}, {
    accountId: string;
    method: TransferMethod.PIX_KEY;
    pixKey: string;
}>;
declare const TransferPreparePixEmvSchema: z.ZodObject<{
    accountId: z.ZodString;
} & {
    method: z.ZodLiteral<TransferMethod.PIX_EMV>;
    emv: z.ZodString;
}, "strip", z.ZodTypeAny, {
    accountId: string;
    emv: string;
    method: TransferMethod.PIX_EMV;
}, {
    accountId: string;
    emv: string;
    method: TransferMethod.PIX_EMV;
}>;
declare const TransferPreparePixAccountSchema: z.ZodObject<{
    accountId: z.ZodString;
} & {
    beneficiaryAccountType: z.ZodOptional<z.ZodNativeEnum<typeof BeneficiaryAccountType>>;
    beneficiaryAccountNumber: z.ZodOptional<z.ZodString>;
    beneficiaryDocument: z.ZodOptional<z.ZodString>;
    beneficiaryAgency: z.ZodOptional<z.ZodString>;
    beneficiaryName: z.ZodOptional<z.ZodString>;
    beneficiaryId: z.ZodOptional<z.ZodString>;
    beneficiaryBankId: z.ZodOptional<z.ZodString>;
} & {
    method: z.ZodLiteral<TransferMethod.PIX_ACCOUNT>;
}, "strip", z.ZodTypeAny, {
    accountId: string;
    method: TransferMethod.PIX_ACCOUNT;
    beneficiaryAccountType?: BeneficiaryAccountType | undefined;
    beneficiaryAccountNumber?: string | undefined;
    beneficiaryDocument?: string | undefined;
    beneficiaryAgency?: string | undefined;
    beneficiaryName?: string | undefined;
    beneficiaryId?: string | undefined;
    beneficiaryBankId?: string | undefined;
}, {
    accountId: string;
    method: TransferMethod.PIX_ACCOUNT;
    beneficiaryAccountType?: BeneficiaryAccountType | undefined;
    beneficiaryAccountNumber?: string | undefined;
    beneficiaryDocument?: string | undefined;
    beneficiaryAgency?: string | undefined;
    beneficiaryName?: string | undefined;
    beneficiaryId?: string | undefined;
    beneficiaryBankId?: string | undefined;
}>;
declare const TransferPrepareSameBankSchema: z.ZodObject<{
    accountId: z.ZodString;
} & Omit<{
    beneficiaryAccountType: z.ZodOptional<z.ZodNativeEnum<typeof BeneficiaryAccountType>>;
    beneficiaryAccountNumber: z.ZodOptional<z.ZodString>;
    beneficiaryDocument: z.ZodOptional<z.ZodString>;
    beneficiaryAgency: z.ZodOptional<z.ZodString>;
    beneficiaryName: z.ZodOptional<z.ZodString>;
    beneficiaryId: z.ZodOptional<z.ZodString>;
    beneficiaryBankId: z.ZodOptional<z.ZodString>;
}, "beneficiaryAccountType" | "beneficiaryAgency"> & {
    method: z.ZodLiteral<TransferMethod.SAME_BANK>;
}, "strip", z.ZodTypeAny, {
    accountId: string;
    method: TransferMethod.SAME_BANK;
    beneficiaryAccountNumber?: string | undefined;
    beneficiaryDocument?: string | undefined;
    beneficiaryName?: string | undefined;
    beneficiaryId?: string | undefined;
    beneficiaryBankId?: string | undefined;
}, {
    accountId: string;
    method: TransferMethod.SAME_BANK;
    beneficiaryAccountNumber?: string | undefined;
    beneficiaryDocument?: string | undefined;
    beneficiaryName?: string | undefined;
    beneficiaryId?: string | undefined;
    beneficiaryBankId?: string | undefined;
}>;
declare const TransferPrepareTedSchema: z.ZodObject<{
    accountId: z.ZodString;
} & {
    beneficiaryAccountType: z.ZodOptional<z.ZodNativeEnum<typeof BeneficiaryAccountType>>;
    beneficiaryAccountNumber: z.ZodOptional<z.ZodString>;
    beneficiaryDocument: z.ZodOptional<z.ZodString>;
    beneficiaryAgency: z.ZodOptional<z.ZodString>;
    beneficiaryName: z.ZodOptional<z.ZodString>;
    beneficiaryId: z.ZodOptional<z.ZodString>;
    beneficiaryBankId: z.ZodOptional<z.ZodString>;
} & {
    method: z.ZodLiteral<TransferMethod.TED>;
}, "strip", z.ZodTypeAny, {
    accountId: string;
    method: TransferMethod.TED;
    beneficiaryAccountType?: BeneficiaryAccountType | undefined;
    beneficiaryAccountNumber?: string | undefined;
    beneficiaryDocument?: string | undefined;
    beneficiaryAgency?: string | undefined;
    beneficiaryName?: string | undefined;
    beneficiaryId?: string | undefined;
    beneficiaryBankId?: string | undefined;
}, {
    accountId: string;
    method: TransferMethod.TED;
    beneficiaryAccountType?: BeneficiaryAccountType | undefined;
    beneficiaryAccountNumber?: string | undefined;
    beneficiaryDocument?: string | undefined;
    beneficiaryAgency?: string | undefined;
    beneficiaryName?: string | undefined;
    beneficiaryId?: string | undefined;
    beneficiaryBankId?: string | undefined;
}>;
declare const TransferPrepareSameCompanySchema: z.ZodObject<{
    accountId: z.ZodString;
} & {
    method: z.ZodLiteral<TransferMethod.SAME_COMPANY>;
    destinationAccountId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    accountId: string;
    method: TransferMethod.SAME_COMPANY;
    destinationAccountId: string;
}, {
    accountId: string;
    method: TransferMethod.SAME_COMPANY;
    destinationAccountId: string;
}>;
declare const TransferPrepareResponseSchema: z.ZodObject<{
    transferId: z.ZodString;
    beneficiaryDocument: z.ZodString;
    bankName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    beneficiaryDocument: string;
    transferId: string;
    bankName: string;
}, {
    beneficiaryDocument: string;
    transferId: string;
    bankName: string;
}>;
type TransferPrepareBaseDto = z.infer<typeof TransferPrepareBaseSchema>;
type TransferPreparePixKeyDto = z.infer<typeof TransferPreparePixKeySchema>;
type TransferPreparePixEmvDto = z.infer<typeof TransferPreparePixEmvSchema>;
type TransferPreparePixAccountDto = z.infer<typeof TransferPreparePixAccountSchema>;
type TransferPrepareTedDto = z.infer<typeof TransferPrepareTedSchema>;
type TransferPrepareSameBankDto = z.infer<typeof TransferPrepareSameBankSchema>;
type TransferPrepareSameCompanyDto = z.infer<typeof TransferPrepareSameCompanySchema>;
type TransferPrepareResponseDto = z.infer<typeof TransferPrepareResponseSchema>;
type TransferPrepareDto = TransferPrepareBaseDto | TransferPreparePixKeyDto | TransferPreparePixEmvDto | TransferPreparePixAccountDto | TransferPrepareTedDto | TransferPrepareSameBankDto | TransferPrepareSameCompanyDto;

declare const TransferConfirmSchema: z.ZodObject<{
    transferId: z.ZodString;
    amountCent: z.ZodNumber;
    accountId: z.ZodString;
    reference: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    accountId: string;
    transferId: string;
    amountCent: number;
    reference?: string | undefined;
}, {
    accountId: string;
    transferId: string;
    amountCent: number;
    reference?: string | undefined;
}>;
type TransferConfirmDto = z.infer<typeof TransferConfirmSchema>;

declare class Transfers extends BaseResource {
    constructor(client: AxiosInstance);
    /**
     * Prepare a transfer by method
     */
    prepare(data: TransferPrepareDto): Promise<TransferPrepareResponseDto>;
    /**
     * Confirm a prepared transfer
     */
    confirm(data: TransferConfirmDto): Promise<void>;
}

declare const BankInstitutionSearchSchema: z.ZodObject<{
    query: z.ZodOptional<z.ZodString>;
    page: z.ZodNumber;
    totalPerPage: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    totalPerPage: number;
    query?: string | undefined;
}, {
    page: number;
    query?: string | undefined;
    totalPerPage?: number | undefined;
}>;
declare const BankInstitutionSearchResponseSchema: z.ZodObject<{
    bankInstitutions: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        ispb: z.ZodString;
        compe: z.ZodNullable<z.ZodString>;
        indexationNumber: z.ZodBigInt;
    }, "strip", z.ZodTypeAny, {
        id: string;
        ispb: string;
        name: string;
        compe: string | null;
        indexationNumber: bigint;
    }, {
        id: string;
        ispb: string;
        name: string;
        compe: string | null;
        indexationNumber: bigint;
    }>, "many">;
    total: z.ZodNumber;
    totalPages: z.ZodNumber;
    currentPage: z.ZodNumber;
    hasMore: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    total: number;
    totalPages: number;
    currentPage: number;
    hasMore: boolean;
    bankInstitutions: {
        id: string;
        ispb: string;
        name: string;
        compe: string | null;
        indexationNumber: bigint;
    }[];
}, {
    total: number;
    totalPages: number;
    currentPage: number;
    hasMore: boolean;
    bankInstitutions: {
        id: string;
        ispb: string;
        name: string;
        compe: string | null;
        indexationNumber: bigint;
    }[];
}>;
type BankInstitutionSearchDto = z.infer<typeof BankInstitutionSearchSchema>;
type BankInstitutionSearchResponseDto = z.infer<typeof BankInstitutionSearchResponseSchema>;

declare const BankInstitutionGetAllSchema: z.ZodObject<{
    query: z.ZodOptional<z.ZodString>;
    page: z.ZodNumber;
    totalPerPage: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    totalPerPage: number;
    query?: string | undefined;
}, {
    page: number;
    query?: string | undefined;
    totalPerPage?: number | undefined;
}>;
declare const BankInstitutionGetAllResponseSchema: z.ZodObject<{
    bankInstitutions: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        ispb: z.ZodString;
        compe: z.ZodNullable<z.ZodString>;
        indexationNumber: z.ZodBigInt;
    }, "strip", z.ZodTypeAny, {
        id: string;
        ispb: string;
        name: string;
        compe: string | null;
        indexationNumber: bigint;
    }, {
        id: string;
        ispb: string;
        name: string;
        compe: string | null;
        indexationNumber: bigint;
    }>, "many">;
    total: z.ZodNumber;
    totalPages: z.ZodNumber;
    currentPage: z.ZodNumber;
    hasMore: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    total: number;
    totalPages: number;
    currentPage: number;
    hasMore: boolean;
    bankInstitutions: {
        id: string;
        ispb: string;
        name: string;
        compe: string | null;
        indexationNumber: bigint;
    }[];
}, {
    total: number;
    totalPages: number;
    currentPage: number;
    hasMore: boolean;
    bankInstitutions: {
        id: string;
        ispb: string;
        name: string;
        compe: string | null;
        indexationNumber: bigint;
    }[];
}>;
type BankInstitutionGetAllDto = z.infer<typeof BankInstitutionGetAllSchema>;
type BankInstitutionGetAllResponseDto = z.infer<typeof BankInstitutionGetAllResponseSchema>;

declare class BankInstitution extends BaseResource {
    constructor(client: AxiosInstance);
    /**
     * Get all bank institutions
     */
    getAll(params: BankInstitutionGetAllDto): Promise<BankInstitutionGetAllResponseDto>;
    /**
     * Search a bank institution
     */
    search(params: BankInstitutionSearchDto): Promise<BankInstitutionSearchResponseDto>;
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
    crypto: Crypto;
    customers: Customers;
    transactions: Transactions;
    transfers: Transfers;
    bankInstitution: BankInstitution;
    constructor(options: ContabullOptions);
    request<T>(config: AxiosRequestConfig): Promise<T>;
    private signRequest;
}

export { Accounts, ApiError, Authorization, AvailableLanguages, BankInstitution, BeneficiaryAccountType, ChargeStatus, Charges, Contabull, ContabullOptions, Crypto, CryptoNetwork, CryptoOtcSettlementSchedule, CryptoOtcTransactionStatus, CryptoSymbol, Currency, CustomerType, Customers, PaginatedResponse, PaginationParams, PaymentStatus, TransactionType, Transactions, TransferMethod, Transfers };
