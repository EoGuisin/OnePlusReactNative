import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import store from './Redux';
import { Routes } from './routes'; 

const App = () => {
  LogBox.ignoreAllLogs()

  return (
    <Provider store={store}>
      <StatusBar backgroundColor="transparent" translucent={true} barStyle={'dark-content'} />
      <Routes />
    </Provider>
  )
};

export default App;