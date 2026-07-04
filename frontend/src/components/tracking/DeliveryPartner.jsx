import React from "react";
import {
  FaPhoneAlt,
  FaStar,
  FaMotorcycle,
  FaUserAlt
} from "react-icons/fa";

const DeliveryPartner = ({ currentStep, partner }) => {

  if (currentStep < 3) return null;

  return (

    <div className="bg-white rounded-3xl shadow-lg p-6 mt-5">

      <h2 className="text-[20px] font-bold text-[#111] mb-5">

        Delivery Partner

      </h2>

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="w-16 h-16 rounded-full bg-[#e30613] flex items-center justify-center">

            <FaUserAlt className="text-white text-2xl"/>

          </div>

          <div>

            <h3 className="text-lg font-bold text-[#111]">

              {partner?.name || "Rahul Sharma"}

            </h3>

            <div className="flex items-center gap-1 mt-1">

              <FaStar className="text-yellow-400"/>

              <span className="font-semibold">

                4.9

              </span>

            </div>

          </div>

        </div>

        <button
  onClick={() => {
    if (partner?.phone) {
      window.location.href = `tel:${partner.phone}`;
    }
  }}
  className="w-12 h-12 rounded-full bg-[#e30613] text-white flex items-center justify-center hover:scale-105 transition">

          <FaPhoneAlt/>

        </button>

      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">

        <div className="bg-[#f5f5f5] rounded-2xl p-4">

          <p className="text-xs text-gray-500">

            Vehicle

          </p>

          <div className="flex items-center gap-2 mt-2">

            <FaMotorcycle className="text-[#e30613]"/>

            <span className="font-bold">

              {partner?.vehicle || "RJ14 AB 4587"}

            </span>

          </div>

        </div>

        <div className="bg-[#f5f5f5] rounded-2xl p-4">

          <p className="text-xs text-gray-500">

            Delivery OTP

          </p>

          <h3 className="text-2xl font-bold text-[#e30613] mt-2">

            {partner?.otp || "4827"}

          </h3>

        </div>

      </div>

    </div>

  );

};

export default DeliveryPartner;