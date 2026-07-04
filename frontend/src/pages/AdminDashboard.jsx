import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import TrackingModal from "../components/admin/TrackingModal";

const AdminDashboard = () => {

  const { user, isLoading } = useAuth();
  const [stats, setStats] = useState({
  totalOrders: 0,
  totalUsers: 0,
  totalRevenue: 0,
  pendingOrders: 0,
});

const [recentOrders, setRecentOrders] = useState([]);

const [selectedOrder, setSelectedOrder] = useState(null);

const [trackingForm, setTrackingForm] = useState({
  progress: 0,
  currentLocation: "Beardo Warehouse, Ahmedabad",
  eta: "Tomorrow Before 8 PM",
  courier: "Blue Dart",
  deliveryBoy: {
    name: "",
    phone: "",
    vehicle: "",
    otp: "",
  },
});

const handleSaveTracking = async () => {

  if (!selectedOrder) return;

  try {

    const res = await fetch(

      `https://beardo-e8n0.onrender.com/api/admin/order/${selectedOrder._id}`,

      {

        method: "PUT",

        headers: {

          "Content-Type": "application/json",

        },

        body: JSON.stringify({

          orderStatus: selectedOrder.orderStatus,

          tracking: trackingForm,

        }),

      }

    );

    const data = await res.json();

    if (data.success) {

      alert("Tracking Updated Successfully ✅");

      setRecentOrders((prev) =>
        prev.map((item) =>
          item._id === selectedOrder._id
            ? { ...item, tracking: trackingForm }
            : item
        )
      );

      setSelectedOrder(null);

    } else {

      alert(data.message);

    }

  } catch (err) {

    console.log(err);

    alert("Something went wrong");

  }

};

useEffect(() => {

  const fetchDashboard = async () => {

    try {

      const res = await fetch(
        "https://beardo-e8n0.onrender.com/api/admin/dashboard"
      );

      const data = await res.json();

      if (data.success) {
        setStats(data);
      }

    } catch (err) {
      console.log(err);
    }

  };

  const fetchRecentOrders = async () => {

    try {

      const res = await fetch(
        "https://beardo-e8n0.onrender.com/api/admin/recent-orders"
      );

      const data = await res.json();

      if (data.success) {
        setRecentOrders(data.orders);
      }

    } catch (err) {
      console.log(err);
    }

  };

  fetchDashboard();
  fetchRecentOrders();

}, []);
  if (isLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      Loading...
    </div>
  );
}

  // Protect Route
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Only Admin Allowed
  if (user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <h1 className="text-2xl text-red-500 font-bold">
          Access Denied
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <div className="bg-[#181818] border-b border-[#333] px-8 py-5">

        <h1 className="text-3xl font-bold text-white">
          Admin Dashboard
        </h1>

      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8">

        <div className="bg-[#181818] rounded-xl p-6 border border-[#333]">
          <p className="text-gray-400">Total Orders</p>
          <h2 className="text-4xl text-white font-bold mt-3">{stats.totalOrders}</h2>
        </div>

        <div className="bg-[#181818] rounded-xl p-6 border border-[#333]">
          <p className="text-gray-400">Revenue</p>
          <h2 className="text-4xl text-white font-bold mt-3">₹{stats.totalRevenue}</h2>
        </div>

        <div className="bg-[#181818] rounded-xl p-6 border border-[#333]">
          <p className="text-gray-400">Users</p>
          <h2 className="text-4xl text-white font-bold mt-3">{stats.totalUsers}</h2>
        </div>

        <div className="bg-[#181818] rounded-xl p-6 border border-[#333]">
          <p className="text-gray-400">Pending Orders</p>
          <h2 className="text-4xl text-yellow-500 font-bold mt-3">{stats.pendingOrders}</h2>
        </div>

      </div>

      <div className="px-8 pb-8">

  <div className="bg-[#181818] rounded-xl border border-[#333] overflow-hidden">

    <div className="flex justify-between items-center p-5 border-b border-[#333]">

      <h2 className="text-white text-xl font-bold">
        Recent Orders
      </h2>

    </div>
    <div className="overflow-x-auto">
    <table className="min-w-[700px] w-full">

      <thead className="bg-[#222]">

        <tr>

          <th className="text-left p-4 text-gray-300">
            Order ID
          </th>

          <th className="text-left p-4 text-gray-300">
            Customer
          </th>

          <th className="text-left p-4 text-gray-300">
            Amount
          </th>

          <th className="text-left p-4 text-gray-300">
            Status
          </th>

          <th className="text-left p-4 text-gray-300">
            Date
          </th>
<th className="text-left p-4 text-gray-300">
  Tracking
</th>
        </tr>

      </thead>

      <tbody>

        {recentOrders.map(order => (

          <tr
            key={order._id}
            className="border-t border-[#333] hover:bg-[#202020]"
          >

            <td className="p-4 text-white">
              {order.orderId}
            </td>

            <td className="p-4 text-gray-300">
              {order.customerName}
            </td>

            <td className="p-4 text-white">
              ₹{order.totalAmount}
            </td>

            <td className="p-4">

              <select
  value={order.orderStatus}
  onChange={async (e) => {

    const newStatus = e.target.value;

    try {

      const res = await fetch(
        `https://beardo-e8n0.onrender.com/api/admin/order/${order._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderStatus: newStatus,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {

        setRecentOrders((prev) =>
          prev.map((item) =>
            item._id === order._id
              ? { ...item, orderStatus: newStatus }
              : item
          )
        );

      }

    } catch (err) {

      console.log(err);

    }

  }}

  className="bg-[#222] border border-[#444] text-white rounded-lg px-3 py-2 text-sm"
>

  <option value="placed">Placed</option>

  <option value="processing">Processing</option>

  <option value="shipped">Shipped</option>

  <option value="delivered">Delivered</option>

  <option value="cancelled">Cancelled</option>

</select>

            </td>

            <td className="p-4 text-gray-400">

              {new Date(order.createdAt).toLocaleDateString()}

            </td>
            <td className="p-4">

  <button
  onClick={() => {

    setSelectedOrder(order);

    setTrackingForm({

      progress: order.tracking?.progress || 0,

      currentLocation:
        order.tracking?.currentLocation ||
        "Beardo Warehouse, Ahmedabad",

      eta:
        order.tracking?.eta ||
        "Tomorrow Before 8 PM",

      courier:
        order.tracking?.courier ||
        "Blue Dart",

      deliveryBoy: {

        name:
          order.tracking?.deliveryBoy?.name || "",

        phone:
          order.tracking?.deliveryBoy?.phone || "",

        vehicle:
          order.tracking?.deliveryBoy?.vehicle || "",

        otp:
          order.tracking?.deliveryBoy?.otp || ""

      }

    });

  }}

  className="bg-[#e30613] hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
>

  Manage Tracking

</button>

</td>

          </tr>

        ))}

      </tbody>

    </table>
    </div>

  </div>

</div>
<TrackingModal
  isOpen={selectedOrder !== null}
  onClose={() => setSelectedOrder(null)}
  trackingForm={trackingForm}
  setTrackingForm={setTrackingForm}
  onSave={handleSaveTracking}
/>
    </div>
  );
};

export default AdminDashboard;