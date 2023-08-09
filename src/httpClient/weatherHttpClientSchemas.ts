import { z } from 'zod';

export const WeatherHttpClientSchema = z.string().nonempty().url();
