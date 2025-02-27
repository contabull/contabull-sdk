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

interface User {
    id: string;
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}
interface CreateUserDto {
    email: string;
    name: string;
    password: string;
}
interface UpdateUserDto {
    name?: string;
    email?: string;
}
declare class UsersResource extends BaseResource {
    constructor(client: AxiosInstance);
    /**
     * Get a list of users
     */
    getAll(params?: PaginationParams): Promise<PaginatedResponse<User>>;
    /**
     * Get a user by ID
     */
    getById(id: string): Promise<User>;
    /**
     * Create a new user
     */
    create(data: CreateUserDto): Promise<User>;
    /**
     * Update a user
     */
    update(id: string, data: UpdateUserDto): Promise<User>;
}

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    createdAt: string;
    updatedAt: string;
}
interface CreateProductDto {
    name: string;
    description: string;
    price: number;
}
interface UpdateProductDto {
    name?: string;
    description?: string;
    price?: number;
}
declare class ProductsResource extends BaseResource {
    constructor(client: AxiosInstance);
    /**
     * Get a list of products
     */
    getAll(params?: PaginationParams): Promise<PaginatedResponse<Product>>;
    /**
     * Get a product by ID
     */
    getById(id: string): Promise<Product>;
    /**
     * Create a new product
     */
    create(data: CreateProductDto): Promise<Product>;
    /**
     * Update a product
     */
    update(id: string, data: UpdateProductDto): Promise<Product>;
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
    users: UsersResource;
    products: ProductsResource;
    constructor(options: ContabullOptions);
    private signRequest;
    request<T>(config: AxiosRequestConfig): Promise<T>;
}

export { ApiError, Contabull, ContabullOptions, CreateProductDto, CreateUserDto, PaginatedResponse, PaginationParams, Product, ProductsResource, UpdateProductDto, UpdateUserDto, User, UsersResource };
