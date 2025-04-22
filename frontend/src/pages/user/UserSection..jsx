import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  RiShoppingBagLine, 
  RiTruckLine,
  // RiHeartLine,
  RiHistoryLine,
  RiCouponLine,
  RiQuestionLine,
} from "react-icons/ri";
import { HiMiniCurrencyDollar } from "react-icons/hi2";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import {Link} from 'react-router-dom';


export default function UserDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [auth] = useAuth();

  const getAllOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if token exists
      if (!auth?.token) {
        throw new Error("No authentication token found");
      }
  
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/auth/user-order`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`, // Added 'Bearer' prefix
          },
        }
      );
      
      if (data?.success) {
        setOrders(data?.orders || []);
      } else {
        throw new Error(data?.message || "Failed to load orders");
      }
    } catch (error) {
      console.error("Fetch orders error:", error);
      setError(
        error.response?.data?.message || 
        error.message || 
        "Failed to load orders. Please try again later."
      );
      
      // If it's a 401 unauthorized error, you might want to handle logout
      if (error.response?.status === 401) {
        // Handle logout or token refresh here if needed
      }
    } finally {
      setLoading(false);
    }
  };
    useEffect(() => {
      if (auth?.token) getAllOrders();
    }, [auth?.token]);


  // Calculate order stats
  const ordersInTransit = orders.filter(order => order.status === "Shipped" || order.status === "Processing").length;
  const totalSpent = orders.reduce((total, order) => {
    return total + order.products.reduce((sum, item) => sum + (item.price), 0);
  }, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-amber-700">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-xl shadow-md max-w-md">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={getAllOrders}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Hello, {auth.user?.name || "Customer"}!
            </h1>
            <p className="text-amber-700">
              Here's what's happening with your account
            </p>
          </div>
          <div className="mt-4 md:mt-0 bg-white px-4 py-2 rounded-full shadow-sm flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">
              HypeHive member
            </span>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <RiShoppingBagLine className="text-2xl" />, label: "Orders", value: orders.length },
            { icon: <RiTruckLine className="text-2xl" />, label: "In Transit", value: ordersInTransit },
            { icon: <HiMiniCurrencyDollar className="text-2xl" />, label: "Total Spent", value: `$${totalSpent.toFixed(2)}` },
            { icon: <RiCouponLine className="text-2xl" />, label: "Coupons", value: auth.user?.coupons?.length || 0 },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-amber-600 mb-2">{stat.icon}</div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className="text-xl font-bold text-gray-800">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Recent Orders */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md overflow-hidden mb-8"
        >
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <RiHistoryLine className="mr-2 text-amber-600" /> Recent Orders
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {orders.length > 0 ? (
              orders.slice(0, 3).map((order) => (
                <div key={order._id} className="p-6 hover:bg-amber-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800">Order #{order._id.slice(-6).toUpperCase()}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()} • {order.products.length} item(s)
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ${order.products.reduce(
                          (total, item) => total + (item.price),
                          0
                        ).toFixed(2)}
                      </p>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === "Delivered" 
                          ? "bg-green-100 text-green-800" 
                          : order.status === "Cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-800"
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  {order.status !== "Delivered" && order.status !== "Cancelled" && (
                    <Link to={"/dashboard/user/orders"} className="mt-3 text-sm text-amber-600 hover:text-amber-700 flex items-center">
                      Track Package <RiTruckLine className="ml-1" />
                    </Link>
                  )}
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">
                You haven't placed any orders yet
              </div>
            )}
          </div>
        </motion.div>

        {/* Recommended Products */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-md overflow-hidden mb-8"
        >
          
        </motion.div>

        {/* Help Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl shadow-lg overflow-hidden text-white"
        >
          <div className="p-6 md:p-8 flex flex-col md:flex-row items-center">
            <div className="mb-4 md:mb-0 md:mr-6">
              <RiQuestionLine className="text-4xl" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2">Need Help?</h2>
              <p className="mb-4 text-amber-100">
                Our customer support team is available 24/7
              </p>
              <Link to={"/contact"} className="px-4 py-2 bg-white text-amber-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Contact Support
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}