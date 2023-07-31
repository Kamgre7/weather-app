import { validateReq } from '../../../middlewares/validateReq';
import { GetCitySchema } from '../schemas/getCitySchema';

export const validateGetCityReq = validateReq(GetCitySchema);
