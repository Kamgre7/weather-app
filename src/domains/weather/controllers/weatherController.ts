import { Request, Response } from 'express';
import { IWeatherService, weatherService } from '../services/weatherService';
import { GetCityParams } from '../schemas/getCitySchema';
import { GetPredictionDayCityParams } from '../schemas/getPredictionDayCitySchema';
import { GetPredictionCitiesParams } from '../schemas/getPredictionCitiesSchema';
import { CoordinateSchema, DateSchema } from '../schemas/utilsSchemas';

export interface IWeatherCityController {
  getCity(req: Request, res: Response): Promise<void>;
  getByCoordinates(req: Request, res: Response): Promise<void>;
  getPredictionByDayAndCity(req: Request, res: Response): Promise<void>;
  getPredictionByDatesAndCity(req: Request, res: Response): Promise<void>;
  getPredictionByDatesAndCoordinates(
    req: Request,
    res: Response
  ): Promise<void>;
}

export class WeatherCityController implements IWeatherCityController {
  constructor(private readonly weatherService: IWeatherService) {}

  getCity = async (req: Request, res: Response): Promise<void> => {
    const weatherApiKey: string = res.locals.weatherApiKey;
    const { city } = GetCityParams.parse(req.params);

    const result = await this.weatherService.getByCity(city, weatherApiKey);

    res.status(200).json(result);
  };

  getByCoordinates = async (req: Request, res: Response): Promise<void> => {
    const coordinates = CoordinateSchema.parse({
      lat: req.params.lat,
      lon: req.params.lon,
    });
    const weatherApiKey: string = res.locals.weatherApiKey;

    const result = await this.weatherService.getByCoordinates(
      coordinates,
      weatherApiKey
    );

    res.status(200).json(result);
  };

  getPredictionByDayAndCity = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { day, city } = GetPredictionDayCityParams.parse(req.params);
    const weatherApiKey: string = res.locals.weatherApiKey;

    const result = await this.weatherService.getByDayAndCity(
      day,
      city,
      weatherApiKey
    );

    res.status(200).json(result);
  };

  getPredictionByDatesAndCity = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const dateRange = DateSchema.parse(req.query);
    const { city } = GetPredictionCitiesParams.parse(req.params);
    const weatherApiKey: string = res.locals.weatherApiKey;

    const result = await this.weatherService.getByDatesAndCity(
      dateRange,
      city,
      weatherApiKey
    );

    res.status(200).json(result);
  };

  getPredictionByDatesAndCoordinates = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const dateRange = DateSchema.parse(req.query);
    const coordinates = CoordinateSchema.parse({
      lat: req.params.lat,
      lon: req.params.lon,
    });
    const weatherApiKey: string = res.locals.weatherApiKey;

    const result = await this.weatherService.getByDatesAndCoordinates(
      dateRange,
      coordinates,
      weatherApiKey
    );

    res.status(200).json(result);
  };
}

export const weatherCityController = new WeatherCityController(weatherService);
