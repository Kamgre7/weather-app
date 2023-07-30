import { z } from 'zod';
import { WeatherHeaderSchema } from './weatherHeaderSchema';

export const GetCityParams = z.object({
  city: z.string().nonempty(),
});

export const GetCitySchema = z.object({
  params: GetCityParams,
  headers: WeatherHeaderSchema,
});

export type GetCityReq = z.infer<typeof GetCitySchema>;
