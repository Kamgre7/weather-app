import { z } from 'zod';
import { weatherHeaderSchema } from './weatherHeaderSchema';

export const GetCityParams = z.object({
  city: z.string().nonempty(),
});

export const GetCitySchema = z.object({
  params: GetCityParams,
  headers: weatherHeaderSchema,
});

export type GetCityReq = z.infer<typeof GetCitySchema>;
