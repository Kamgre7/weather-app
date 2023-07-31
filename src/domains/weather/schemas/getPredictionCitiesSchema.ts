import { z } from 'zod';
import { WeatherHeaderSchema } from './weatherHeaderSchema';
import {
  dateIsGraterThanCurrentDate,
  validateRangeOfDate,
} from '../../../utils/validateDates';

export const GetPredictionCitiesParams = z.object({
  city: z.string().nonempty(),
});

export const GetPredictionCitiesQuery = z.object({
  from: z
    .string()
    .nonempty()
    .refine((date) => dateIsGraterThanCurrentDate(date)),
  to: z
    .string()
    .nonempty()
    .refine((date) => dateIsGraterThanCurrentDate(date)),
});

export const GetPredictionCitiesSchema = z.object({
  params: GetPredictionCitiesParams,
  query: GetPredictionCitiesQuery.refine((value) =>
    validateRangeOfDate(value.from, value.to)
  ),
  headers: WeatherHeaderSchema,
});

export type GetPredictionCitiesReq = z.infer<typeof GetPredictionCitiesSchema>;
