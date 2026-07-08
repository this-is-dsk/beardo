import React from "react";
import { useCart } from "../context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { clearCart } = useCart();
    const { user } = useAuth();

const { amount, cartItems, address } = location.state || {};
console.log(user);
const openRazorpay = async () => {

  try {

    const res = await fetch(
      "https://beardo-e8n0.onrender.com/api/payment/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
        }),
      }
    );

    const data = await res.json();

    if (!data.success) {

      alert("Unable to create payment.");

      return;

    }
if (!user) {

  alert("User not found");

  return;

}

if (!address) {

  alert("Address not found");

  return;

}

if (!cartItems || cartItems.length === 0) {

  alert("Cart is empty");

  return;

}
    // Abhi yahin rukenge.
    const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_live_TA3gjVGUq69KAa", 
  amount: data.order.amount,
  currency: data.order.currency,
  name: "Beardo",
  description: "Order Payment",
  order_id: data.order.id,
  prefill: {
  name: address?.fullName,
  email: address?.email,
  contact: address?.mobile,
},
notes: {
    address: address?.addressLine,
  },
modal: {

  ondismiss: function () {

    console.log("Payment Cancelled");

  }

},
  handler: async function (response) {

    console.log(response);

    const verifyRes = await fetch(
      "https://beardo-e8n0.onrender.com/api/payment/verify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(response),
      }
    );

    const verifyData = await verifyRes.json();

if (!verifyRes.ok || !verifyData.success) {

  alert("Payment Verification Failed");

  return;

}

// ----------------------------------
// CREATE ORDER AFTER PAYMENT SUCCESS
// ----------------------------------

const orderData = {

  orderId: `ORD-${Date.now()}`,

  userId: user._id,

  customerName: address.fullName,

  email: address.email,

  phone: address.mobile,

  items: cartItems.map(item => ({

    productId: item.id || item._id,

    title: item.title,

    quantity: item.quantity,

    price: item.price,

    image: item.image

  })),

  subtotal: amount,

  totalAmount: amount,

  address: {

    fullName: address.fullName,

    email: address.email,

    phone: address.mobile,

    addressLine: address.addressLine,

    landmark: address.landmark,

    city: address.city,

    state: address.state,

    pincode: address.pincode

  },

  paymentMethod: "UPI",

  paymentStatus: "paid",

  razorpayOrderId: response.razorpay_order_id,

razorpayPaymentId: response.razorpay_payment_id,

razorpaySignature: response.razorpay_signature,

};

const saveOrder = await fetch(

  "https://beardo-e8n0.onrender.com/api/orders/create",

  {

    method: "POST",

    headers: {

      "Content-Type": "application/json"

    },

    body: JSON.stringify(orderData)

  }

);

const savedData = await saveOrder.json();

console.log("ORDER RESPONSE:", savedData);

if (!saveOrder.ok || !savedData.success) {

  console.error(savedData);

  alert(savedData.message || "Order Saving Failed");

  return;

}

// -------------------------
// CLEAR CART
// -------------------------

localStorage.removeItem("cart");
clearCart();

window.dispatchEvent(new Event("storage"));
window.dispatchEvent(new Event("cartUpdated"));

// -------------------------
// SUCCESS PAGE
// -------------------------

navigate("/order-success", {

  state: {

    orderId: savedData.order.orderId,

    mongoId: savedData.order._id,

    amount: savedData.order.totalAmount,

    paymentMethod: "UPI",

    paymentId: response.razorpay_payment_id

  }

});

  },
  
  theme: {
    color: "#cc0000",
  },
};

const razorpay = new window.Razorpay(options);

razorpay.on("payment.failed", function (response) {

  alert("Payment Failed");

  console.log(response.error);

});

razorpay.open();

} catch (err) {

  console.error(err);

  alert("Something went wrong while processing payment.");

}

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
onClick={openRazorpay}
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
onClick={openRazorpay}
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
onClick={openRazorpay}
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