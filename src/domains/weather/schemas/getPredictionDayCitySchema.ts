import { z } from 'zod';
import { WeatherHeaderSchema } from './weatherHeaderSchema';
import { PredictionDateSchema } from './predictionDateSchema';

export const GetPredictionDayCityParams = z.object({
  day: PredictionDateSchema,
  city: z.string().nonempty(),
});

export const GetPredictionDayCitySchema = z.object({
  params: GetPredictionDayCityParams,
  headers: WeatherHeaderSchema,
});

export type GetPredictionDayCityReq = z.infer<
  typeof GetPredictionDayCitySchema
>;
