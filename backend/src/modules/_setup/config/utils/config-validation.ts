import { z } from 'zod';

export const envValidationSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),

  DATABASE_FILE: z.string().default('file:./remotenv.db'),

  THROTTLE_TTL: z.preprocess(parseInt, z.number()).default(60),
  THROTTLE_LIMIT: z.preprocess(parseInt, z.number()).default(10),

  API_PORT: z.preprocess(parseInt, z.number()).default(3420),
  API_HOST: z.string().default('0.0.0.0'),
  API_PREFIX: z.string().default('api/v1'),
  STATIC_PATH: z.string().default('../app'),
});
