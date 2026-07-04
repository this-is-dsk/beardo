import React from "react";

const DeliveryProgress = ({ progress, location }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 mt-5">

      <div className="flex justify-between items-center">

        <h2 className="text-[18px] font-bold text-[#111]">
          Delivery Progress
        </h2>

        <span className="text-[#e30613] font-bold text-lg">
          {progress}%
        </span>

      </div>

      <div className="mt-5">

        <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">

          <div
            className="h-full bg-[#e30613] transition-all duration-700 rounded-full"
            style={{ width: `${progress}%` }}
          />

        </div>

      </div>

      <div className="mt-5">

        <p className="text-sm text-gray-500">
          Current Location
        </p>

        <h3 className="text-lg font-bold text-[#111] mt-1">
          📍 {location}
        </h3>

      </div>

    </div>
  );
};

export default DeliveryProgress;