import { z } from 'zod';
import { CitySchema, WeatherHeaderSchema } from './utilsSchemas';

export const GetCityParams = z.object({
  city: CitySchema,
});

export const GetCitySchema = z.object({
  params: GetCityParams,
  headers: WeatherHeaderSchema,
});

export type GetCityReq = z.infer<typeof GetCitySchema>;
