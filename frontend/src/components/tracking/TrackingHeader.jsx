import React from "react";
import { FaTruck } from "react-icons/fa";

const TrackingHeader = ({ eta }) => {
  return (
    <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-[#111111] via-[#1d1d1d] to-[#111111] shadow-xl">

      <div className="p-6">

        <div className="flex items-center gap-4">

          <div className="w-16 h-16 rounded-full bg-[#e30613] flex items-center justify-center shadow-lg">

            <FaTruck className="text-white text-3xl"/>

          </div>

          <div>

            <h1 className="text-white text-[24px] font-bold leading-tight">

              Your Order is on the way 🚚

            </h1>

            <p className="text-gray-300 mt-2">

              Sit back and relax. We're delivering your Beardo products.

            </p>

          </div>

        </div>

      </div>

      <div className="bg-[#e30613] px-6 py-3">

        <p className="text-white font-semibold tracking-wide">

          Estimated Delivery • {eta || "Tomorrow before 8:00 PM"}

        </p>

      </div>

    </div>
  );
};

export default TrackingHeader;