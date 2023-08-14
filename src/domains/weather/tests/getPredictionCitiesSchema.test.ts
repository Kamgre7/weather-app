import {
  GetPredictionCitiesParams,
  GetPredictionCitiesSchema,
} from '../schemas/getPredictionCitiesSchema';
import { getFutureDateString } from './utils';

describe('Prediction cities schema', () => {
  let predictionCitiesParams: {
    city: unknown;
  };

  let dateRange: {
    from: unknown;
    to: unknown;
  };

  let getPredictionCities: {
    params: typeof predictionCitiesParams;
    query: typeof dateRange;
  };

  let tomorrowDate: string;
  let tenDaysLaterDate: string;

  beforeEach(() => {
    predictionCitiesParams = {
      city: 'London',
    };

    tomorrowDate = getFutureDateString(1);
    tenDaysLaterDate = getFutureDateString(10);

    dateRange = {
      from: tomorrowDate,
      to: tenDaysLaterDate,
    };

    getPredictionCities = {
      params: predictionCitiesParams,
      query: dateRange,
    };
  });

  describe('City schema', () => {
    it('Should return true - city is a nonempty string', () => {
      const city = GetPredictionCitiesParams.safeParse(predictionCitiesParams);

      expect(city.success).toBe(true);
    });

    it('Should return false - city is not a string', () => {
      predictionCitiesParams.city = 1234;

      const city = GetPredictionCitiesParams.safeParse(predictionCitiesParams);

      expect(city.success).toBe(false);
    });
  });

  describe('Prediction cities schema', () => {
    it('Should return true - city is string, date range is correct', () => {
      const predictionCity =
        GetPredictionCitiesSchema.safeParse(getPredictionCities);

      expect(predictionCity.success).toBe(true);
    });

    it('Should return false - city is not string', () => {
      getPredictionCities.params.city = 431;

      const predictionCity =
        GetPredictionCitiesSchema.safeParse(getPredictionCities);

      expect(predictionCity.success).toBe(false);
    });

    it('Should return false - query date  range values are not string', () => {
      getPredictionCities.query.from = null;

      const predictionCity =
        GetPredictionCitiesSchema.safeParse(getPredictionCities);

      expect(predictionCity.success).toBe(false);
    });

    it('Should return false - query date from is grater than range to date', () => {
      getPredictionCities.query.from = tenDaysLaterDate;
      getPredictionCities.query.to = tomorrowDate;

      const predictionCity =
        GetPredictionCitiesSchema.safeParse(getPredictionCities);

      expect(predictionCity.success).toBe(false);
    });
  });
});
