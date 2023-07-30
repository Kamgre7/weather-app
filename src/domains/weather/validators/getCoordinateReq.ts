import { validateReq } from '../../../middlewares/validateReq';
import { GetCoordinateSchema } from '../schemas/getCoordinateSchema';

export const validateGetCoordinateReq = validateReq(GetCoordinateSchema);
