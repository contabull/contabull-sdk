import type { AxiosInstance } from "axios";
import { BaseResource } from "./base-resource";
import {
  WalletCreateDto,
  WalletCreateOutputDto,
} from "../dto/crypto/CryptoWalletCreateDto";
import { WalletListOutputDto } from "../dto/crypto/CryptoWalletListDto";
import { QuoteDto, QuoteOutputDto } from "../dto/crypto/CryptoQuote";
import { ExecuteDto, ExecuteOutputDto } from "../dto/crypto/CryptoExecuteDto";
import { PayDto, PayOutputDto } from "../dto/crypto/CryptoPayDto";
import { ProductListOutputDto } from "../dto/crypto/CryptoProducListDto";
import {
  TransactionsListDto,
  TransactionsListOutput,
} from "../dto/crypto/CryptoTransactionListDto";
import { TransactionGetOutputDto } from "../dto/crypto/CryptoTransactionGetDto";
import { validateOrThrow } from "../utils/validate-or-throw";

export class Crypto extends BaseResource {
  constructor(client: AxiosInstance) {
    super(client, "/crypto");
  }

  /**
   * Create a new crypto wallet
   */
  async createWallet(data: WalletCreateDto): Promise<WalletCreateOutputDto> {
    await validateOrThrow(WalletCreateDto, data);

    return this.post<WalletCreateOutputDto>("/wallets", data);
  }

  /**
   * List all crypto wallets
   */
  async listWallets(): Promise<WalletListOutputDto[]> {
    return this.get<WalletListOutputDto[]>("/wallets");
  }

  /**
   * Get list of available crypto products
   */
  async getProducts(): Promise<ProductListOutputDto[]> {
    return this.get<ProductListOutputDto[]>("/products");
  }

  /**
   * Get a quote for crypto trading
   */
  async getQuote(data: QuoteDto): Promise<QuoteOutputDto> {
    await validateOrThrow(QuoteDto, data);

    return this.get<QuoteOutputDto>("/quote", { params: data });
  }

  /**
   * Execute a crypto trade
   */
  async executeOrder(data: ExecuteDto): Promise<ExecuteOutputDto> {
    await validateOrThrow(ExecuteDto, data);

    return this.post<ExecuteOutputDto>("/execute", data);
  }

  /**
   * Pay for a crypto transaction
   */
  async pay(data: PayDto): Promise<PayOutputDto> {
    await validateOrThrow(PayDto, data);

    return this.post<PayOutputDto>("/pay", data);
  }

  /**
   * Get list of crypto transactions
   */
  async getTransactions(params: TransactionsListDto): Promise<TransactionsListOutput> {
    await validateOrThrow(TransactionsListDto, params);

    return this.get<TransactionsListOutput>("/transactions", { params });
  }

  /**
   * Get a specific crypto transaction
   */
  async getTransaction(transactionId: string): Promise<TransactionGetOutputDto> {
    return this.get<TransactionGetOutputDto>(`/transactions/${transactionId}`);
  }
}
