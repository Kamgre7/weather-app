import { validateReq } from '../../../middlewares/validateReq';
import { GetPredictionDayCitySchema } from '../schemas/getPredictionDayCitySchema';

export const validateGetPredictionDayCityReq = validateReq(
  GetPredictionDayCitySchema
);
