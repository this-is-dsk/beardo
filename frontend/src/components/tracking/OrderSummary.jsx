import React from "react";
import {
  FaBoxOpen,
  FaCreditCard,
  FaMapMarkerAlt,
  FaReceipt
} from "react-icons/fa";

const OrderSummary = () => {

  return (

    <div className="bg-white rounded-3xl shadow-lg p-6 mt-5">

      <h2 className="text-[20px] font-bold text-[#111] mb-6">

        Order Summary

      </h2>

      <div className="space-y-5">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <FaReceipt className="text-[#e30613]"/>

            <span className="text-gray-600">

              Order ID

            </span>

          </div>

          <span className="font-bold text-[#111]">

            BD82739418

          </span>

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <FaBoxOpen className="text-[#e30613]"/>

            <span className="text-gray-600">

              Items

            </span>

          </div>

          <span className="font-bold">

            3 Products

          </span>

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <FaCreditCard className="text-[#e30613]"/>

            <span className="text-gray-600">

              Payment

            </span>

          </div>

          <span className="font-bold text-green-600">

            PAID

          </span>

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <FaMapMarkerAlt className="text-[#e30613]"/>

            <span className="text-gray-600">

              Delivery

            </span>

          </div>

          <span className="font-bold text-right">

            Jaipur, Rajasthan

          </span>

        </div>

      </div>

    </div>

  );

};

export default OrderSummary;