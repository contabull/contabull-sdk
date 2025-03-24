import type { AxiosInstance } from "axios";
import {
  CustomerGetAllDto,
  CustomerGetAllResponseDto,
  CustomerGetAllSchema,
} from "../dto/customers/CustomerGetAll";
import { validateOrThrow } from "../utils/validate-or-throw";
import { BaseResource } from "./base-resource";

export class Customers extends BaseResource {
  constructor(client: AxiosInstance) {
    super(client, "/customers");
  }

  /**
   * Get all customers
   */
  async getAll(params: CustomerGetAllDto): Promise<CustomerGetAllResponseDto> {
    await validateOrThrow(CustomerGetAllSchema, params);

    return this.get<CustomerGetAllResponseDto>("/all", {
      params,
    });
  }
}
