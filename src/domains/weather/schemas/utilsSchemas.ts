import { z } from 'zod';

const MIN_LAT = -90;
const MAX_LAT = 90;
const MIN_LON = -180;
const MAX_LON = 180;

export const CitySchema = z.string().nonempty();

export const LatSchema = z
  .string()
  .nonempty()
  .refine((value) => validateLat(value))
  .transform((value) => parseFloat(value));

export const LonSchema = z
  .string()
  .nonempty()
  .refine((value) => validateLon(value))
  .transform((value) => parseFloat(value));

export const CoordinateSchema = z.object({
  lat: LatSchema,
  lon: LonSchema,
});

export type Coordinates = z.infer<typeof CoordinateSchema>;

export const PredictionDateSchema = z
  .string()
  .nonempty()
  .refine((date) => dateIsGraterThanCurrentDate(date));

export const DateSchema = z.object({
  from: PredictionDateSchema,
  to: PredictionDateSchema,
});

export type FromToDate = z.infer<typeof DateSchema>;

export const WeatherHeaderSchema = z.object({
  'x-weather-api-key': z.string().nonempty(),
});

export const validateLat = (lat: string): boolean => {
  const numericValue = parseFloat(lat);

  return (
    !isNaN(numericValue) && numericValue >= MIN_LAT && numericValue <= MAX_LAT
  );
};

export const validateLon = (lon: string): boolean => {
  const numericValue = parseFloat(lon);

  return (
    !isNaN(numericValue) && numericValue >= MIN_LON && numericValue <= MAX_LON
  );
};

export const validateRangeOfDate = (from: string, to: string): boolean =>
  new Date(to) > new Date(from);

export const dateIsGraterThanCurrentDate = (date: string): boolean =>
  new Date(date) > new Date();
