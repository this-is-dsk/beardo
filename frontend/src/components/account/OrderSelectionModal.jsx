import React, { useEffect, useState } from "react";
import { IoClose, IoChevronForward } from "react-icons/io5";
import { FaBox } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OrderSelectionModal = ({ isOpen, onClose, user }) => {

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (!isOpen || !user) return;

    const fetchOrders = async () => {

      try {

        setLoading(true);

        const res = await fetch(
          `https://beardo-e8n0.onrender.com/api/orders/user/${user._id}`
        );

        const data = await res.json();

        if (data.success) {

          setOrders(data.orders);

        }

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }

    };

    fetchOrders();

  }, [isOpen, user]);

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4">

      <div className="bg-[#111] rounded-2xl w-full max-w-lg border border-[#333] overflow-hidden">

        <div className="flex justify-between items-center p-5 border-b border-[#222]">

          <h2 className="text-white text-xl font-bold">

            Select Order

          </h2>

          <button
            onClick={onClose}
            className="text-white text-2xl"
          >

            <IoClose />

          </button>

        </div>

        <div className="max-h-[500px] overflow-y-auto">

          {loading ? (

            <div className="p-8 text-center text-gray-400">

              Loading Orders...

            </div>

          ) : orders.length === 0 ? (

            <div className="p-8 text-center text-gray-400">

              No Orders Found

            </div>

          ) : (

            orders.map(order => (

              <div
                key={order._id}
                className="border-b border-[#222] p-5 hover:bg-[#181818] transition"
              >

                <div className="flex justify-between">

                  <div>

                    <div className="flex items-center gap-3">

                      <FaBox className="text-[#e30613]" />

                      <h3 className="text-white font-bold">

                        {order.orderId}

                      </h3>

                    </div>

                    <p className="text-gray-400 text-sm mt-2">

                      ₹{order.totalAmount}

                    </p>

                    <p className="text-xs text-gray-500 mt-1">

                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}

                    </p>

                  </div>

                  <div className="text-right">

                    <span
                      className={`text-sm font-semibold ${
                        order.orderStatus === "delivered"
                          ? "text-green-500"
                          : order.orderStatus === "cancelled"
                          ? "text-red-500"
                          : "text-yellow-400"
                      }`}
                    >

                      {order.orderStatus}

                    </span>

                    <button
                      onClick={() => {

                        onClose();

                        navigate(
                          `/track-order/${order.orderId}`
                        );

                      }}
                      className="mt-4 flex items-center gap-1 text-[#e30613] font-bold"
                    >

                      Track

                      <IoChevronForward />

                    </button>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>

  );

};

export default OrderSelectionModal;