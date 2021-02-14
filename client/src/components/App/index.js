import React from 'react';

import AppContextProvider from '../../context/AppContext';
import MainTemplate from './MainTemplate';


import './style.css';

const App = () => {
  return (
    <AppContextProvider>
      <MainTemplate />
    </AppContextProvider>
  );
}

export default App;
