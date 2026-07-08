import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const { cartItems, getCartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    mobile: user?.phone || '',
    email: user?.email || '',
    addressLine: '',
    landmark: '',
    city: '',
    state: '',
    pincode: ''
  });
  

  if (!user) {
    return <div className="min-h-[50vh] flex items-center justify-center text-gray-400">Please login to checkout.</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <p className="text-gray-400 mb-4">Your cart is empty.</p>
        <button onClick={() => navigate('/shop-all')} className="bg-[#cc0000] text-white px-6 py-2">Continue Shopping</button>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProceedToPayment = (e) => {

  e.preventDefault();
console.log("Checkout user:", user);
  navigate("/payment", {
    state: {
      amount: getCartTotal(),
      cartItems,
      address: formData,
       user,
    },
  });

};

  const handlePlaceOrder = () => {

  navigate("/payment", {

  state: {

    amount: getCartTotal(),

    cartItems,

    address: formData,

    user,

  },

});

};

  const handlePaymentSelect = () => {

  handlePlaceOrder();

};

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl min-h-screen">
      <h1 className="text-3xl font-bold uppercase tracking-widest mb-8 border-b border-gray-800 pb-4 text-black">
        Checkout
      </h1>
      <div className="flex items-center justify-center mb-10">

  <div className="flex items-center">

    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
      step >= 1 ? 'bg-[#cc0000] text-white' : 'bg-[#222] text-gray-500'
    }`}>
      1
    </div>

    <div className="w-16 h-[2px] bg-gray-700"></div>

    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
      step >= 2 ? 'bg-[#cc0000] text-black' : 'bg-[#222] text-gray-500'
    }`}>
      2
    </div>

    <div className="w-16 h-[2px] bg-gray-700"></div>

    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold bg-[#222] text-gray-500">
      3
    </div>

  </div>

</div>

<div className="flex justify-center gap-12 mb-10 text-md text-black">
  <span className={step >= 1 ? "text-black " : ""}>
    Shipping
  </span>

  <span className={step >= 2 ? "text-black " : ""}>
    Payment
  </span>

  <span>
    Review
  </span>
</div>
      <div className="flex gap-8 flex-col lg:flex-row">
        {/* Left Column */}
        <div className="flex-1 space-y-6">
          
          {/* Step 1: Info & Address */}
          <div className={`border ${step === 1 ? 'border-[#cc0000]' : 'border-gray-800'} bg-[#111] rounded-sm overflow-hidden`}>
            <div className="p-4 bg-[#1a1a1a] border-b border-gray-800 flex justify-between items-center">
              <div>
  <h2 className="text-xl font-bold uppercase text-white">
    1. Shipping Details
  </h2>

  <p className="text-gray-400 text-sm mt-1">
    Enter your details to get your order delivered
  </p>
</div>
              {step === 2 && (
                <button onClick={() => setStep(1)} className="text-[#cc0000] text-sm hover:underline">Edit</button>
              )}
            </div>
            
            {step === 1 && (
              <form onSubmit={handleProceedToPayment} className="p-6 space-y-6">
                {/* Customer Information */}
                <div>

<h3 className="text-white text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-5">
Customer Information
</h3>

<div className="space-y-5">

<div>

<label className="block text-sm text-gray-400 mb-2">
Full Name
</label>

<input
required
type="text"
name="fullName"
value={formData.fullName}
onChange={handleInputChange}
placeholder="Enter your full name"
className="w-full h-14 bg-[#181818] border border-[#333] rounded-2xl px-5 text-white placeholder:text-gray-500 focus:border-[#cc0000] focus:ring-2 focus:ring-[#cc0000]/20 transition-all outline-none"
/>

</div>

<div>

<label className="block text-sm text-gray-400 mb-2">
Mobile Number
</label>

<input
required
type="tel"
name="mobile"
value={formData.mobile}
onChange={handleInputChange}
placeholder="+91 9876543210"
className="w-full h-14 bg-[#181818] border border-[#333] rounded-2xl px-5 text-white placeholder:text-gray-500 focus:border-[#cc0000] focus:ring-2 focus:ring-[#cc0000]/20 transition-all outline-none"
/>

</div>

<div>

<label className="block text-sm text-gray-400 mb-2">
Email Address
</label>

<input
required
type="email"
name="email"
value={formData.email}
onChange={handleInputChange}
placeholder="Enter your email"
className="w-full h-14 bg-[#181818] border border-[#333] rounded-2xl px-5 text-white placeholder:text-gray-500 focus:border-[#cc0000] focus:ring-2 focus:ring-[#cc0000]/20 transition-all outline-none"
/>

</div>

</div>

</div>

                {/* Delivery Address */}
                <div>
                  <h3 className="text-white text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-5">Delivery Address</h3>
                  <div className="space-y-4">
                    <input required type="text" name="addressLine" value={formData.addressLine} onChange={handleInputChange} placeholder="Address Line (House No, Building, Street)"
                    className="w-full bg-[#181818] border border-[#333] rounded-2xl px-5 h-14 text-white focus:border-[#cc0000] focus:ring-2 focus:ring-[#cc0000]/20 outline-none transition-all"  />
                    <input type="text" name="landmark" value={formData.landmark} onChange={handleInputChange} placeholder="Landmark (Optional)" className="w-full bg-[#181818] border border-[#333] rounded-2xl px-5 h-14 text-white focus:border-[#cc0000] focus:ring-2 focus:ring-[#cc0000]/20 outline-none transition-all" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input required type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" className="w-full bg-[#181818] border border-[#333] rounded-xl px-4 py-4 text-white focus:border-[#cc0000] focus:ring-2 focus:ring-[#cc0000]/20 outline-none transition-all" />
                      <input required type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="State" className="w-full bg-[#181818] border border-[#333] rounded-xl px-4 py-4 text-white focus:border-[#cc0000] focus:ring-2 focus:ring-[#cc0000]/20 outline-none transition-all" />
                    </div>
                    <input required type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} placeholder="Pincode" className="w-full md:w-1/2 bg-[#181818] border border-[#333] rounded-xl px-4 py-4 text-white focus:border-[#cc0000] focus:ring-2 focus:ring-[#cc0000]/20 outline-none transition-all" />
                  </div>
                </div>
                
                <button type="submit" className="w-full h-14 bg-gradient-to-r from-[#cc0000] to-[#990000] hover:from-[#dd0000] hover:to-[#aa0000] rounded-2xl text-white font-bold uppercase tracking-[0.18em] shadow-xl shadow-red-900/30 transition-all duration-300 hover:scale-[1.02]">
                  Continue to Payment
                </button>
              </form>
            )}
            {step === 2 && (
              <div className="p-6 text-gray-400 text-sm">
                <p><span className="text-white">{formData.fullName}</span> | {formData.mobile}</p>
                <p className="mt-1">{formData.addressLine}, {formData.city}, {formData.state} - {formData.pincode}</p>
              </div>
            )}
          </div>

          

        </div>

        {/* Right Column: Order Summary */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-[#111] border border-[#333] rounded-xl sticky top-24 overflow-hidden shadow-2xl">
            <div className="p-5 bg-gradient-to-r from-[#cc0000] to-[#aa0000]">
              <h2 className="text-lg font-bold uppercase text-white">Order Summary</h2>
            </div>
            
            <div className="p-6 bg-[#0d0d0d]">
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-[#1a1a1a] flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs text-gray-300 leading-tight mb-1 line-clamp-2">{item.title}</h4>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Qty: {item.quantity}</span>
                        <span className="text-white font-bold">₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 text-sm border-t border-gray-800 pt-4 mb-4">
                <div className="flex justify-between text-white">
                  <span>Subtotal</span>
                  <span className="text-white">₹{getCartTotal()}</span>
                </div>
                <div className="flex justify-between text-white">
                  <span>Shipping</span>
                  <span className="text-[#00cc00]">FREE</span>
                </div>
              </div>
              <div className="border-t border-gray-800 pt-4 flex justify-between items-end">
                <span className="text-lg font-bold text-white uppercase tracking-wider">Total</span>
                <span className="text-2xl font-bold text-[#cc0000]">₹{getCartTotal()}</span>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-800">

  <div className="grid grid-cols-3 gap-3 text-center">

    <div>
      <div className="text-xl mb-1">🔒</div>
      <p className="text-[11px] text-gray-400">
        Secure Payment
      </p>
    </div>

    <div>
      <div className="text-xl mb-1">🚚</div>
      <p className="text-[11px] text-gray-400">
        Fast Delivery
      </p>
    </div>

    <div>
      <div className="text-xl mb-1">↩️</div>
      <p className="text-[11px] text-gray-400">
        Easy Returns
      </p>
    </div>

  </div>

</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
