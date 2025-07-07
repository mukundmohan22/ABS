/* eslint-disable react-refresh/only-export-components */
import React from "react";

export const AppContext = React.createContext();

const currency = "$";

const AppContextProvider = ({ children }) => {
  const slotDateFormat = (slotDate) => {
    // Split the string into parts
    const [day, month, year] = slotDate.split("_").map(Number);

    // Create a Date object
    const date = new Date(year, month - 1, day); // month is 0-indexed

    // Format the date
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    return today.getFullYear() - birthDate.getFullYear();
  };
  const value = {
    calculateAge,
    slotDateFormat,
    currency,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
