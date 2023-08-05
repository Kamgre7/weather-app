import { AxiosInstance } from 'axios';
import { DailyWeatherApiResponse } from '../types/weatherApi';
import { Coordinates } from '../services/weatherService';
import { FromToDates } from '../controllers/weatherController';
import { weatherHttpClient } from '../../../httpClient/weatherHttpClient';

export interface IWeatherApiAdapter {
  getByCoordinates(
    coordinates: Coordinates,
    key: string
  ): Promise<DailyWeatherApiResponse>;
  getByDayAndCity(
    city: string,
    key: string,
    day?: string
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

export class WeatherApiAdapter implements IWeatherApiAdapter {
  constructor(
    private readonly weatherHttpClient: AxiosInstance = weatherHttpClient
  ) {}

  async getByDayAndCity(
    city: string,
    key: string,
    day: string = 'today'
  ): Promise<DailyWeatherApiResponse> {
    try {
      const { data }: { data: DailyWeatherApiResponse } =
        await this.weatherHttpClient.get(`${city}/${day}`, {
          params: {
            unitGroup: 'metric',
            key,
            contentType: 'json',
          },
        });

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getByCoordinates(
    coordinates: Coordinates,
    key: string
  ): Promise<DailyWeatherApiResponse> {
    try {
      const { data }: { data: DailyWeatherApiResponse } =
        await this.weatherHttpClient.get(
          `${coordinates.lat}, ${coordinates.lon}/today`,
          {
            params: {
              unitGroup: 'metric',
              key,
              contentType: 'json',
            },
          }
        );

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getByDatesAndCity(
    fromTo: FromToDates,
    city: string,
    key: string
  ): Promise<DailyWeatherApiResponse> {
    try {
      const { data }: { data: DailyWeatherApiResponse } =
        await this.weatherHttpClient.get(
          `${city}/${fromTo.from}/${fromTo.to}`,
          {
            params: {
              unitGroup: 'metric',
              key,
              contentType: 'json',
            },
          }
        );

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getByDatesAndCoordinates(
    fromToDate: FromToDates,
    coordinates: Coordinates,
    key: string
  ): Promise<DailyWeatherApiResponse> {
    try {
      const { data }: { data: DailyWeatherApiResponse } =
        await this.weatherHttpClient.get(
          `${coordinates.lat},${coordinates.lon}/${fromToDate.from}/${fromToDate.to}`,
          {
            params: {
              unitGroup: 'metric',
              key,
              contentType: 'json',
            },
          }
        );

      return data;
    } catch (error) {
      throw error;
    }
  }
}

export const weatherApi = new WeatherApiAdapter(weatherHttpClient);
