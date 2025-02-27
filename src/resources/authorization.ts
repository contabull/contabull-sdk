import type { AxiosInstance } from "axios";
import { BaseResource } from "./base-resource";

interface AuthorizationTrialReturn {
  message: string,
}

export class Authorization extends BaseResource {
  constructor(client: AxiosInstance) {
    super(client, "/try")
  }

  /**
   * Try API Authorization
   */
  async try(): Promise<AuthorizationTrialReturn> {
    return this.get<AuthorizationTrialReturn>('');
  }
}
