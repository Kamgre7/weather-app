import { validateReq } from '../../../middlewares/validateReq';
import { GetPredictionLocationSchema } from '../schemas/getPredictionLocationSchema';

export const validateGetPredictionLocationReq = validateReq(
  GetPredictionLocationSchema
);
