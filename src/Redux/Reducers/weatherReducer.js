// src/redux/reducers/weatherReducer.js

import { FETCH_WEATHER_SUCCESS } from '../Actions/weatherActions';

const initialState = {
  weatherData: null,
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEATHER_SUCCESS:
      return {
        ...state,
        weatherData: action.payload,
      };
    default:
      return state;
  }
};

export default weatherReducer;
