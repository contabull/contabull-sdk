import type { AxiosInstance } from "axios";
import { AccountGetAllOutputDto } from "../dto/accounts/AccountGetAllDto";
import { BaseResource } from "./base-resource";

export class Accounts extends BaseResource {
  constructor(client: AxiosInstance) {
    super(client, "/accounts");
  }

  /**
   * Get all accounts
   */
  async getAll(): Promise<AccountGetAllOutputDto> {
    return this.get<AccountGetAllOutputDto>("");
  }
}
