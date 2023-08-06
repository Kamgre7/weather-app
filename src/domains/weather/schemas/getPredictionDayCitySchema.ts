import { z } from 'zod';
import { CitySchema, PredictionDateSchema } from './utilsSchemas';

export const GetPredictionDayCityParams = z.object({
  day: PredictionDateSchema,
  city: CitySchema,
});

export const GetPredictionDayCitySchema = z.object({
  params: GetPredictionDayCityParams,
});

export type GetPredictionDayCityReq = z.infer<
  typeof GetPredictionDayCitySchema
>;
