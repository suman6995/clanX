// src/redux/actions/weatherActions.js

export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';

export const fetchWeatherSuccess = (data) => ({
  type: FETCH_WEATHER_SUCCESS,
  payload: data,
});

