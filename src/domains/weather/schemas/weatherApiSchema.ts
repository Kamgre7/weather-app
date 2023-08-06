import { z } from 'zod';

export const StationSchema = z.object({
  distance: z.number(),
  latitude: z.number(),
  longitude: z.number(),
  useCount: z.number(),
  id: z.string(),
  name: z.string(),
  quality: z.number(),
  contribution: z.number(),
});
export type Station = z.infer<typeof StationSchema>;

export const HourlyConditionsSchema = z.object({
  datetime: z.string(),
  datetimeEpoch: z.number(),
  temp: z.number(),
  feelslike: z.number(),
  humidity: z.number(),
  dew: z.number(),
  precip: z.number(),
  precipprob: z.number(),
  snow: z.number(),
  snowdepth: z.number(),
  preciptype: z.union([z.array(z.string()), z.null()]),
  windgust: z.number(),
  windspeed: z.number(),
  winddir: z.number(),
  pressure: z.number(),
  cloudcover: z.number(),
  visibility: z.number(),
  solarradiation: z.number(),
  solarenergy: z.number(),
  uvindex: z.number(),
  severerisk: z.number(),
  conditions: z.string(),
  icon: z.string(),
  stations: z.union([z.array(z.string()), z.null()]),
  source: z.string(),
});

export const DaysSchema = HourlyConditionsSchema.extend({
  tempmax: z.number(),
  tempmin: z.number(),
  feelslikemax: z.number(),
  feelslikemin: z.number(),
  precipcover: z.number(),
  sunrise: z.string(),
  sunriseEpoch: z.number(),
  sunset: z.string(),
  sunsetEpoch: z.number(),
  moonphase: z.number(),
  description: z.string(),
  hours: z.array(HourlyConditionsSchema),
});
export type Days = z.infer<typeof DaysSchema>;

const CurrentConditionsOmitSchema = HourlyConditionsSchema.omit({
  severerisk: true,
});

const CurrentConditionsSchema = CurrentConditionsOmitSchema.extend({
  sunrise: z.string(),
  sunriseEpoch: z.number(),
  sunset: z.string(),
  sunsetEpoch: z.number(),
  moonphase: z.number(),
});

export const WeatherSchema = z.object({
  queryCost: z.number(),
  latitude: z.number(),
  longitude: z.number(),
  resolvedAddress: z.string(),
  address: z.string(),
  timezone: z.string(),
  tzoffset: z.number(),
  description: z.string().optional(),
  days: z.array(DaysSchema),
  alerts: z.array(z.any()).optional(),
  stations: z.record(z.string(), StationSchema).optional(),
  currentConditions: CurrentConditionsSchema.optional(),
});
export type Weather = z.infer<typeof WeatherSchema>;
