import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import TrackingHeader from "../components/tracking/TrackingHeader";
import DeliveryProgress from "../components/tracking/DeliveryProgress";
import TrackingMap from "../components/tracking/TrackingMap";
import TrackingStatus from "../components/tracking/TrackingStatus";
import TrackingTimeline from "../components/tracking/TrackingTimeline";
import DeliveryPartner from "../components/tracking/DeliveryPartner";
import OrderSummary from "../components/tracking/OrderSummary";

const TrackOrder = () => {

  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const trackingSteps = [
    "Order Confirmed",
    "Packed",
    "Shipped",
    "Out For Delivery",
    "Delivered"
  ];

  const getCurrentStep = (status) => {

    switch (status) {

      case "placed":
        return 0;

      case "processing":
        return 1;

      case "shipped":
        return 2;

      case "delivered":
        return 4;

      default:
        return 0;

    }

  };

  useEffect(() => {

    const fetchOrder = async () => {

      try {

        const res = await fetch(
          `https://beardo-e8n0.onrender.com/api/admin/order/${orderId}`
        );

        const data = await res.json();

        if (data.success) {

          setOrder(data.order);

        }

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }

    };

    fetchOrder();

    const interval = setInterval(fetchOrder,10000);

    return ()=>clearInterval(interval);

  },[orderId]);

  if(loading){

    return(

      <div className="min-h-screen flex items-center justify-center">

        <h2 className="text-xl font-bold">

          Loading Tracking...

        </h2>

      </div>

    );

  }

  if(!order){

    return(

      <div className="min-h-screen flex items-center justify-center">

        <h2 className="text-xl font-bold text-red-500">

          Order Not Found

        </h2>

      </div>

    );

  }

  const currentStep = getCurrentStep(order.orderStatus);

  const progress = order.tracking?.progress || 0;

  const location =
    order.tracking?.currentLocation ||
    "Beardo Warehouse, Ahmedabad";

  const eta =
    order.tracking?.eta ||
    "Tomorrow Before 8 PM";

  const partner =
    order.tracking?.deliveryBoy || {};

  return (

    <div className="min-h-screen bg-[#f5f5f5] py-8 px-4">

      <div className="max-w-md mx-auto space-y-5">

        <TrackingHeader
          eta={eta}
        />

        <DeliveryProgress
          progress={progress}
          location={location}
        />

        <TrackingMap
          progress={progress}
        />

        <TrackingStatus
          progress={progress}
          location={location}
          eta={eta}
        />

        <TrackingTimeline
          steps={trackingSteps}
          currentStep={currentStep}
        />

        <DeliveryPartner
          currentStep={currentStep}
          partner={partner}
        />

        <OrderSummary
          order={order}
        />
        <div className="bg-white rounded-3xl shadow-lg p-6">

          <h2 className="text-xl font-bold text-[#111] mb-5">
            Order Details
          </h2>

          <div className="space-y-3">

            <div className="flex justify-between">

              <span className="text-gray-500">
                Order ID
              </span>

              <span className="font-bold">
                {order.orderId}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-500">
                Customer
              </span>

              <span className="font-bold">
                {order.customerName}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-500">
                Amount
              </span>

              <span className="font-bold text-[#e30613]">
                ₹{order.totalAmount}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-500">
                Payment
              </span>

              <span className="font-bold uppercase">
                {order.paymentMethod}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-500">
                Status
              </span>

              <span className="font-bold capitalize">
                {order.orderStatus}
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default TrackOrder;