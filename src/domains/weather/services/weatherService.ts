import { DailyWeatherApiResponse } from '../types/weatherApi';
import { FromToDates } from '../controllers/weatherController';
import { IWeatherApi, weatherApi } from '../api/weatherApi';

export type Coordinates = {
  lat: number;
  lon: number;
};

export interface IWeatherService {
  getByCity(city: string, key: string): Promise<DailyWeatherApiResponse>;
  getByCoordinates(
    coordinates: Coordinates,
    key: string
  ): Promise<DailyWeatherApiResponse>;
  getByDayAndCity(
    day: string,
    city: string,
    key: string
  ): Promise<DailyWeatherApiResponse>;
  getByDatesAndCity(
    fromTo: FromToDates,
    city: string,
    key: string
  ): Promise<DailyWeatherApiResponse>;
  getByDatesAndCoordinates(
    fromToDate: FromToDates,
    coordinates: Coordinates,
    key: string
  ): Promise<DailyWeatherApiResponse>;
}

export class WeatherService implements IWeatherService {
  constructor(private readonly weatherApi: IWeatherApi) {}

  async getByCity(city: string, key: string): Promise<DailyWeatherApiResponse> {
    const encodedCity = encodeURIComponent(city);

    return await this.weatherApi.getByCity(encodedCity, key);
  }

  async getByCoordinates(
    coordinates: Coordinates,
    key: string
  ): Promise<DailyWeatherApiResponse> {
    return this.weatherApi.getByCoordinates(coordinates, key);
  }

  async getByDayAndCity(
    day: string,
    city: string,
    key: string
  ): Promise<DailyWeatherApiResponse> {
    const encodedCity = encodeURIComponent(city);

    return await this.weatherApi.getByDayAndCity(day, encodedCity, key);
  }

  async getByDatesAndCity(
    fromTo: FromToDates,
    city: string,
    key: string
  ): Promise<DailyWeatherApiResponse> {
    const encodedCity = encodeURIComponent(city);

    return await this.weatherApi.getByDatesAndCity(fromTo, encodedCity, key);
  }

  async getByDatesAndCoordinates(
    fromToDate: FromToDates,
    coordinates: Coordinates,
    key: string
  ): Promise<DailyWeatherApiResponse> {
    return this.weatherApi.getByDatesAndCoordinates(
      fromToDate,
      coordinates,
      key
    );
  }
}

export const weatherService = new WeatherService(weatherApi);
