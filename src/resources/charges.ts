import type { AxiosInstance } from "axios";
import { validateOrThrow } from '../utils/validate-or-throw';
import { BaseResource } from "./base-resource";
import { ChargeCreateSchema, ChargeCreateDto, ChargeCreateResponseDto } from "../dto/charges/ChargeCreateDto";
import { ChargeGetResponseDto } from "../dto/charges/ChargeGetDto";

export class Charges extends BaseResource {
  constructor(client: AxiosInstance) {
    super(client, "/charges")
  }

  /**
   * Create a new charge
   */
  async create(data: ChargeCreateDto): Promise<ChargeCreateResponseDto> {
    await validateOrThrow(ChargeCreateSchema, data);

    return this.post<ChargeCreateResponseDto>('/create', data);
  }

  /**
   * Get a charge
   */
  async getOne(id: string): Promise<ChargeGetResponseDto> {
    return this.get<ChargeGetResponseDto>(`?uid=${id}`);
  }
}
