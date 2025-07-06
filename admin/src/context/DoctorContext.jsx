/* eslint-disable react-refresh/only-export-components */
import React from "react";

export const DoctorContext = React.createContext();

const DoctorContextProvider = ({ children }) => {
  const value = {};

  return <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>;
};

export default DoctorContextProvider;
