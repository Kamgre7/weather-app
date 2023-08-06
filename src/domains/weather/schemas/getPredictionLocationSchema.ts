import { z } from 'zod';
import {
  CoordinateSchema,
  DateSchema,
  validateRangeOfDate,
} from './utilsSchemas';

export const GetPredictionLocationSchema = z.object({
  params: CoordinateSchema,
  query: DateSchema.refine((value) =>
    validateRangeOfDate(value.from, value.to)
  ),
});

export type GetPredictionLocationReq = z.infer<
  typeof GetPredictionLocationSchema
>;
