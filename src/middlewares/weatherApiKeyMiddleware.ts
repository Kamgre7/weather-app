import { NextFunction, Request, Response } from 'express';
import { WeatherHeaderSchema } from '../domains/weather/schemas/utilsSchemas';
import { z } from 'zod';

export const weatherApiKeyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const headers = await WeatherHeaderSchema.parseAsync(req.headers);
    const weatherApiKey = headers['x-weather-api-key'];

    res.locals.weatherApiKey = weatherApiKey;
    next();
  } catch (error) {
    let err = error;
    if (err instanceof z.ZodError) {
      err = err.issues.map((e) => ({ path: e.path[0], message: e.message }));
    }
    return res.status(400).json({
      status: 'failed',
      error: err,
    });
  }
};