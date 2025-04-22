import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { FaBoxOpen } from "react-icons/fa";
import { MdOutlineErrorOutline } from "react-icons/md";
import { ImSpinner8 } from "react-icons/im";
import { useSnackbar } from "notistack";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [auth] = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const getAllOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/order/get-all-orders`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );

      if (data?.success) {
        setOrders(data?.orders || []);
      }
    } catch (error) {
      console.error("Fetch orders error:", error);
      setError("Failed to load orders");
      enqueueSnackbar("Failed to load orders", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleChangeStatus = async (orderId, value) => {
    try {
      setUpdatingStatus(orderId);
      const { data } = await axios.put(
        `${import.meta.env.VITE_APP_API}/api/v1/order/order-status/${orderId}`,
        { status: value },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );

      if (data?.success) {
        setOrders(orders.map(order =>
          order._id === orderId ? { ...order, status: value } : order
        ));
        enqueueSnackbar("Order status updated successfully", {
          variant: "success",
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      }
    } catch (error) {
      console.error("Status update error:", error);
      enqueueSnackbar("Failed to update order status", { variant: "error" });
    } finally {
      setUpdatingStatus(null);
    }
  };

  useEffect(() => {
    if (auth?.token) getAllOrders();
  }, [auth?.token]);

  // Filtered orders by search
  const filteredOrders = orders.filter((order) => {
    const searchTermLower = searchTerm.toLowerCase();
    const orderDate = new Date(order.createdAt).toLocaleDateString().toLowerCase();
    const paymentStatus = order?.payment?.status === "succeeded" ? "success" : "failed";
    const totalPrice = order?.products?.reduce((total, p) => total + p.price, 0).toString();
    
    return (
      order._id.toLowerCase().includes(searchTermLower) ||
      order.status.toLowerCase().includes(searchTermLower) ||
      (order.buyerName && order.buyerName.toLowerCase().includes(searchTermLower)) ||
      orderDate.includes(searchTermLower) ||
      paymentStatus.includes(searchTermLower) ||
      totalPrice.includes(searchTermLower)
    );
  });

  return (
    <div className="min-h-screen bg-[#FFF2E8] px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#FF851B] mb-6 flex items-center gap-2">
          <FaBoxOpen className="text-xl sm:text-2xl" /> All Orders
        </h1>

        {/* Search Bar */}
        <div className="mb-4 flex flex-col sm:flex-row justify-between gap-4 items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Order ID, Status, or Date"
            className="w-full sm:w-1/2 px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {loading ? (
          <div className="text-center text-[#FF851B] flex flex-col items-center justify-center py-16 gap-4">
            <ImSpinner8 className="animate-spin text-4xl" />
            <p className="text-lg font-medium">Loading orders...</p>
          </div>
        ) : error ? (
          <div className="text-red-600 text-lg font-semibold flex items-center gap-2">
            <MdOutlineErrorOutline className="text-2xl" />
            {error}
          </div>
        ) : filteredOrders.length === 0 ? (
          <p className="text-lg text-gray-600">No orders found.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-2xl shadow-md mt-4">
            <table className="min-w-full divide-y divide-[#FF851B] text-sm">
              <thead className="bg-[#FF851B] text-white">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left font-semibold uppercase">#</th>
                  <th className="px-3 sm:px-6 py-3 text-left font-semibold uppercase">Image</th>
                  <th className="px-3 sm:px-6 py-3 text-left font-semibold uppercase">Buyer</th>
                  <th className="px-3 sm:px-6 py-3 text-left font-semibold uppercase">Date</th>
                  <th className="px-3 sm:px-6 py-3 text-left font-semibold uppercase">Quantity</th>
                  <th className="px-3 sm:px-6 py-3 text-left font-semibold uppercase">Total</th>
                  <th className="px-3 sm:px-6 py-3 text-left font-semibold uppercase">Payment</th>
                  <th className="px-3 sm:px-6 py-3 text-left font-semibold uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-700">
                {filteredOrders.map((order, i) => (
                  <tr key={order._id} className="hover:bg-[#FFF2E8] transition duration-300">
                    <td className="px-3 sm:px-6 py-4">#{order._id.slice(0, 6)}</td>
                    <td className="px-3 sm:px-6 py-4">
                      {order.products[0] && (
                        <img
                          src={`${import.meta.env.VITE_APP_API}/api/v1/product/product-photo/${order.products[0]._id}`}
                          alt={order.products[0].name}
                          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded"
                        />
                      )}
                    </td>
                    <td className="px-3 sm:px-6 py-4 text-xs sm:text-sm">{order.buyerName}</td>
                    <td className="px-3 sm:px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-3 sm:px-6 py-4">1</td>
                    <td className="px-3 sm:px-6 py-4 font-semibold">
                      ${order?.products?.reduce((total, p) => total + p.price, 0)}
                    </td>
                    <td className="px-3 sm:px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order?.payment?.status === "succeeded"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {order?.payment?.status === "succeeded" ? "Success" : "Failed"}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-4">
                      <div className="flex items-center">
                        <select
                          onChange={(e) => handleChangeStatus(order._id, e.target.value)}
                          value={order.status}
                          disabled={updatingStatus === order._id}
                          className={`bg-orange-200 cursor-pointer text-gray-900 text-sm rounded-lg block w-full p-1 sm:p-2 ${
                            updatingStatus === order._id ? "opacity-50" : ""
                          }`}
                        >
                          {status.map((s, i) => (
                            <option key={i} value={s}>{s}</option>
                          ))}
                        </select>
                        {updatingStatus === order._id && (
                          <ImSpinner8 className="animate-spin ml-2 text-orange-500" />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
