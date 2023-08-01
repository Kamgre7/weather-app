import { Router } from 'express';
import { validateGetCityReq } from '../domains/weather/validators/getCityReq';
import { weatherCityController } from '../domains/weather/controllers/weatherController';
import { validateGetCoordinateReq } from '../domains/weather/validators/getCoordinateReq';
import { validateGetPredictionDayCityReq } from '../domains/weather/validators/getPredictionDayCityReq';
import { validateGetPredictionCitiesReq } from '../domains/weather/validators/getPredictionCitiesReq';
import { validateGetPredictionLocationReq } from '../domains/weather/validators/getPredictionLocationReq';

export const weatherRouter = Router();

weatherRouter
  .route('/cities/:city')
  .get(validateGetCityReq, weatherCityController.getByCity);

weatherRouter
  .route('/locations/:lat/:lon')
  .get(validateGetCoordinateReq, weatherCityController.getByCoordinates);

weatherRouter
  .route('/prediction/cities/:city')
  .get(
    validateGetPredictionCitiesReq,
    weatherCityController.getPredictionByDatesAndCity
  );

weatherRouter
  .route('/prediction/coordinates/:lat/:lon')
  .get(
    validateGetPredictionLocationReq,
    weatherCityController.getPredictionByDatesAndCoordinates
  );

weatherRouter
  .route('/prediction/:day/:city')
  .get(
    validateGetPredictionDayCityReq,
    weatherCityController.getPredictionByDayAndCity
  );
