import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const OrderDetails = () => {

  const { id } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {

    fetch(`http://localhost:5000/api/orders/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setOrder(data.order);
        }

      });

  }, [id]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }
  return (

    <div className="min-h-screen bg-[#0f0f0f] py-10">

      <div className="container mx-auto max-w-6xl px-4">

        <h1 className="text-3xl font-bold text-white mb-8">
          Order Details
        </h1>
      </div>
<div className="bg-[#181818] border border-[#333] rounded-2xl p-6 mb-8">

  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">

    <div>

      <p className="text-gray-400 text-sm">
        ORDER ID
      </p>

      <h2 className="text-white text-xl font-bold">
        {order.orderId}
      </h2>

      <p className="text-gray-500 text-sm mt-2">
        {new Date(order.createdAt).toLocaleString()}
      </p>

    </div>

    <div className="flex gap-8">

      <div>

        <p className="text-gray-400 text-sm">
          Payment
        </p>

        <h3 className="text-white uppercase font-semibold">
          {order.paymentMethod}
        </h3>

      </div>

      <div>

        <p className="text-gray-400 text-sm">
          Status
        </p>

        <span className="bg-green-600 px-3 py-1 rounded-full text-sm text-white">
          {order.orderStatus}
        </span>

      </div>

      <div>

        <p className="text-gray-400 text-sm">
          Total
        </p>

        <h2 className="text-[#cc0000] text-2xl font-bold">
          ₹{order.totalAmount}
        </h2>

      </div>

    </div>

  </div>

</div>

{/* Products */}

<div className="bg-[#181818] border border-[#333] rounded-2xl p-6 mb-8">

  <h2 className="text-white text-2xl font-bold mb-6">
    Products
  </h2>

  <div className="space-y-6">

    {order.items.map((item, index) => (

      <div
        key={index}
        className="flex gap-5 border-b border-[#2d2d2d] pb-5 last:border-0"
      >

        <img
          src={item.image}
          alt={item.title}
          className="w-28 h-28 rounded-xl object-cover bg-[#222]"
        />

        <div className="flex-1">

          <h3 className="text-white text-lg font-bold">
            {item.title}
          </h3>

          <p className="text-gray-400 mt-2">
            Quantity : {item.quantity}
          </p>

          <p className="text-[#cc0000] text-xl font-bold mt-3">
            ₹{item.price}
          </p>

        </div>

      </div>

    ))}

  </div>

</div>

{/* Delivery Address */}

<div className="bg-[#181818] border border-[#333] rounded-2xl p-6 mb-8">

  <h2 className="text-white text-2xl font-bold mb-6">
    Delivery Address
  </h2>

  <div className="space-y-2">

    <h3 className="text-white text-lg font-semibold">
      {order.address.fullName}
    </h3>

    <p className="text-gray-400">
      {order.address.addressLine}
    </p>

    {order.address.landmark && (
      <p className="text-gray-400">
        Landmark : {order.address.landmark}
      </p>
    )}

    <p className="text-gray-400">
      {order.address.city}, {order.address.state}
    </p>

    <p className="text-gray-400">
      {order.address.pincode}
    </p>

    <div className="pt-4 border-t border-[#2d2d2d] mt-4">

      <p className="text-gray-400">
        📞 {order.address.phone}
      </p>

      <p className="text-gray-400 mt-2">
        📧 {order.address.email}
      </p>

    </div>

  </div>

</div>

{/* Payment Details */}

<div className="bg-[#181818] border border-[#333] rounded-2xl p-6 mb-8">

  <h2 className="text-white text-2xl font-bold mb-6">
    Payment Details
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    <div>
      <p className="text-gray-400 text-sm">
        Payment Method
      </p>

      <h3 className="text-white font-bold uppercase mt-2">
        {order.paymentMethod}
      </h3>
    </div>

    <div>
      <p className="text-gray-400 text-sm">
        Payment Status
      </p>

      <span
        className={`inline-block mt-2 px-4 py-1 rounded-full text-sm font-semibold ${
          order.paymentStatus === 'paid'
            ? 'bg-green-600 text-white'
            : 'bg-yellow-600 text-white'
        }`}
      >
        {order.paymentStatus}
      </span>
    </div>

    <div>
      <p className="text-gray-400 text-sm">
        Total Amount
      </p>

      <h2 className="text-[#cc0000] text-2xl font-bold mt-2">
        ₹{order.totalAmount}
      </h2>
    </div>

  </div>

</div>

{/* Order Timeline */}

<div className="bg-[#181818] border border-[#333] rounded-2xl p-6">

  <h2 className="text-white text-2xl font-bold mb-8">
    Order Timeline
  </h2>

  <div className="space-y-6">

    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
        ✓
      </div>

      <div>
        <h3 className="text-white font-semibold">
          Order Placed
        </h3>

        <p className="text-gray-400 text-sm">
          {new Date(order.createdAt).toLocaleString()}
        </p>
      </div>
    </div>

    <div className="flex items-center gap-4 opacity-60">
      <div className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center">
        2
      </div>

      <h3 className="text-white">
        Processing
      </h3>
    </div>

    <div className="flex items-center gap-4 opacity-60">
      <div className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center">
        3
      </div>

      <h3 className="text-white">
        Shipped
      </h3>
    </div>

    <div className="flex items-center gap-4 opacity-60">
      <div className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center">
        4
      </div>

      <h3 className="text-white">
        Delivered
      </h3>
    </div>

  </div>

</div>
    </div>

  );

};

export default OrderDetails;