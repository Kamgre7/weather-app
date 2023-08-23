import nock from 'nock';
import {
  IWeatherApiAdapter,
  WeatherApiAdapter,
} from '../adapters/weatherApiAdapter';
import { IWeatherService, WeatherService } from '../services/weatherService';
import axios from 'axios';
import { weatherApiData } from './weatherApiData';
import { WeatherHttpClientSchema } from '../../../httpClient/weatherHttpClientSchemas';
import { getFutureDateString } from './utils';

describe('Weather service', () => {
  let baseURL: string;
  let weatherApiAdapter: IWeatherApiAdapter;
  let weatherService: IWeatherService;
  let queryString: {
    unitGroup: string;
    key: string;
    contentType: string;
  };

  let tomorrowDate: string;
  let tenDaysLaterDate: string;

  let dateRange: {
    from: string;
    to: string;
  };

  beforeAll(() => {
    baseURL = WeatherHttpClientSchema.parse(process.env.TEST_WEATHER_BASE_URL);

    tomorrowDate = getFutureDateString(1);
    tenDaysLaterDate = getFutureDateString(10);

    dateRange = {
      from: tomorrowDate,
      to: tenDaysLaterDate,
    };

    queryString = {
      unitGroup: 'metric',
      key: '123456',
      contentType: 'json',
    };

    nock(baseURL)
      //getByCity
      .get('/london/today')
      .query(queryString)
      .reply(200, weatherApiData)
      // getByCoordinates
      .get('/50,100/today')
      .query(queryString)
      .reply(200, weatherApiData)
      //getByDatesAndCity
      .get(`/london/${tomorrowDate}/${tenDaysLaterDate}`)
      .query(queryString)
      .reply(200, weatherApiData)
      //getByDatesAndCoordinates
      .get(`/50,100/${tomorrowDate}/${tenDaysLaterDate}`)
      .query(queryString)
      .reply(200, weatherApiData);

    weatherApiAdapter = new WeatherApiAdapter(axios.create({ baseURL }));

    weatherService = new WeatherService(weatherApiAdapter);
  });

  it('Should return response from /city/today', async () => {
    const result = await weatherService.getByCity('london', queryString.key);

    expect(result).toStrictEqual(weatherApiData);
  });

  it('Should return response from /coordinates/today', async () => {
    const coordinates = {
      lat: 50,
      lon: 100,
    };

    const result = await weatherService.getByCoordinates(
      coordinates,
      queryString.key
    );

    expect(result).toStrictEqual(weatherApiData);
  });

  it('Should return response from /city/dateRange', async () => {
    const result = await weatherService.getByDatesAndCity(
      dateRange,
      'london',
      queryString.key
    );

    expect(result).toStrictEqual(weatherApiData);
  });

  it('Should return response from /coordinates/dateRange', async () => {
    const coordinates = {
      lat: 50,
      lon: 100,
    };

    const result = await weatherService.getByDatesAndCoordinates(
      dateRange,
      coordinates,
      queryString.key
    );

    expect(result).toStrictEqual(weatherApiData);
  });
});
