import { z, ZodEffects, ZodObject } from 'zod';
import { safeAwait } from './safe-await';

export const validateOrThrow = async <T extends ZodObject<any> | ZodEffects<any>>(schema: T, data: unknown): Promise<z.infer<T>> => {
  const validation = await safeAwait(schema.parseAsync(data));

  if (validation.error) {
    throw new Error((validation.error as any).issues);
  }

  return validation.result;
};
