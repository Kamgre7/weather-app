import { z } from 'zod';
import { WeatherHeaderSchema } from './weatherHeaderSchema';
import { validateLat, validateLon } from '../../../utils/validateCoordinates';

export const GetCoordinateParams = z.object({
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

export const GetCoordinateSchema = z.object({
  params: GetCoordinateParams,
  headers: WeatherHeaderSchema,
});

export type GetCoordinateReq = z.infer<typeof GetCoordinateSchema>;
