import { Router } from 'express';
import { weatherCityController } from '../domains/weather/controllers/weatherController';
import { validateReq } from '../middlewares/validateReq';
import { GetCitySchema } from '../domains/weather/schemas/getCitySchema';
import { GetCoordinateSchema } from '../domains/weather/schemas/getCoordinateSchema';
import { GetPredictionCitiesSchema } from '../domains/weather/schemas/getPredictionCitiesSchema';
import { GetPredictionLocationSchema } from '../domains/weather/schemas/getPredictionLocationSchema';
import { GetPredictionDayCitySchema } from '../domains/weather/schemas/getPredictionDayCitySchema';
import { weatherApiKeyMiddleware } from '../middlewares/weatherApiKeyMiddleware';

export const weatherRouter = Router();

weatherRouter
  .route('/cities/:city')
  .get(
    weatherApiKeyMiddleware,
    validateReq(GetCitySchema),
    weatherCityController.getCity
  );

weatherRouter
  .route('/locations/:lat/:lon')
  .get(
    weatherApiKeyMiddleware,
    validateReq(GetCoordinateSchema),
    weatherCityController.getByCoordinates
  );

weatherRouter
  .route('/prediction/cities/:city')
  .get(
    weatherApiKeyMiddleware,
    validateReq(GetPredictionCitiesSchema),
    weatherCityController.getPredictionByDatesAndCity
  );

weatherRouter
  .route('/prediction/coordinates/:lat/:lon')
  .get(
    weatherApiKeyMiddleware,
    validateReq(GetPredictionLocationSchema),
    weatherCityController.getPredictionByDatesAndCoordinates
  );

weatherRouter
  .route('/prediction/:day/:city')
  .get(
    weatherApiKeyMiddleware,
    validateReq(GetPredictionDayCitySchema),
    weatherCityController.getPredictionByDayAndCity
  );
