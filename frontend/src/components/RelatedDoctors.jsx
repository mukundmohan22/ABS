import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ docId, speciality }) => {
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (doctors.length > 0 && docId && speciality) {
      // Filter doctors based on speciality and exclude the current doctor
      const relatedDoctors = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId);
      setRelDoc(relatedDoctors);
    }
  }, [doctors, docId, speciality]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 md:mx-10 text-gray-600">
      <h1 className="text-3xl font-medium">Related Doctors</h1>
      <p className="sm:w-1/3 text-center text-sm">Simply browse through our extensive list of trusted doctors.</p>

      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm-px-0">
        {relDoc.slice(0, 5).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            key={index}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
          >
            <img className="bg-blue-50" src={item.image} alt="" />
            <div className="p-4">
              <div
                className={`flex items-center gap-2 text-small text-center ${
                  item.available ? "text-green-500" : "text-gray-500"
                }`}
              >
                <p className={`w-2 h-2 ${item.available ? "bg-green-500" : "bg-gray-500 "}rounded-full`}></p>
                <p>{item.available ? "Available" : "Not Available"}</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-small">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;
