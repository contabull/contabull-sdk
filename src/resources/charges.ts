import type { AxiosInstance } from "axios";
import { BaseResource } from "./base-resource";

interface CreateChargeReturn {
  message: string,
}

export class Charges extends BaseResource {
  constructor(client: AxiosInstance) {
    super(client, "/charges")
  }

  /**
   * Create a new charge
   */
  async create(data: any): Promise<CreateChargeReturn> {
    return this.post<CreateChargeReturn>('/create', data);
  }
}
