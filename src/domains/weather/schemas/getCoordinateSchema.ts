import { z } from 'zod';
import { LatSchema, LonSchema, WeatherHeaderSchema } from './utilsSchemas';

export const GetCoordinateParams = z.object({
  lat: LatSchema,
  lon: LonSchema,
});

export const GetCoordinateSchema = z.object({
  params: GetCoordinateParams,
  headers: WeatherHeaderSchema,
});

export type GetCoordinateReq = z.infer<typeof GetCoordinateSchema>;
