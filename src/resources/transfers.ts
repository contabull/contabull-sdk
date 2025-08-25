import type { AxiosInstance } from "axios";
import { BaseResource } from "./base-resource";
import {
  TransferPrepareDto,
  TransferPrepareResponseDto,
  TransferPrepareSchemas,
} from "../dto/transfers/TransferPrepareDto";
import {
  TransferConfirmDto,
  TransferConfirmSchema,
} from "../dto/transfers/TransferConfirmDto";
import { validateOrThrow } from "../utils/validate-or-throw";

export class Transfers extends BaseResource {
  constructor(client: AxiosInstance) {
    super(client, "/transfers");
  }

  /**
   * Prepare a transfer by method
   */
  async prepare(data: TransferPrepareDto): Promise<TransferPrepareResponseDto> {
    const schema = TransferPrepareSchemas[data.method as keyof typeof TransferPrepareSchemas];
    
    if (!schema) {
      throw new Error(`Unsupported transfer method: ${data.method}`);
    }

    await validateOrThrow(schema, data);

    return this.post<TransferPrepareResponseDto>("/prepare", data);
  }

  /**
   * Confirm a prepared transfer
   */
  async confirm(data: TransferConfirmDto): Promise<void> {
    await validateOrThrow(TransferConfirmSchema, data);

    return this.post<void>("/confirm", data);
  }
}
