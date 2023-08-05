import { z } from 'zod';
import {
  CitySchema,
  PredictionDateSchema,
  WeatherHeaderSchema,
  validateRangeOfDate,
} from './utilsSchemas';

export const GetPredictionCitiesParams = z.object({
  city: CitySchema,
});

export const GetPredictionCitiesQuery = z.object({
  from: PredictionDateSchema,
  to: PredictionDateSchema,
});

export const GetPredictionCitiesSchema = z.object({
  params: GetPredictionCitiesParams,
  query: GetPredictionCitiesQuery.refine((value) =>
    validateRangeOfDate(value.from, value.to)
  ),
  headers: WeatherHeaderSchema,
});

export type GetPredictionCitiesReq = z.infer<typeof GetPredictionCitiesSchema>;
