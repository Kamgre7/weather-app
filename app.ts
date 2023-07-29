import express from 'express';
import { appConfig } from './src/config/appConfig';
import { weatherRouter } from './src/routes/weatherRouter';

const app = express();

app.use(express.json());

app.use('/weather', weatherRouter);

app.listen(appConfig.port, appConfig.hostName, () => {
  console.log(`Listening on port ${appConfig.host}:${appConfig.port}`);
});
