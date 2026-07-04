import React from "react";
import { useLocation } from "react-router-dom";

const Payment = () => {
    const location = useLocation();

const { amount, cartItems, address } = location.state || {};

const merchantName = "Beardo";

const upiId = "akhedaa.wallet@phonepe";

const upiUrl =
  `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR`;
  const openUpi = () => {

  window.location.href = upiUrl;

};
  return (
    <div className="min-h-screen bg-[#0b0b0b] py-12">

      <div className="max-w-6xl mx-auto px-4">

        {/* Heading */}

        <div className="text-center mb-10">

          <p className="text-[#cc0000] uppercase tracking-[0.3em] text-sm">
            Secure Payment
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-white mt-4">
            Complete Your Payment
          </h1>

          <p className="text-gray-400 mt-4">
            Your order is almost confirmed.
            Choose your preferred UPI payment method.
          </p>

        </div>

        {/* Main Layout */}

        <div className="grid lg:grid-cols-2 gap-8">

          {/* LEFT */}

          <div className="bg-[#141414] rounded-3xl border border-[#2a2a2a] p-8">

            <h2 className="text-white text-2xl font-bold mb-6">
              Choose Payment Method
            </h2>
<div className="bg-[#1b1b1b] border border-[#333] rounded-2xl p-6 mb-8">

  <p className="text-gray-400 text-sm uppercase tracking-widest">
    Amount To Pay
  </p>

  <h1 className="text-5xl font-bold text-[#cc0000] mt-3">
    ₹{amount || 0}
  </h1>

  <p className="text-gray-500 mt-2 text-sm">
    Including all taxes
  </p>

</div>

<div className="space-y-4">

<button
onClick={openUpi}
className="w-full bg-[#171717] border border-[#353535] hover:border-[#6f3ff5] hover:bg-[#1d1d1d] transition-all duration-300 rounded-2xl p-5 flex items-center justify-between group"
>

<div className="flex items-center gap-4">

<img
src="/images/phonepe-icon.webp"
alt="PhonePe"
className="w-12 h-12 rounded-xl bg-white p-1"
/>

<div className="text-left">

<h3 className="text-white font-semibold text-lg">
PhonePe
</h3>

<p className="text-gray-400 text-sm">
Pay instantly using PhonePe UPI
</p>

</div>

</div>

<svg
className="w-6 h-6 text-gray-500 group-hover:text-white transition"
fill="none"
stroke="currentColor"
viewBox="0 0 24 24"
>

<path
strokeLinecap="round"
strokeLinejoin="round"
strokeWidth="2"
d="M9 5l7 7-7 7"
/>

</svg>

</button>

<button
onClick={openUpi}
className="w-full bg-[#171717] border border-[#353535] hover:border-[#4285F4] hover:bg-[#1d1d1d] transition-all duration-300 rounded-2xl p-5 flex items-center justify-between group"
>

<div className="flex items-center gap-4">

<img
src="/images/6124998.png"
alt="Google Pay"
className="w-12 h-12 rounded-xl bg-white p-1"
/>

<div className="text-left">

<h3 className="text-white font-semibold text-lg">
Google Pay
</h3>

<p className="text-gray-400 text-sm">
Fast & secure UPI payment
</p>

</div>

</div>

<svg
className="w-6 h-6 text-gray-500 group-hover:text-white transition"
fill="none"
stroke="currentColor"
viewBox="0 0 24 24"
>

<path
strokeLinecap="round"
strokeLinejoin="round"
strokeWidth="2"
d="M9 5l7 7-7 7"
/>

</svg>

</button>

<button
onClick={openUpi}
className="w-full bg-[#171717] border border-[#353535] hover:border-[#00BAF2] hover:bg-[#1d1d1d] transition-all duration-300 rounded-2xl p-5 flex items-center justify-between group"
>

<div className="flex items-center gap-4">

<img
src="/images/images.png"
alt="Paytm"
className="w-12 h-12 rounded-xl bg-white p-1"
/>

<div className="text-left">

<h3 className="text-white font-semibold text-lg">
Paytm
</h3>

<p className="text-gray-400 text-sm">
Pay securely via Paytm UPI
</p>

</div>

</div>

<svg
className="w-6 h-6 text-gray-500 group-hover:text-white transition"
fill="none"
stroke="currentColor"
viewBox="0 0 24 24"
>

<path
strokeLinecap="round"
strokeLinejoin="round"
strokeWidth="2"
d="M9 5l7 7-7 7"
/>

</svg>

</button>

</div>
          </div>

          {/* RIGHT */}

          <div className="bg-[#141414] rounded-3xl border border-[#2a2a2a] p-8">

            <h2 className="text-white text-2xl font-bold mb-6">
              Order Summary
            </h2>
            <div className="space-y-4 mb-8">

  {cartItems?.map((item) => (

    <div
      key={item.id}
      className="flex items-center gap-4 border-b border-[#2d2d2d] pb-4"
    >

      <img
        src={item.image}
        alt={item.title}
        className="w-16 h-16 rounded-xl object-cover"
      />

      <div className="flex-1">

        <h3 className="text-white text-sm font-semibold">
          {item.title}
        </h3>

        <p className="text-gray-400 text-sm">
          Qty : {item.quantity}
        </p>

      </div>

      <div className="text-white font-bold">

        ₹{item.price * item.quantity}

      </div>

    </div>

  ))}

</div>
<div className="mb-8 bg-[#1b1b1b] border border-[#333] rounded-2xl p-5">

  <h3 className="text-white font-bold mb-4">
    Deliver To
  </h3>

  <p className="text-white">
    {address?.fullName}
  </p>

  <p className="text-gray-400 mt-2">

    {address?.addressLine}

  </p>

  <p className="text-gray-400">

    {address?.city}, {address?.state} - {address?.pincode}

  </p>

  <p className="text-gray-400 mt-2">

    📞 {address?.mobile}

  </p>

</div>
            <div className="space-y-5">

  <div className="flex justify-between text-gray-400">

  

  </div>

  <div className="flex justify-between text-gray-400">

    <span>Shipping</span>

    <span className="text-green-400">FREE</span>

  </div>

  <div className="flex justify-between text-gray-400">

    <span>GST</span>

    <span className="text-white">Included</span>

  </div>

  <hr className="border-[#333]" />

  <div className="flex justify-between">

    <span className="text-white text-xl font-bold">
      Total
    </span>

    <span className="text-[#cc0000] text-3xl font-bold">
     ₹{amount || 0}
    </span>

  </div>
<div className="mt-10 space-y-4">

  <div className="flex items-center gap-3">

    <span className="text-green-400 text-xl">
      ✔
    </span>

    <span className="text-gray-300">
      Secure SSL Encrypted Payment
    </span>

  </div>

  <div className="flex items-center gap-3">

    <span className="text-green-400 text-xl">
      ✔
    </span>

    <span className="text-gray-300">
      Instant Order Confirmation
    </span>

  </div>

  <div className="flex items-center gap-3">

    <span className="text-green-400 text-xl">
      ✔
    </span>

    <span className="text-gray-300">
      7 Days Easy Returns
    </span>

  </div>

</div>
</div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Payment;