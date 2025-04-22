import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { FaBoxOpen, FaSearch } from "react-icons/fa";
import { MdOutlineErrorOutline } from "react-icons/md";
import { ImSpinner8 } from "react-icons/im";
import { Link } from "react-router-dom";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
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

  const searchFilter = orders.filter((order) => {
    if (!order) return false; // Ensure order is not undefined or null
    const searchTerm = search.toLowerCase();

    return (
      order._id?.toLowerCase().includes(searchTerm) || // Safe check for _id
      order.status?.toLowerCase().includes(searchTerm) || // Safe check for status
      order.products?.some(
        (product) => product?.name?.toLowerCase().includes(searchTerm) // Safe check for product name
      ) ||
      order.payment?.toString().toLowerCase().includes(searchTerm) // Safe check for payment status
    );
  });

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Date not available";
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF2E8] px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#FF851B] flex items-center gap-2">
            <FaBoxOpen className="text-xl sm:text-2xl" /> Your Orders
          </h1>
          <div className="relative w-full sm:w-auto">
            <input
              type="search"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search orders..."
              className="w-full sm:w-64 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF851B]"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {loading ? (
          <div className="text-center text-[#FF851B] flex flex-col items-center justify-center py-16 gap-4">
            <ImSpinner8 className="animate-spin text-4xl" />
            <p className="text-lg font-medium">Loading your orders...</p>
          </div>
        ) : error ? (
          <div className="text-red-600 text-lg font-semibold flex items-center gap-2">
            <MdOutlineErrorOutline className="text-2xl" />
            {error}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-gray-600 mb-4">
              You haven't placed any orders yet.
            </p>
            <Link
              to="/"
              className="bg-[#FF851B] text-white px-6 py-2 rounded-lg hover:bg-[#E76F00] transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-2xl shadow-md mt-4">
            <table className="min-w-full text-sm text-center divide-y divide-[#FF851B]">
              <thead className="bg-[#FF851B] text-white">
                <tr className="whitespace-nowrap">
                  <th className="px-3 sm:px-6 py-3 text-left font-semibold uppercase">
                    #
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left font-semibold uppercase">
                    Order ID
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left font-semibold uppercase">
                    Image
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left font-semibold uppercase">
                    Name
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left font-semibold uppercase">
                    Date
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left font-semibold uppercase">
                    Total
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left font-semibold uppercase">
                    Quantity
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left font-semibold uppercase">
                    Payment
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left font-semibold uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-center text-[#333]">
                {searchFilter.length > 0 ? (
                  searchFilter.map((order, i) => (
                    <tr
                      key={order._id}
                      className="hover:bg-[#FFF2E8] transition duration-300 whitespace-nowrap"
                    >
                      <td className="px-3 sm:px-6 py-4">{i + 1}</td>
                      <td className="px-3 sm:px-6 py-4">
                        #{order._id.slice(-6).toUpperCase()}
                      </td>
                      <td className="px-3 sm:px-6 py-4">
                        {order?.products?.[0]?._id ? (
                          <img
                            src={`${
                              import.meta.env.VITE_APP_API
                            }/api/v1/product/product-photo/${
                              order.products[0]._id
                            }`}
                            alt={order.products[0]?.name || "Product"}
                            className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-md"
                            onError={(e) => {
                              e.target.src = "/placeholder-product.png"; // Handle image loading error
                            }}
                          />
                        ) : (
                          <div className="w-14 h-14 bg-gray-200 rounded-md"></div> // Fallback for missing product image
                        )}
                      </td>
                      <td className="px-3 sm:px-6 py-4">
                        {order?.products?.[0]?.name || "Product not available"}{" "}
                        {/* Safe check for product name */}
                      </td>
                      <td className="px-3 sm:px-6 py-4">
                        {formatDate(order.createdAt)}{" "}
                        {/* Safe check for createdAt */}
                      </td>
                      <td className="px-3 sm:px-6 py-4 font-semibold">
                        $
                        {order?.products
                          ?.reduce(
                            (total, item) => total + (item?.price || 0),
                            0
                          )
                          .toFixed(2)}{" "}
                        {/* Safe check for price */}
                      </td>
                      <td className="px-3 sm:px-6 py-4 font-semibold">
                        <p>{order?.products?.length || 0}</p>
                      </td>

                      <td className="px-3 sm:px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order?.payment
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {order?.payment ? "Success" : "Failed"}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-4">
                        <span
                          className={`min-w-[100px] px-3 py-1 text-center rounded-full text-xs font-semibold flex items-center justify-center ${
                            order.status === "Processing"
                              ? "bg-yellow-100 text-yellow-700"
                              : order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {order.status || "Unknown"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No orders match your search criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
