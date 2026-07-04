import React from "react";
import { FaBox, FaTruck, FaHome } from "react-icons/fa";

const TrackingMap = ({ progress }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 mt-5">

      <h2 className="text-[18px] font-bold text-[#111] mb-8">
        Live Tracking
      </h2>

      <div className="relative h-24">

        {/* Gray Road */}

        <div className="absolute left-5 right-5 top-8 h-[6px] rounded-full bg-gray-200"></div>

        {/* Red Progress */}

        <div
          className="absolute left-5 top-8 h-[6px] rounded-full bg-[#e30613] transition-all duration-700"
          style={{
            width: `calc(${progress}% - 20px)`
          }}
        ></div>

        {/* Truck */}

        <div
          className="absolute top-1 transition-all duration-700"
          style={{
            left: `calc(${progress}% - 12px)`
          }}
        >
          <div className="w-11 h-11 rounded-full bg-[#e30613] flex items-center justify-center shadow-lg">

            <FaTruck className="text-white text-lg"/>

          </div>
        </div>

        {/* Warehouse */}

        <div className="absolute left-0 top-0 flex flex-col items-center">

          <div className="w-10 h-10 rounded-full bg-[#111] flex items-center justify-center">

            <FaBox className="text-white"/>

          </div>

          <span className="text-xs mt-2 font-semibold text-[#111]">
            Warehouse
          </span>

        </div>

        {/* Home */}

        <div className="absolute right-0 top-0 flex flex-col items-center">

          <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">

            <FaHome className="text-white"/>

          </div>

          <span className="text-xs mt-2 font-semibold text-[#111]">
            Home
          </span>

        </div>

      </div>

    </div>
  );
};

export default TrackingMap;