import axios from 'axios';
import { z } from 'zod';

export const WeatherHttpClientSchema = z.string().nonempty().url();

export const weatherHttpClient = axios.create({
  baseURL: WeatherHttpClientSchema.parse(process.env.WEATHER_HTTP_CLIENT),
});
