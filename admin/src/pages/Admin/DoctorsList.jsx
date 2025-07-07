import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { getAllDoctors, doctors, aToken, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);
  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6 px-3 sm-px-0">
        {doctors.map((item, index) => (
          <div key={index} className="border border-blue-200 max-w-56 rounded-xl overflow-hidden cursor-pointer group">
            <img className="bg-blue-50 group-hover:bg-primary transition-all duration-500" src={item.image} alt="" />
            <div className="p-4">
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-small">{item.speciality}</p>
              <div className="flex mt-2 items-center gap-1 text-sm">
                <input
                  type="checkbox"
                  checked={item.available}
                  onChange={() => {
                    changeAvailability(item._id);
                  }}
                />
                <p>Availble</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
