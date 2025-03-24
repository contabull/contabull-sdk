import type { AxiosInstance } from "axios";
import {
  TransactionGetAllDto,
  TransactionGetAllResponseDto,
  TransactionGetAllSchema,
} from "../dto/transactions/TransactionGetAllDto";
import { validateOrThrow } from "../utils/validate-or-throw";
import { BaseResource } from "./base-resource";

export class Transactions extends BaseResource {
  constructor(client: AxiosInstance) {
    super(client, "/transactions");
  }

  /**
   * Get all transactions
   */
  async getAll(
    params: TransactionGetAllDto
  ): Promise<TransactionGetAllResponseDto> {
    await validateOrThrow(TransactionGetAllSchema, params);

    return this.get<TransactionGetAllResponseDto>("/all", {
      params,
    });
  }
}
