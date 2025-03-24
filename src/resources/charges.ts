import type { AxiosInstance } from "axios";
import { ChargeCancelResponseDto } from "../dto/charges/ChargeCancelDto";
import {
  ChargeCreateDto,
  ChargeCreateResponseDto,
  ChargeCreateSchema,
} from "../dto/charges/ChargeCreateDto";
import {
  ChargeGetAllDto,
  ChargeGetAllResponseDto,
} from "../dto/charges/ChargeGetAllDto";
import { ChargeGetResponseDto } from "../dto/charges/ChargeGetDto";
import { validateOrThrow } from "../utils/validate-or-throw";
import { BaseResource } from "./base-resource";

export class Charges extends BaseResource {
  constructor(client: AxiosInstance) {
    super(client, "/charges");
  }

  /**
   * Create a new charge
   */
  async create(
    data: ChargeCreateDto,
    sourceKey?: string
  ): Promise<ChargeCreateResponseDto> {
    await validateOrThrow(ChargeCreateSchema, data);

    return this.post<ChargeCreateResponseDto>(
      `${sourceKey ? `?sourceKey=${sourceKey}` : ""}`,
      data
    );
  }

  /**
   * Get a charge
   */
  async getOne(id: string): Promise<ChargeGetResponseDto> {
    return this.get<ChargeGetResponseDto>(`/${id}`);
  }

  /**
   * Get all charges
   */
  async getAll(params: ChargeGetAllDto): Promise<ChargeGetAllResponseDto> {
    return this.get<ChargeGetAllResponseDto>("", { params });
  }

  /**
   * Download the charge's PDF as array buffer
   */
  async downloadPdfAsBuffer(id: string): Promise<Buffer> {
    return this.get<any>(`/${id}/download`, {
      responseType: "arraybuffer",
    });
  }

  /**
   * Cancel a charge
   */
  async cancel(id: string): Promise<ChargeCancelResponseDto> {
    return this.delete<ChargeCancelResponseDto>(`/${id}`);
  }
}
