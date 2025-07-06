/* eslint-disable react-refresh/only-export-components */
import React from "react";

export const AppContext = React.createContext();

const AppContextProvider = ({ children }) => {
  const value = {};

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
