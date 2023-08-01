import { z } from 'zod';
import { WeatherHeaderSchema } from './weatherHeaderSchema';
import { validateRangeOfDate } from '../../../utils/validateDates';
import { PredictionDateSchema } from './predictionDateSchema';

export const GetPredictionCitiesParams = z.object({
  city: z.string().nonempty(),
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
