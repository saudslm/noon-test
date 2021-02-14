import React, {createContext, useState} from 'react';

export const AppContext = createContext();

const AppContextProvider = props => {
  const [error, setError] = useState({
    type: 'warning',
    message: ''
  });

  const onError = (type, message) => {
    setError({type, message});
  };

  return (
    <AppContext.Provider value={{
      error,
      onError
    }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;