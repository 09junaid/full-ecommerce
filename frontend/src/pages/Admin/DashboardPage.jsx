import React from "react";
import { RiShoppingBagLine } from "react-icons/ri";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [auth] = useAuth();

  return (
    <div className="flex justify-center items-center h-[100vh] bg-gradient-to-br from-orange-100 to-white px  px-2 sm:px-4 md:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[95%] sm:max-w-3xl bg-white/70 backdrop-blur-lg shadow-2xl rounded-2xl px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 text-[#FF851B] transition-all duration-300 border border-orange-200"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="relative cursor-pointer">
            <div className="p-3 sm:p-4 rounded-full bg-white shadow-md">
              <RiShoppingBagLine className="text-3xl sm:text-4xl md:text-5xl text-[#FF851B] drop-shadow-md" />
            </div>
            <div className="absolute inset-0 rounded-full animate-ping bg-orange-200 opacity-30"></div>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-[#FF851B]">
              Welcome, {auth.user?.name || "Admin"}!
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-orange-500 mt-1">
              Your control panel is ready
            </p>
          </div>
        </div>

        <hr className="border-t border-orange-200 mb-4 sm:mb-6" />

        {/* Content */}
        <p className="text-sm sm:text-base md:text-lg text-orange-600 leading-relaxed mb-6 sm:mb-8">
          This is your <strong>Admin Dashboard</strong> where you can manage:
        </p>

        <ul className="space-y-2 sm:space-y-3 md:space-y-4 text-xs sm:text-sm md:text-base text-orange-700 list-disc list-inside">
          <li>
            <span className="font-semibold">Products</span> – Add, edit, or remove items from your store
          </li>
          <li>
            <span className="font-semibold">Categories</span> – Organize your items effectively
          </li>
          <li>
            <span className="font-semibold">Users</span> – View and manage customer accounts
          </li>
          <li>
            <span className="font-semibold">Orders</span> – Track customer purchases
          </li>
        </ul>

        <div className="mt-6 sm:mt-8 md:mt-10 flex justify-center sm:justify-end">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={"/dashboard/admin/products"}
              className="px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-[#FF851B] text-white rounded-md hover:bg-orange-600 transition font-semibold shadow-md cursor-pointer text-xs sm:text-sm md:text-base"
            >
              Go to Product Management
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}