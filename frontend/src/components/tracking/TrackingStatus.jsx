import React from "react";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";

const TrackingStatus = ({ location, progress, eta }) => {

  const getETA = () => {

    if (progress >= 100) return "Delivered";

    if (progress >= 80) return "10 Minutes";

    if (progress >= 60) return "25 Minutes";

    if (progress >= 40) return "45 Minutes";

    if (progress >= 20) return "1 Hour";

    return "2 Hours";

  };

  return (

    <div className="bg-white rounded-3xl shadow-lg p-6 mt-5">

      <div className="flex items-center justify-between">

        <h2 className="text-[18px] font-bold text-[#111]">

          Live Status

        </h2>

        <div className="flex items-center gap-2">

          <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>

          <span className="text-sm font-semibold text-green-600">

            LIVE

          </span>

        </div>

      </div>

      <div className="mt-6 flex items-start gap-4">

        <div className="w-12 h-12 rounded-full bg-[#e30613] flex items-center justify-center">

          <FaMapMarkerAlt className="text-white"/>

        </div>

        <div>

          <p className="text-sm text-gray-500">

            Current Hub

          </p>

          <h3 className="text-lg font-bold text-[#111] mt-1">

            {location}

          </h3>

        </div>

      </div>

      <div className="mt-6 flex items-start gap-4">

        <div className="w-12 h-12 rounded-full bg-[#111] flex items-center justify-center">

          <FaClock className="text-white"/>

        </div>

        <div>

          <p className="text-sm text-gray-500">

            Estimated Arrival

          </p>

          <h3 className="text-lg font-bold text-[#111] mt-1">

  {eta || getETA()}

</h3>

        </div>

      </div>

    </div>

  );

};

export default TrackingStatus;