import { z } from "zod";
import { CustomerSchema } from "./CustomerGetAll";

export const CustomerGetOneResponseSchema = z.object({
  customer: CustomerSchema
});

export type CustomerGetOneResponseDto = z.infer<typeof CustomerGetOneResponseSchema>;
