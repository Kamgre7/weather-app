import { z } from 'zod';
import { validateLat, validateLon } from '../../../utils/validateCoordinates';
import { WeatherHeaderSchema } from './weatherHeaderSchema';
import {
  dateIsGraterThanCurrentDate,
  validateRangeOfDate,
} from '../../../utils/validateDates';

export const GetPredictionLocationParams = z.object({
  lat: z
    .string()
    .nonempty()
    .refine((value) => validateLat(value))
    .transform((value) => parseFloat(value)),
  lon: z
    .string()
    .nonempty()
    .refine((value) => validateLon(value))
    .transform((value) => parseFloat(value)),
});

export const GetPredictionLocationQuery = z.object({
  from: z
    .string()
    .nonempty()
    .refine((date) => dateIsGraterThanCurrentDate(date)),
  to: z
    .string()
    .nonempty()
    .refine((date) => dateIsGraterThanCurrentDate(date)),
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
