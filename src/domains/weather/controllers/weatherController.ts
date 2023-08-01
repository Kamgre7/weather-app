import { Request, Response } from 'express';
import { IWeatherService, weatherService } from '../services/weatherService';

export interface IWeatherCityController {
  // getCity(req: GetCityReq, res: Response): Promise<void>;
  getByCity(req: Request, res: Response): Promise<void>;
  //  getByCoordinates(req: GetCoordinateReq, res: Response): Promise<void>;
  getByCoordinates(req: Request, res: Response): Promise<void>;
  // getByDayAndCity(req: GetPredictionDayCityReq, res: Response): Promise<void>;
  getPredictionByDayAndCity(req: Request, res: Response): Promise<void>;
  //   getByBetweenDatesAndCity(req: GetPredictionCitiesReq, res: Response): Promise<void>;
  getPredictionByDatesAndCity(req: Request, res: Response): Promise<void>;
  //  getPredictionByDatesAndCoordinates( req: Request,  res: Response): Promise<void>;
  getPredictionByDatesAndCoordinates(
    req: Request,
    res: Response
  ): Promise<void>;
}

export type FromToDates = {
  from: string;
  to: string;
};

export class WeatherCityController implements IWeatherCityController {
  constructor(private readonly weatherService: IWeatherService) {}

  //getCity = async (req: GetCityReq, res: Response): Promise<void> => {
  getByCity = async (req: Request, res: Response): Promise<void> => {
    const { city } = req.params;
    const apiKey = req.headers['x-weather-api-key'] as string;

    const result = await this.weatherService.getByCity(city, apiKey);

    res.status(200).json(result);
  };

  //getByCoordinates = async (req: GetCoordinateReq, res: Response): Promise<void> => {
  getByCoordinates = async (req: Request, res: Response): Promise<void> => {
    const coordinates = {
      lat: parseFloat(req.params.lat),
      lon: parseFloat(req.params.lon),
    };
    const apiKey = req.headers['x-weather-api-key'] as string;

    const result = await this.weatherService.getByCoordinates(
      coordinates,
      apiKey
    );

    res.status(200).json(result);
  };

  // getByDayAndCity(req: GetPredictionDayCityReq, res: Response): Promise<void>;
  getPredictionByDayAndCity = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { day, city } = req.params;
    const apiKey = req.headers['x-weather-api-key'] as string;

    const result = await this.weatherService.getByDayAndCity(day, city, apiKey);

    res.status(200).json(result);
  };

  // getByBetweenDatesAndCity(req: GetPredictionCitiesReq, res: Response): Promise<void>;
  getPredictionByDatesAndCity = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const fromToDate = req.query as FromToDates;
    const { city } = req.params;
    const apiKey = req.headers['x-weather-api-key'] as string;

    const result = await this.weatherService.getByDatesAndCity(
      fromToDate,
      city,
      apiKey
    );

    res.status(200).json(result);
  };

  // getPredictionByDatesAndCoordinates( req: Request,  res: Response): Promise<void> =>
  getPredictionByDatesAndCoordinates = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const fromToDate = req.query as FromToDates;
    const coordinates = {
      lat: parseFloat(req.params.lat),
      lon: parseFloat(req.params.lon),
    };
    const apiKey = req.headers['x-weather-api-key'] as string;

    const result = await this.weatherService.getByDatesAndCoordinates(
      fromToDate,
      coordinates,
      apiKey
    );

    res.status(200).json(result);
  };
}

export const weatherCityController = new WeatherCityController(weatherService);
