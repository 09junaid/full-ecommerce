import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo1.png";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/v1/auth/login`,
        data
      );

      if (response.data.success) {
        enqueueSnackbar("Login Success", {
          variant: "success",
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });

        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.token,
        });

        localStorage.setItem("auth", JSON.stringify(response.data));
        reset();
        navigate(location.state || "/");
      } else {
        enqueueSnackbar(response.data.message, {
          variant: "error",
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      }
    } catch (error) {
      enqueueSnackbar("Something went wrong!", {
        variant: "error",
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left Image Section */}
        <div className="hidden md:block w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
          <div className="absolute bottom-8 left-8 text-white">
            <h2 className="text-3xl font-bold">Welcome Back!</h2>
            <p className="text-base mt-2">
              Log in to explore exclusive offers.
            </p>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <div className="flex items-center justify-center mb-8">
            <img src={logo} alt="Logo" className="h-12 w-auto" />
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF851B] focus:border-transparent bg-gray-50"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 4,
                      message: "Password must be at least 4 characters",
                    },
                  })}
                  className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF851B] focus:border-transparent bg-gray-50"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 cursor-pointer transform -translate-y-1/2 text-gray-400 hover:text-[#FF851B] focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="flex items-center justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-[#FF851B] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-md font-medium shadow-md transition-colors duration-300 ${
                loading
                  ? "bg-[#FF851B]-400 cursor-not-allowed"
                  : "bg-[#FF851B] cursor-pointer hover:bg-[#e57317] text-white"
              }`}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#FF851B] hover:underline font-medium"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
