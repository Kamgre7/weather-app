import axios from 'axios';
import { WeatherHttpClientSchema } from './weatherHttpClientSchemas';

export const weatherHttpClient = axios.create({
  baseURL: WeatherHttpClientSchema.parse(process.env.WEATHER_BASE_URL),
});
