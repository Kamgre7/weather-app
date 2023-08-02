import { z } from 'zod';
import {
  CitySchema,
  PredictionDateSchema,
  WeatherHeaderSchema,
} from './utilsSchemas';

export const GetPredictionDayCityParams = z.object({
  day: PredictionDateSchema,
  city: CitySchema,
});

export const GetPredictionDayCitySchema = z.object({
  params: GetPredictionDayCityParams,
  headers: WeatherHeaderSchema,
});

export type GetPredictionDayCityReq = z.infer<
  typeof GetPredictionDayCitySchema
>;
