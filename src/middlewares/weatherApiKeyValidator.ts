import { NextFunction, Request, Response } from 'express';
import { WeatherHeaderSchema } from '../domains/weather/schemas/utilsSchemas';
import { z } from 'zod';
import { weatherHttpClient } from '../httpClient/weatherHttpClient';
import { UnauthorizedError } from '../errors/UnauthorizedError';

export const weatherApiKeyValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let weatherApiKey: string;

  try {
    const headers = await WeatherHeaderSchema.parseAsync(req.headers);

    weatherApiKey = headers['x-weather-api-key'];
  } catch (error) {
    let err = error;
    if (err instanceof z.ZodError) {
      err = err.issues.map((e) => ({ path: e.path[0], message: e.message }));
    }
    return res.status(400).json({
      error: err,
    });
  }

  try {
    await weatherHttpClient.get('/London/today', {
      params: { key: weatherApiKey },
    });

    res.locals.weatherApiKey = weatherApiKey;
    next();
  } catch (err) {
    throw new UnauthorizedError('Wrong x-weather-api-key');
  }
};
