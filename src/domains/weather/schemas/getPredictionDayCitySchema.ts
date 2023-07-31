import { z } from 'zod';
import { WeatherHeaderSchema } from './weatherHeaderSchema';
import { dateIsGraterThanCurrentDate } from '../../../utils/validateDates';

export const GetPredictionDayCityParams = z.object({
  day: z
    .string()
    .nonempty()
    .refine((date) => dateIsGraterThanCurrentDate(date)),
  city: z.string().nonempty(),
});

export const GetPredictionDayCitySchema = z.object({
  params: GetPredictionDayCityParams,
  headers: WeatherHeaderSchema,
});

export type GetPredictionDayCityReq = z.infer<
  typeof GetPredictionDayCitySchema
>;
