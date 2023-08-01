import { z } from 'zod';
import { WeatherHeaderSchema } from './weatherHeaderSchema';
import { validateRangeOfDate } from '../../../utils/validateDates';
import { LatSchema, LonSchema } from './coordinateSchema';
import { PredictionDateSchema } from './predictionDateSchema';

export const GetPredictionLocationParams = z.object({
  lat: LatSchema,
  lon: LonSchema,
});

export const GetPredictionLocationQuery = z.object({
  from: PredictionDateSchema,
  to: PredictionDateSchema,
});

export const GetPredictionLocationSchema = z.object({
  params: GetPredictionLocationParams,
  query: GetPredictionLocationQuery.refine((value) =>
    validateRangeOfDate(value.from, value.to)
  ),
  headers: WeatherHeaderSchema,
});

export type GetPredictionLocationReq = z.infer<
  typeof GetPredictionLocationSchema
>;
