# Weather app

This application serves as a comprehensive weather information platform, allowing users to retrieve up-to-date weather data for specific cities and locations.

### Features

1. Weather Retrieval for Cities: Obtain current weather data for a specific city using the /cities/:city endpoint.

2. Location-Based Weather: Retrieve weather data for a particular geographic location using the /locations/:lat/:lon endpoint.

3. Predict Weather for Specific Date: Access weather predictions for a specific date and city using the /prediction/:day/:city endpoint.

4. Predict Weather in a Date Range: Get weather predictions for a specific city within a designated date range using the /prediction/cities/:city endpoint and the from and to query parameters.

5. Predict Weather for Location in a Date Range: Obtain weather predictions for a particular location within a specified date range using the /prediction/coordinates/:lat/:lon endpoint and the from and to query parameters.

6. Future-Date Restriction: Prevent access to /prediction\* endpoints for current and past dates, ensuring users access only future weather predictions.

7. User Authentication: Secure the app by validating user access through the X-Weather-API-KEY header, containing the required API key from Visual Crossing.

### 🚀 Technologies

- Node.js
- Express.js
- TypeScript
- Zod

### ✅ Requirements

Before starting, you need to have Git and Node installed.

### Run locally - backend

```bash
# Clone the project
$ git clone https://github.com/Kamgre7/weather-app.git

# Go to the project directory
$ cd weather-app

# Install dependencies
$ npm install

# Start the server
$ npm run start
```

### 🛠 API Reference

#### Get a weather for current date for a specific city

```http
  GET /weather/cities/:city
```

| Parameter | Type     | Description |
| :-------- | :------- | :---------- |
| `city`    | `String` | City        |
|           |

#### Get a weather for current date for a specific location

```http
  GET /weather/coordinates/:lat/:lon
```

| Parameter | Type     | Description              |
| :-------- | :------- | :----------------------- |
| `lat`     | `number` | Lat - min: -90 max: 90   |
| `lon`     | `number` | Lon - min: -180 max: 180 |
|           |

#### Get weather data for a specific date

```http
  GET /weather/cities/:city/prediction/:day
```

| Parameter | Type     | Description |
| :-------- | :------- | :---------- |
| `day`     | `string` | yyyy-mm-dd  |
| `city`    | `string` | City        |
|           |

#### Get a weather data for a specific city and specific data range. Accept as query params: from, to

```http
  GET /weather/cities/:city/prediction?from=yyyy-mm-ddd&to=yyyy-mm-dd
```

| Parameter | Type     | Description |
| :-------- | :------- | :---------- |
| `city`    | `string` | City        |
|           |

#### Get a weather data for a specific location and specific data range. Accept as query params: from, to

```http
  GET /weather/coordinates/:lat/:lon/prediction?from=yyyy-mm-ddd&to=yyyy-mm-dd
```

| Parameter | Type     | Description              |
| :-------- | :------- | :----------------------- |
| `lat`     | `number` | Lat - min: -90 max: 90   |
| `lon`     | `number` | Lon - min: -180 max: 180 |
|           |
