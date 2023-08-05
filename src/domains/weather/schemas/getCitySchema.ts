import { z } from 'zod';
import { CitySchema } from './utilsSchemas';

export const GetCityParams = z.object({
  city: CitySchema,
});

export const GetCitySchema = z.object({
  params: GetCityParams,
});

export type GetCityReq = z.infer<typeof GetCitySchema>;
