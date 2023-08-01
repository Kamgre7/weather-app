import { z } from 'zod';
import { validateLat, validateLon } from '../../../utils/validateCoordinates';

export const LatSchema = z
  .string()
  .nonempty()
  .refine((value) => validateLat(value))
  .transform((value) => parseFloat(value));

export const LonSchema = z
  .string()
  .nonempty()
  .refine((value) => validateLon(value))
  .transform((value) => parseFloat(value));
