import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './Redux/store';
import WeatherContainer from './components/WeatherContainer';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <WeatherContainer />
      </div>
    </Provider>
  );
};

export default App;
