/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = React.createContext();

const AppContextProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(false);
  const currencySymbol = "$";

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctorsData = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/doctor/list`);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/profile`, { headers: { token } });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllDoctorsData();
  }, []);

  useEffect(() => {
    token ? loadUserProfileData() : setUserData(false);
  }, [token]);

  const value = {
    doctors,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
    getAllDoctorsData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
