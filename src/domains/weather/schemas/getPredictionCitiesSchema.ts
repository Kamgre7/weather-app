import { z } from 'zod';
import { CitySchema, DateSchema, validateRangeOfDate } from './utilsSchemas';

export const GetPredictionCitiesParams = z.object({
  city: CitySchema,
});

export const GetPredictionCitiesSchema = z.object({
  params: GetPredictionCitiesParams,
  query: DateSchema.refine((value) =>
    validateRangeOfDate(value.from, value.to)
  ),
});

export type GetPredictionCitiesReq = z.infer<typeof GetPredictionCitiesSchema>;
