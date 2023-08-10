import { Router } from 'express';
import { weatherCityController } from '../domains/weather/controllers/weatherController';
import { requestValidator } from '../middlewares/requestValidator';
import { GetCitySchema } from '../domains/weather/schemas/getCitySchema';
import { GetCoordinateSchema } from '../domains/weather/schemas/getCoordinateSchema';
import { GetPredictionCitiesSchema } from '../domains/weather/schemas/getPredictionCitiesSchema';
import { GetPredictionLocationSchema } from '../domains/weather/schemas/getPredictionLocationSchema';
import { GetPredictionDayCitySchema } from '../domains/weather/schemas/getPredictionDayCitySchema';
import { weatherApiKeyValidator } from '../middlewares/weatherApiKeyValidator';

export const weatherRouter = Router();

weatherRouter
  .route('/cities/:city')
  .get(
    weatherApiKeyValidator,
    requestValidator(GetCitySchema),
    weatherCityController.getCity
  );

weatherRouter
  .route('/coordinates/:lat/:lon')
  .get(
    weatherApiKeyValidator,
    requestValidator(GetCoordinateSchema),
    weatherCityController.getByCoordinates
  );

weatherRouter
  .route('/cities/:city/prediction')
  .get(
    weatherApiKeyValidator,
    requestValidator(GetPredictionCitiesSchema),
    weatherCityController.getPredictionByDatesAndCity
  );

weatherRouter
  .route('/coordinates/:lat/:lon/prediction')
  .get(
    weatherApiKeyValidator,
    requestValidator(GetPredictionLocationSchema),
    weatherCityController.getPredictionByDatesAndCoordinates
  );

weatherRouter
  .route('/cities/:city/prediction/:day')
  .get(
    weatherApiKeyValidator,
    requestValidator(GetPredictionDayCitySchema),
    weatherCityController.getPredictionByDayAndCity
  );
