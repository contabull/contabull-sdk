import { AxiosInstance } from "axios";
import { BaseResource } from "./base-resource";
import { BankInstitutionSearchDto } from "../dto/bank-institutions/BankInstitutionSearchDto";
import {
  BankInstitutionGetAllDto,
  BankInstitutionGetAllResponseDto,
  BankInstitutionGetAllSchema,
} from "../dto/bank-institutions/BankInsitutionGetAllDto";
import { validateOrThrow } from "../utils/validate-or-throw";

export class BankInstitution extends BaseResource {
  constructor(client: AxiosInstance) {
    super(client, "/bank-institutions");
  }

  /**
   * Get all bank institutions
   */
  async getAll(params: BankInstitutionGetAllDto): Promise<BankInstitutionGetAllResponseDto> {
    await validateOrThrow(BankInstitutionGetAllSchema, params);

    return this.get<BankInstitutionGetAllResponseDto>("", {
      params,
    });
  }

  /**
   * Search a bank institution
   */
  async search(params: BankInstitutionSearchDto): Promise<BankInstitutionSearchDto> {
    return this.get<BankInstitutionSearchDto>("", { params });
  }
}