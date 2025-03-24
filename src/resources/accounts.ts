import type { AxiosInstance } from "axios";
import { AccountGetAllResponseDto } from "../dto/accounts/AccountGetAllDto";
import { BaseResource } from "./base-resource";

export class Accounts extends BaseResource {
  constructor(client: AxiosInstance) {
    super(client, "/accounts");
  }

  /**
   * Get all accounts
   */
  async getAll(): Promise<AccountGetAllResponseDto> {
    return this.get<AccountGetAllResponseDto>("");
  }
}
