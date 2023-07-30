import { z } from 'zod';

export const WeatherHeaderSchema = z.object({
  'x-weather-api-key': z.string().nonempty(),
});
