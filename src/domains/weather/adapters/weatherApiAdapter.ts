import { AxiosInstance, AxiosResponse, isAxiosError } from 'axios';
import { weatherHttpClient } from '../../../httpClient/weatherHttpClient';
import { Weather, WeatherSchema } from '../schemas/weatherApiSchema';
import { Coordinates, DateRange } from '../schemas/utilsSchemas';
import { BadRequestError } from '../../../errors/BadRequestError';
import { AppError } from '../../../errors/AppError';

export interface IWeatherApiAdapter {
  getByCoordinates(coordinates: Coordinates, key: string): Promise<Weather>;
  getByDayAndCity(city: string, key: string, day?: string): Promise<Weather>;
  getByDatesAndCity(
    dateRange: DateRange,
    city: string,
    key: string
  ): Promise<Weather>;
  getByDatesAndCoordinates(
    dateRange: DateRange,
    coordinates: Coordinates,
    key: string
  ): Promise<Weather>;
}

export class WeatherApiAdapter implements IWeatherApiAdapter {
  constructor(
    private readonly weatherHttpClient: AxiosInstance = weatherHttpClient
  ) {}

  async getByDayAndCity(
    city: string,
    key: string,
    day: string = 'today'
  ): Promise<Weather> {
    try {
      const response: AxiosResponse<Weather> = await this.weatherHttpClient.get(
        `${city}/${day}`,
        {
          params: {
            unitGroup: 'metric',
            key,
            contentType: 'json',
          },
        }
      );

      return WeatherSchema.parse(response.data);
    } catch (error) {
      throw this.mapToAppError(error);
    }
  }

  async getByCoordinates(
    coordinates: Coordinates,
    key: string
  ): Promise<Weather> {
    try {
      const response: AxiosResponse<Weather> = await this.weatherHttpClient.get(
        `${coordinates.lat},${coordinates.lon}/today`,
        {
          params: {
            unitGroup: 'metric',
            key,
            contentType: 'json',
          },
        }
      );

      return WeatherSchema.parse(response.data);
    } catch (error) {
      throw this.mapToAppError(error);
    }
  }

  async getByDatesAndCity(
    dateRange: DateRange,
    city: string,
    key: string
  ): Promise<Weather> {
    try {
      const response: AxiosResponse<Weather> = await this.weatherHttpClient.get(
        `${city}/${dateRange.from}/${dateRange.to}`,
        {
          params: {
            unitGroup: 'metric',
            key,
            contentType: 'json',
          },
        }
      );

      return WeatherSchema.parse(response.data);
    } catch (error) {
      throw this.mapToAppError(error);
    }
  }

  async getByDatesAndCoordinates(
    dateRange: DateRange,
    coordinates: Coordinates,
    key: string
  ): Promise<Weather> {
    try {
      const response: AxiosResponse<Weather> = await this.weatherHttpClient.get(
        `${coordinates.lat},${coordinates.lon}/${dateRange.from}/${dateRange.to}`,
        {
          params: {
            unitGroup: 'metric',
            key,
            contentType: 'json',
          },
        }
      );

      return WeatherSchema.parse(response.data);
    } catch (error) {
      throw this.mapToAppError(error);
    }
  }

  private mapToAppError(error: unknown): AppError {
    return isAxiosError(error) && error.response
      ? new BadRequestError(error.message, error.response.status)
      : new AppError('Something went wrong', 500);
  }
}

export const weatherApi = new WeatherApiAdapter(weatherHttpClient);
