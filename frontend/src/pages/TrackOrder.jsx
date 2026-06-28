import React, { useState } from 'react';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [tracking, setTracking] = useState(false);

  const handleTrack = (e) => {
    e.preventDefault();
    if (orderId) setTracking(true);
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12 bg-white">
      <div className="max-w-md w-full bg-[#111] border border-gray-800 p-8 rounded-sm shadow-xl">
        <h1 className="text-2xl font-bold uppercase tracking-widest text-white mb-2 text-center">Track Order</h1>
        <p className="text-gray-400 text-sm text-center mb-8">Enter your Order ID to track status</p>
        
        <form onSubmit={handleTrack} className="space-y-4">
          <input 
            type="text" 
            placeholder="Order ID (e.g., ORD-12345)"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-gray-700 p-3 text-white focus:outline-none focus:border-[#cc0000]" 
          />
          <button 
            type="submit"
            className="w-full bg-[#cc0000] hover:bg-[#aa0000] text-white font-bold py-3 uppercase tracking-widest transition-colors"
          >
            Track Now
          </button>
        </form>

        {tracking && (
          <div className="mt-10 pt-8 border-t border-gray-800">
            <h3 className="font-bold text-white mb-6 uppercase">Order Status</h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-700 before:to-transparent">
              {['Placed', 'Processing', 'Shipped', 'Delivered'].map((step, index) => (
                <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className={`flex items-center justify-center w-5 h-5 rounded-full border-4 border-[#111] ${index <= 1 ? 'bg-[#cc0000]' : 'bg-gray-700'} text-gray-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2`}></div>
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] px-4 py-2 bg-[#1a1a1a] rounded-sm border border-gray-800 shadow">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`font-bold text-sm ${index <= 1 ? 'text-white' : 'text-gray-500'}`}>{step}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
