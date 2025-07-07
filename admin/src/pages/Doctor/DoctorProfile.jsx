import React, { useState } from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorProfile = () => {
  const { profileData, getProfileData, token, backendUrl, setProfileData } = useContext(DoctorContext);

  const [isEdit, setIsEdit] = useState(false);

  const { currency } = useContext(AppContext);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: JSON.stringify(profileData.address),
        fees: profileData.fees,
        available: profileData.available,
      };
      const { data } = await axios.post(backendUrl + "/api/doctor/update-profile", updateData, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getProfileData();
    }
  }, [token]);

  return (
    profileData && (
      <div>
        <div className="flex flex-col gap-4 m-5">
          <div>
            <img className="bg-primary/80 w-full sm:max-w-64 rounded-lg" src={profileData.image} alt="" />
          </div>

          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
            {/* Doc Info name , degree exp */}
            <p className="text-3xl font-medium text-gray-700">{profileData.name}</p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {profileData.degree} - {profileData.speciality}
              </p>
              <button className="py-0.5 px-2 border border-gray-400/80 text-sm rounded-full">
                {profileData.experience}
              </button>
            </div>

            {/* ----- doctor's about -------- */}
            <div>
              <p className="text-sm font-medium text-neutral-800 mt-3">About:</p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">{profileData.about}</p>
            </div>

            <p className="text-gray-600 font-medium mt-3">
              Appointment fee:{" "}
              <span className="text-gray-800">
                {currency}{" "}
                {isEdit ? (
                  <input
                    type="number"
                    value={profileData.fees}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, fees: e.target.value }))}
                  />
                ) : (
                  profileData.fees
                )}
              </span>
            </p>

            <div className="flex gap-2 py-2">
              <p>Address:</p>
              <p className="text-sm">
                {isEdit ? (
                  <input
                    type="text"
                    value={profileData.address.line1}
                    onChange={(e) =>
                      setProfileData((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))
                    }
                  />
                ) : (
                  profileData.address.line1
                )}
                <br />
                {isEdit ? (
                  <input
                    type="text"
                    value={profileData.address.line2}
                    onChange={(e) =>
                      setProfileData((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))
                    }
                  />
                ) : (
                  profileData.address.line2
                )}
              </p>
            </div>
            <div className="flex gap-1 pt-2">
              <input
                type="checkbox"
                checked={profileData.available}
                onChange={() => isEdit && setProfileData((prev) => ({ ...prev, available: !prev.available }))}
              />
              <label htmlFor="">Available</label>
            </div>
            {isEdit ? (
              <button
                onClick={() => updateProfile()}
                className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
