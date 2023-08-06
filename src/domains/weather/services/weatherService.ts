import { IWeatherApiAdapter, weatherApi } from '../adapters/weatherApiAdapter';
import { Weather } from '../schemas/weatherApiSchema';
import { Coordinates, FromToDate } from '../schemas/utilsSchemas';

export interface IWeatherService {
  getByCity(city: string, key: string): Promise<Weather>;
  getByCoordinates(coordinates: Coordinates, key: string): Promise<Weather>;
  getByDayAndCity(day: string, city: string, key: string): Promise<Weather>;
  getByDatesAndCity(
    fromTo: FromToDate,
    city: string,
    key: string
  ): Promise<Weather>;
  getByDatesAndCoordinates(
    fromToDate: FromToDate,
    coordinates: Coordinates,
    key: string
  ): Promise<Weather>;
}

export class WeatherService implements IWeatherService {
  constructor(private readonly weatherApi: IWeatherApiAdapter) {}

  async getByCity(city: string, key: string): Promise<Weather> {
    const encodedCity = encodeURIComponent(city);

    return await this.weatherApi.getByDayAndCity(encodedCity, key);
  }

  async getByCoordinates(
    coordinates: Coordinates,
    key: string
  ): Promise<Weather> {
    return this.weatherApi.getByCoordinates(coordinates, key);
  }

  async getByDayAndCity(
    day: string,
    city: string,
    key: string
  ): Promise<Weather> {
    const encodedCity = encodeURIComponent(city);

    return await this.weatherApi.getByDayAndCity(encodedCity, key, day);
  }

  async getByDatesAndCity(
    fromTo: FromToDate,
    city: string,
    key: string
  ): Promise<Weather> {
    const encodedCity = encodeURIComponent(city);

    return await this.weatherApi.getByDatesAndCity(fromTo, encodedCity, key);
  }

  async getByDatesAndCoordinates(
    fromToDate: FromToDate,
    coordinates: Coordinates,
    key: string
  ): Promise<Weather> {
    return this.weatherApi.getByDatesAndCoordinates(
      fromToDate,
      coordinates,
      key
    );
  }
}

export const weatherService = new WeatherService(weatherApi);
