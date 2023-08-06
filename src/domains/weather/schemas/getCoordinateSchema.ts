import { z } from 'zod';
import { CoordinateSchema } from './utilsSchemas';

export const GetCoordinateSchema = z.object({
  params: CoordinateSchema,
});

export type GetCoordinateReq = z.infer<typeof GetCoordinateSchema>;
