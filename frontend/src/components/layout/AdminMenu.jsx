import React, { useState, useEffect } from "react";
import { Link, useLocation, Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  RiHome4Line,
  RiShoppingBagLine,
  RiUserLine,
  RiSearchLine,
  RiFolderLine,
  RiMenuLine,
  RiCloseLine,
} from "react-icons/ri";
import { FaRegMessage } from "react-icons/fa6";

import { IoAnalyticsSharp } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";
import { IoMdHome } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { useAuth } from "../../context/AuthContext";
import { useSnackbar } from "notistack";

export default function AdminMenu() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [auth, setAuth] = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const navigate = useNavigate();

  // Check if mobile view and handle sidebar state
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // On larger screens, always show sidebar
      if (!mobile) {
        setIsSidebarOpen(false);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navItems = [
    { name: "Dashboard", icon: RiHome4Line, path: "/dashboard/admin" },
    { name: "Category", icon: RiFolderLine, path: "create-catagory" },
    { name: "Products", icon: RiShoppingBagLine, path: "products" },
    { name: "Orders", icon: CiDeliveryTruck, path: "orders-admin" },
    { name: "Analytics", icon: IoAnalyticsSharp, path: "analytics" },
    { name: "Messages", icon: FaRegMessage, path: "messages" },
    { name: "Users", icon: RiUserLine, path: "users" },
  ];

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  
    enqueueSnackbar("Logout Success", {
      variant: "success",
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
  
    setTimeout(() => {
      navigate("/login");
    }, 100);
  };

  return (
    <div className="h-[100vh] bg-gray-100 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="bg-white shadow-sm p-4 flex items-center justify-between md:hidden sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FF851B] rounded-lg flex items-center justify-center">
            <RiShoppingBagLine className="w-6 h-6 text-white" />
          </div>
          <span className="text-lg font-semibold text-gray-800">
            {auth.user?.name || "Admin"}
          </span>
        </div>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isSidebarOpen ? (
            <RiCloseLine className="w-6 h-6" />
          ) : (
            <RiMenuLine className="w-6 h-6" />
          )}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } fixed md:relative inset-y-0 left-0 w-64 bg-white text-gray-800 flex flex-col transition-all duration-300 ease-in-out shadow-lg md:shadow-none z-20 h-screen`}
      >
        <div className="p-4 flex items-center gap-3 border-b border-gray-200">
          <div className="w-10 h-10 bg-[#FF851B] rounded-lg flex items-center justify-center">
            <RiShoppingBagLine className="w-6 h-6 text-white" />
          </div>
          <span className="text-lg font-semibold text-gray-800 truncate">
            {auth.user?.name || "Admin"}
          </span>
        </div>
        
        <nav className="flex-1 p-4 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => isMobile && setIsSidebarOpen(false)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[#FF851B]/10 text-gray-700 hover:text-[#FF851B] transition-colors duration-200 mb-2 ${
                location.pathname.includes(item.path)
                  ? "bg-[#FF851B]/20 text-[#FF851B] font-medium"
                  : ""
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{item.name}</span>
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <Link 
            to="/" 
            onClick={() => isMobile && setIsSidebarOpen(false)}
            className="w-full flex items-center gap-3 p-3 cursor-pointer rounded-lg hover:bg-[#FF851B]/10 text-gray-700 hover:text-[#FF851B] transition-colors duration-200"
          >
            <IoMdHome className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">Back to Home</span>
          </Link>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center cursor-pointer gap-3 p-3 rounded-lg hover:bg-red-50 text-red-500 hover:text-red-600 transition-colors duration-200 mt-2"
          >
            <RiUserLine className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">Logout</span>
          </button>
        </div>

        {/* Desktop Sidebar Toggle Button */}
        {/* {!isMobile && (
          <button
            onClick={toggleSidebar}
            className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200 border border-gray-200"
            aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isSidebarOpen ? (
              <GrFormPrevious className="w-5 h-5" />
            ) : (
              <MdNavigateNext className="w-5 h-5" />
            )}
          </button>
        )} */}
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Desktop Header */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between hidden md:flex sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-gray-800">
            {navItems.find(item => location.pathname.includes(item.path))?.name || "Dashboard"}
          </h1>
          <div className="flex items-center gap-4">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="w-8 h-8 bg-[#FF851B]/10 rounded-full flex items-center justify-center">
                  <RiUserLine className="w-5 h-5 text-[#FF851B]" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {auth.user?.name || "Admin"}
                </span>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-2"
              >
                <li>
                  <button onClick={handleLogout} className="text-red-500 hover:bg-red-50">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}