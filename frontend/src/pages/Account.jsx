import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Account = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return <div className="min-h-screen flex items-center justify-center">Please login.</div>;

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl min-h-screen">
      <h1 className="text-3xl font-bold uppercase tracking-widest mb-8 border-b border-gray-800 pb-4">
        My Account
      </h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 space-y-2">
          <button className="w-full text-left px-4 py-3 bg-[#1a1a1a] border-l-2 border-[#cc0000] text-white font-bold">
            Profile Information
          </button>
          <button
  onClick={() => navigate('/my-orders')}
  className="w-full text-left px-4 py-3 bg-[#111] text-gray-400 hover:text-white transition-colors"
>
  My Orders
</button>
          <button className="w-full text-left px-4 py-3 bg-[#111] text-gray-400 hover:text-white transition-colors">
            Saved Addresses
          </button>
          <button onClick={logout} className="w-full text-left px-4 py-3 bg-[#111] text-[#cc0000] font-bold transition-colors">
            Logout
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 bg-[#111] border border-gray-800 p-8 rounded-sm">
          <h2 className="text-2xl font-bold mb-6 text-white uppercase">Profile Information</h2>
          <div className="space-y-6 max-w-md">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Full Name</label>
              <input type="text" defaultValue={user.name} className="w-full bg-[#1a1a1a] border border-gray-700 p-3 text-white" readOnly />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email Address</label>
              <input type="email" defaultValue={user.email} className="w-full bg-[#1a1a1a] border border-gray-700 p-3 text-white" readOnly />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Mobile Number</label>
              <input type="text" defaultValue={user.phone} className="w-full bg-[#1a1a1a] border border-gray-700 p-3 text-white" readOnly />
            </div>
            <button className="bg-[#333] hover:bg-[#444] text-white px-6 py-2 uppercase text-sm tracking-wider transition-colors">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
