import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL:
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline',
});
