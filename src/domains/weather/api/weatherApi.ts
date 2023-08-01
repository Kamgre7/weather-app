import { AxiosInstance } from 'axios';
import { axiosInstance } from '../../../config/axiosConfig';
import { DailyWeatherApiResponse } from '../types/weatherApi';
import { Coordinates } from '../services/weatherService';
import { FromToDates } from '../controllers/weatherController';

export interface IWeatherApi {
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

export class WeatherApi implements IWeatherApi {
  constructor(private readonly axios: AxiosInstance = axiosInstance) {}

  async getByCity(city: string, key: string): Promise<DailyWeatherApiResponse> {
    try {
      const { data }: { data: DailyWeatherApiResponse } = await this.axios.get(
        `${city}/today`,
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

  async getByCoordinates(
    coordinates: Coordinates,
    key: string
  ): Promise<DailyWeatherApiResponse> {
    try {
      const { data }: { data: DailyWeatherApiResponse } = await this.axios.get(
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

  async getByDayAndCity(
    day: string,
    city: string,
    key: string
  ): Promise<DailyWeatherApiResponse> {
    try {
      const { data }: { data: DailyWeatherApiResponse } = await this.axios.get(
        `${city}/${day}`,
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
      const { data }: { data: DailyWeatherApiResponse } = await this.axios.get(
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
      const { data }: { data: DailyWeatherApiResponse } = await this.axios.get(
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

export const weatherApi = new WeatherApi();
