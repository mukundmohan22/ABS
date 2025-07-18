import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const NavBar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { token, setToken } = useContext(DoctorContext);

  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");

    token && setToken("");
    token && localStorage.removeItem("token");
  };
  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-sm">
        <img className="w-36 sm:w-40 cursor-pointer" src={assets.admin_logo} alt="" />
        <p className="border px-2.5 py-0.5 rounded-full text-gray-600">{aToken ? "Admin" : "Doctor"}</p>
      </div>
      <button onClick={logout} className="bg-primary text-white text-sm px-10 py-2 rounded-full">
        Logout
      </button>
    </div>
  );
};

export default NavBar;
