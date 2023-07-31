import { validateReq } from '../../../middlewares/validateReq';
import { GetPredictionCitiesSchema } from '../schemas/getPredictionCitiesSchema';

export const validateGetPredictionCitiesReq = validateReq(
  GetPredictionCitiesSchema
);
