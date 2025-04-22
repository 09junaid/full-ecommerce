import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useAuth } from "../../context/AuthContext";
import { useSnackbar } from "notistack";
import useCatagory from "../../hooks/useCatagory";
import { useCartContext } from "../../context/CartContext";
import {  
  FiTrash2,
  FiUser,
  FiMenu,
  FiChevronDown,
  FiChevronRight,
  FiHome,
  FiInfo,
  FiPhone,
  FiX,
} from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { isCategories } = useCatagory();
  const { isCart, setIsCart } = useCartContext();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleCategoryDropdown = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    enqueueSnackbar("Logout Success", {
      variant: "success",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
    navigate("/login");
  };

  const handleRemoveFromCart = (id) => {
    let myCart = [...isCart];
    let index = myCart.findIndex((item) => item._id === id);
    myCart.splice(index, 1);
    setIsCart(myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
    enqueueSnackbar("Product removed from cart", {
      variant: "success",
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
  };

  return (
    <header
      className="bg-white sticky top-0 z-50 w-full shadow-sm"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row - Logo and Icons */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink
              to="/"
              className="text-2xl font-bold tracking-tight flex items-center"
              style={{ color: "#FF851B" }}
            >
              <span className="hidden sm:inline">
                <img src={logo} alt="Logo" className="h-10 w-auto mr-2" />
              </span>
              <span className="sm:hidden">
                <img src={logo} alt="Logo" className="h-8 w-auto" />
              </span>
            </NavLink>
          </div>
          {/* center */}
          <div className="hidden sm:block text-center">
            <h1 className="text-[26px] lg:text-[20px] font-semibold text-[#FF851B] tracking-wide leading-snug font-sans">
            Shop Smart-Live Better
            </h1>
          </div>
          {/* Right Side Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Cart Dropdown */}
            <div className="relative">
              {/* Cart Trigger Button */}
              <div className="relative group">
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="relative p-2 rounded-full cursor-pointer hover:bg-amber-100 transition-all duration-200"
                  aria-label="Cart"
                >
                  <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
                  {isCart.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                      {isCart.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Cart Panel */}
              {isCartOpen && (
                <>
                  {/* Overlay */}
                  <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                    onClick={() => setIsCartOpen(false)}
                  />

                  {/* Cart Content */}
                  <div className="fixed inset-x-4 top-20 mx-auto max-w-4xl z-50 rounded-xl overflow-hidden shadow-2xl">
                    <div className="bg-white border border-gray-200 rounded-xl flex flex-col max-h-[calc(100vh-6rem)]">
                      {/* Header */}
                      <div className="flex items-center justify-between px-6 py-4 border-b bg-white sticky top-0 z-10">
                        <div className="flex items-center space-x-2">
                          <HiOutlineShoppingBag className="h-5 w-5 text-amber-500" />
                          <h3 className="text-lg font-semibold text-gray-800">
                            Your Cart ({isCart.length})
                          </h3>
                        </div>
                        <button
                          onClick={() => setIsCartOpen(false)}
                          className="p-2 rounded-full cursor-pointer hover:bg-gray-100"
                        >
                          <FiX className="h-5 w-5 text-gray-500" />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
                        {isCart.length === 0 ? (
                          <div className="p-8 text-center text-gray-600">
                            <div className="mx-auto mb-4 w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center">
                              <HiOutlineShoppingBag className="h-8 w-8 text-amber-400" />
                            </div>
                            <h4 className="text-xl font-medium mb-2">
                              Your cart is empty
                            </h4>
                            <p className="mb-6">
                              Start adding items to your cart
                            </p>
                            <button
                              onClick={() => {
                                setIsCartOpen(false);
                                navigate("/products");
                              }}
                              className="px-6 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
                            >
                              Browse Products
                            </button>
                          </div>
                        ) : (
                          isCart.map((item) => (
                            <div
                              key={item._id}
                              className="flex p-4 gap-4 hover:bg-gray-50 transition-all duration-150"
                            >
                              <div className="h-20 w-20 flex-shrink-0 rounded-md overflow-hidden border border-gray-200">
                                <img
                                  src={`${
                                    import.meta.env.VITE_APP_API
                                  }/api/v1/product/product-photo/${item._id}`}
                                  alt={item.name}
                                  className="h-full w-full object-cover"
                                  loading="lazy"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                  <h4 className="text-sm font-medium text-gray-800 truncate">
                                    {item.name}
                                  </h4>
                                  <p className="text-sm font-bold text-gray-900">
                                    ${item.price.toFixed(2)}
                                  </p>
                                </div>
                                {item.category?.name && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    {item.category.name}
                                  </p>
                                )}
                                <div className="mt-3 flex justify-between items-center">
                                  <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                                    <span className="px-3 text-sm">1</span>
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleRemoveFromCart(item._id);
                                    }}
                                    className="text-red-500 cursor-pointer hover:text-red-700 text-sm flex items-center"
                                  >
                                    <FiTrash2 className="mr-1 h-4 w-4" />
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Footer */}
                      {isCart.length > 0 && (
                        <div className="border-t p-4 bg-white sticky bottom-0 z-10">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="text-lg font-bold text-gray-900">
                              $
                              {isCart
                                .reduce((acc, item) => acc + item.price, 0)
                                .toFixed(2)}
                            </span>
                          </div>
                          <div className="space-y-2">
                            <button
                              onClick={() => {
                                setIsCartOpen(false);
                                navigate("/cart");
                              }}
                              className="w-full py-3 cursor-pointer bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-all font-semibold"
                            >
                              View Cart
                            </button>
                            <button
                              onClick={() => setIsCartOpen(false)}
                              className="w-full py-2 text-amber-600 hover:text-amber-700 text-sm font-medium"
                            >
                              Continue Shopping
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Login Button */}
            {!auth.user ? (
              <>
                <NavLink
                  to="/login"
                  className="hidden sm:inline-flex items-center px-3 py-1 rounded-lg hover:bg-orange-50 text-[#FF851B] font-medium transition-colors duration-200"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/login"
                  className="sm:hidden p-2 rounded-full hover:bg-orange-50 transition-colors duration-200"
                  aria-label="Login"
                >
                  <FiUser className="h-5 w-5 text-[#FF851B]" />
                </NavLink>
              </>
            ) : (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle outline text-[#FF851B] avatar hover:bg-orange-50 transition-colors duration-200"
                >
                  <div className="w-8 absolute top-0 rounded-full">
                    <span className="text-3xl text-center">
                      {auth?.user?.name?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white rounded-xl w-52 border border-gray-100"
                >
                  <li>
                    <a className="justify-between text-gray-800 hover:text-[#FF851B] hover:bg-orange-50 transition-colors duration-200">
                      {auth.user.name}
                      <span className="badge bg-[#FF851B] text-white border-none">
                        {auth?.user?.role === 1 ? "admin" : "user"}
                      </span>
                    </a>
                  </li>

                  <li>
                    <NavLink
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                      className="text-gray-800 hover:text-[#FF851B] hover:bg-orange-50 transition-colors duration-200"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <a
                      className="text-gray-800 hover:text-[#FF851B] hover:bg-orange-50 transition-colors duration-200"
                      onClick={handleLogout}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-full hover:bg-orange-50 lg:hidden transition-colors duration-200"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <FiX className="h-5 w-5 text-[#FF851B]" />
              ) : (
                <FiMenu className="h-5 w-5 text-[#FF851B]" />
              )}
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex justify-center py-2">
          <div className="flex space-x-1">
            <NavLink
              to="/"
              className="px-4 py-2 rounded-lg font-medium text-gray-800 hover:text-[#FF851B] bg-orange-50 transition-all duration-300"
              style={{ color: "#FF851B", fontWeight: "600" }}
            >
              <FiHome className="inline mr-1" />
              Home
            </NavLink>

            <div
              className="relative group"
              onMouseEnter={() => setIsCategoryOpen(true)}
              onMouseLeave={() => setIsCategoryOpen(false)}
            >
              <button
                onClick={toggleCategoryDropdown}
                className="px-4 py-2 rounded-lg cursor-pointer font-medium text-gray-800 hover:text-[#FF851B] hover:bg-orange-50 transition-all duration-300 flex items-center"
              >
                Categories
                <FiChevronDown
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                    isCategoryOpen ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              {/* Submenu */}
              <div
                className={`absolute left-0 mt-1 w-56 bg-white rounded-lg shadow-xl border border-gray-100 ${
                  isCategoryOpen ? "visible opacity-100" : "invisible opacity-0"
                } transition-all duration-200 z-10`}
              >
                <div className="py-1">
                  {isCategories?.map((category) => (
                    <NavLink
                      key={category._id}
                      to={`/categories/${category.slug}`}
                      className="block px-4 py-2 text-gray-700 hover:text-[#FF851B] hover:bg-orange-50 transition-colors duration-200 flex items-center"
                      onClick={() => setIsCategoryOpen(false)}
                      style={({ isActive }) =>
                        isActive ? { color: "#FF851B", fontWeight: "600" } : {}
                      }
                    >
                      <FiChevronRight className="mr-2 h-3 w-3" />
                      {category.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>

            <NavLink
              to="/about"
              className="px-4 py-2 rounded-lg font-medium text-gray-800 hover:text-[#FF851B] hover:bg-orange-50 transition-all duration-300"
              style={({ isActive }) =>
                isActive ? { color: "#FF851B", fontWeight: "600" } : {}
              }
            >
              <FiInfo className="inline mr-1" />
              About
            </NavLink>
            <NavLink
              to="/contact"
              className="px-4 py-2 rounded-lg font-medium text-gray-800 hover:text-[#FF851B] hover:bg-orange-50 transition-all duration-300"
              style={({ isActive }) =>
                isActive ? { color: "#FF851B", fontWeight: "600" } : {}
              }
            >
              <FiPhone className="inline mr-1" />
              Contact
            </NavLink>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-3 space-y-2">
              <NavLink
                to="/"
                className="block py-2 px-4 font-medium text-gray-800 hover:text-[#FF851B] hover:bg-orange-50 transition-colors duration-200 flex items-center border-b border-[#FF851B]-100"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ color: "#FF851B", fontWeight: "600" }}
              >
                <FiHome className="mr-2" />
                Home
              </NavLink>

              {/* Updated Category Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleCategoryDropdown}
                  className="w-full flex justify-between items-center py-2 px-4 rounded-lg font-medium text-gray-800 hover:text-[#FF851B] hover:bg-orange-50 cursor-pointer transition-colors duration-200"
                >
                  <span className="flex items-center">
                    {isCategoryOpen ? (
                      <FiChevronDown className="mr-2" />
                    ) : (
                      <FiChevronRight className="mr-2" />
                    )}
                    Categories
                  </span>
                </button>

                {/* Category Submenu */}
                {isCategoryOpen && (
                  <div className="ml-4 mt-1 space-y-1">
                    {isCategories?.map((category) => (
                      <NavLink
                        key={category._id}
                        to={`/categories/${category.slug}`}
                        className="block py-2 px-4 rounded-lg text-gray-700 hover:text-[#FF851B] hover:bg-orange-50 transition-colors duration-200 flex items-center"
                        style={({ isActive }) =>
                          isActive
                            ? { color: "#FF851B", fontWeight: "600" }
                            : {}
                        }
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsCategoryOpen(false);
                        }}
                      >
                        <FiChevronRight className="mr-2 h-3 w-3" />
                        {category.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>

              <NavLink
                to="/about"
                className="block py-2 px-4 rounded-lg font-medium text-gray-800 hover:text-[#FF851B] hover:bg-orange-50 transition-colors duration-200 flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
                style={({ isActive }) =>
                  isActive ? { color: "#FF851B", fontWeight: "600" } : {}
                }
              >
                <FiInfo className="mr-2" />
                About
              </NavLink>

              <NavLink
                to="/contact"
                className="block py-2 px-4 rounded-lg font-medium text-gray-800 hover:text-[#FF851B] hover:bg-orange-50 transition-colors duration-200 flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
                style={({ isActive }) =>
                  isActive ? { color: "#FF851B", fontWeight: "600" } : {}
                }
              >
                <FiPhone className="mr-2" />
                Contact
              </NavLink>

              {!auth?.user && (
                <NavLink
                  to="/login"
                  className="block py-2 px-4 rounded-lg font-medium text-[#FF851B] hover:bg-orange-50 transition-colors duration-200 sm:hidden flex items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FiUser className="mr-2" />
                  Login
                </NavLink>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
