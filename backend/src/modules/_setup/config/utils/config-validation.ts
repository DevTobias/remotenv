import { z } from 'zod';

export const envValidationSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),

  DATABASE_FILE: z.string(),

  THROTTLE_TTL: z.preprocess(parseInt, z.number()),
  THROTTLE_LIMIT: z.preprocess(parseInt, z.number()),

  API_PORT: z.preprocess(parseInt, z.number()),
  API_HOST: z.string(),
  API_PREFIX: z.string(),
  STATIC_PATH: z.string(),
});
