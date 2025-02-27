import { z, ZodEffects, ZodObject } from 'zod';
import { safeAwait } from './safe-await';

export const validateOrThrow = async <T extends ZodObject<any> | ZodEffects<any>>(schema: T, data: unknown): Promise<z.infer<T>> => {
  const validation = await safeAwait(schema.parseAsync(data));

  if (validation.error) {
    console.error((validation.error as any).issues);
    throw new Error(`Error while validating your input data : ${(validation.error as any).issues}`);
  }

  return validation.result;
};
