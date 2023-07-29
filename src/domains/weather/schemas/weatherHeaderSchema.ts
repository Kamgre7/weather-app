import { z } from 'zod';

export const weatherHeaderSchema = z.object({
  'x-weather-api-key': z.string().nonempty(),
});
