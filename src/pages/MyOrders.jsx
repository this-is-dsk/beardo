import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MyOrders = () => {

  const { user } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    if (!user) return;

    fetch(`https://beardo-e8n0.onrender.com/api/orders/user/${user._id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setOrders(data.orders);
        }
      });

  }, [user]);

  return (
    <div className="min-h-screen bg-[#0f0f0f] py-10">

      <div className="container mx-auto px-4">

        <h1 className="text-3xl font-bold text-white mb-8">
          My Orders
        </h1>

        {orders.length === 0 ? (

          <div className="text-gray-400">
            No Orders Found
          </div>

        ) : (

          <div className="space-y-6">

  {orders.map(order => (

    <div
      key={order._id}
      className="bg-[#181818] border border-[#2d2d2d] rounded-2xl overflow-hidden"
    >

      {/* Header */}

      <div className="flex justify-between items-center bg-[#111] px-6 py-4 border-b border-[#2d2d2d]">

        <div>

          <p className="text-gray-400 text-xs">
            ORDER ID
          </p>

          <h3 className="text-white font-bold">
            {order.orderId}
          </h3>

        </div>

        <div className="text-right">

          <p className="text-gray-400 text-xs">
            ORDER DATE
          </p>

          <h3 className="text-white">
            {new Date(order.createdAt).toLocaleDateString()}
          </h3>

        </div>

      </div>

      {/* Products */}

      <div className="p-6 space-y-5">

        {order.items.map((item,index)=>(

          <div
            key={index}
            className="flex gap-5"
          >

            <img

              src={item.image}

              className="w-24 h-24 rounded-xl object-cover bg-[#222]"

              alt={item.title}

            />

            <div className="flex-1">

              <h2 className="text-white font-bold text-lg">

                {item.title}

              </h2>

              <p className="text-gray-400 mt-2">

                Qty : {item.quantity}

              </p>

              <p className="text-[#cc0000] font-bold mt-1">

                ₹{item.price}

              </p>

            </div>

          </div>

        ))}

      </div>

      {/* Footer */}

      <div className="bg-[#111] px-6 py-5 border-t border-[#2d2d2d] flex justify-between items-center">

        <div>

          <p className="text-sm text-gray-400">

            Payment

          </p>

          <h3 className="text-white uppercase">

            {order.paymentMethod}

          </h3>

        </div>

        <div>

          <p className="text-sm text-gray-400">

            Status

          </p>

          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs">

            {order.orderStatus}

          </span>

        </div>

        <div className="flex items-center gap-5">

  <div>

    <p className="text-sm text-gray-400">
      Total
    </p>

    <h2 className="text-[#cc0000] text-xl font-bold">
      ₹{order.totalAmount}
    </h2>

  </div>

  <button
    onClick={() => navigate(`/order/${order._id}`)}
    className="bg-[#cc0000] hover:bg-[#aa0000] text-white px-5 py-2 rounded-lg font-semibold transition-colors"
  >
    View Details
  </button>

</div>

      </div>

    </div>

  ))}

</div>

        )}

      </div>

    </div>
  );
};

export default MyOrders;