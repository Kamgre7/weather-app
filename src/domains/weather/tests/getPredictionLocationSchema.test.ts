import { GetPredictionLocationSchema } from '../schemas/getPredictionLocationSchema';
import { CoordinateSchema } from '../schemas/utilsSchemas';

describe('Prediction location schema', () => {
  let predictionLocationParams: {
    lat: unknown;
    lon: unknown;
  };

  let dateRange: {
    from: unknown;
    to: unknown;
  };

  let getPredictionLocation: {
    params: typeof predictionLocationParams;
    query: typeof dateRange;
  };

  let tomorrowDate: Date;
  let tomorrowStringType: string;
  let tenDaysLaterDate: Date;
  let tenDaysLaterStringType: string;

  beforeEach(() => {
    predictionLocationParams = {
      lat: '50',
      lon: '100',
    };

    tomorrowDate = new Date();
    tomorrowDate.setDate(new Date().getDate() + 1);
    tomorrowStringType = tomorrowDate.toISOString().split('T')[0];

    tenDaysLaterDate = new Date();
    tenDaysLaterDate.setDate(new Date().getDate() + 10);
    tenDaysLaterStringType = tenDaysLaterDate.toISOString().split('T')[0];

    dateRange = {
      from: tomorrowStringType,
      to: tenDaysLaterStringType,
    };

    getPredictionLocation = {
      params: predictionLocationParams,
      query: dateRange,
    };
  });

  describe('Coordinates schema', () => {
    it('Should return true - lat is in range from -90 to 90, and lon from -180 to 180;', () => {
      const coordinates = CoordinateSchema.safeParse(predictionLocationParams);

      expect(coordinates.success).toBe(true);
    });

    it('Should return false - lat and lon are not numbers', () => {
      predictionLocationParams.lat = 'test';
      predictionLocationParams.lon = 'test';

      const coordinates = CoordinateSchema.safeParse(predictionLocationParams);

      expect(coordinates.success).toBe(false);
    });

    it('Should return false - lat and lon are not in range lat: -90:90, lon:-180:180', () => {
      predictionLocationParams.lat = '150';
      predictionLocationParams.lon = '300';

      const coordinates = CoordinateSchema.safeParse(predictionLocationParams);

      expect(coordinates.success).toBe(false);
    });
  });

  describe('Prediction location schema', () => {
    it('Should return true - coordinates are valid, date range is correct', () => {
      const predictionLocation = GetPredictionLocationSchema.safeParse(
        getPredictionLocation
      );

      expect(predictionLocation.success).toBe(true);
    });

    it('Should return false - coordinates are incorrect', () => {
      predictionLocationParams.lat = '150';

      const predictionLocation = GetPredictionLocationSchema.safeParse(
        getPredictionLocation
      );

      expect(predictionLocation.success).toBe(false);
    });

    it('Should return false - query date  range values are not string', () => {
      getPredictionLocation.query.from = null;

      const predictionLocation = GetPredictionLocationSchema.safeParse(
        getPredictionLocation
      );

      expect(predictionLocation.success).toBe(false);
    });

    it('Should return false - query date from is grater than range to date', () => {
      getPredictionLocation.query.from = tenDaysLaterStringType;
      getPredictionLocation.query.to = tomorrowStringType;

      const predictionLocation = GetPredictionLocationSchema.safeParse(
        getPredictionLocation
      );

      expect(predictionLocation.success).toBe(false);
    });
  });
});
