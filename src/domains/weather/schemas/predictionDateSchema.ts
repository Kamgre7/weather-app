import { z } from 'zod';
import { dateIsGraterThanCurrentDate } from '../../../utils/validateDates';

export const PredictionDateSchema = z
  .string()
  .nonempty()
  .refine((date) => dateIsGraterThanCurrentDate(date));
