import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo1.png";
import { FaUser, FaEnvelope, FaEye, FaEyeSlash,FaAddressBook,FaPhoneAlt} from "react-icons/fa";
import {useSnackbar} from "notistack"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  // const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  const {enqueueSnackbar}=useSnackbar();
  const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();

const navigate=useNavigate();
  const onSubmit=async(data)=>{
    setLoading(true); // Start loading
    try {
      const response=await axios.post(`${import.meta.env.VITE_APP_API}/api/v1/auth/register`,data);
      if(response.data.success){
        enqueueSnackbar("Registration Successful!",{variant:"success",
          autoHideDuration: 2000,
          anchorOrigin:{
            vertical:"bottom",
            horizontal:"right"
          }
        })
        reset();
        navigate("/login")
      } else{
        enqueueSnackbar(response.data.message,{variant:"error",
          autoHideDuration: 2000,
          anchorOrigin:{
            vertical:"bottom",
            horizontal:"right"
          }
        })
      }
    } catch (error) {
      enqueueSnackbar("Something went wrong!",{variant:"error",
        autoHideDuration: 2000,
        anchorOrigin:{
          vertical:"bottom",
          horizontal:"right"
        }
      })
    }finally{
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left Side - Image */}
        <div className="hidden md:block w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1542744173-05336fcc7ad4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
            alt="Signup Illustration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
          <div className="absolute bottom-8 left-8 text-white">
            <h2 className="text-3xl font-bold">Join Us Today!</h2>
            <p className="text-base mt-2">Create an account to unlock exclusive deals.</p>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <div className="flex items-center justify-center mb-8">
            <img src={logo} alt="Logo" className="h-12 w-auto" />
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* {Name Section} */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="name"
                  {...register("name", {
                    required: "Name is required",
                  })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF851B] focus:border-transparent bg-gray-50"
                  placeholder="Junaid Arshad"
                />
              </div>
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            {/* {Email Section} */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
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
            {/* {Password Section} */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF851B] focus:border-transparent transition-all duration-200 bg-gray-50"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 cursor-pointer transform -translate-y-1/2 text-gray-400 hover:text-[#FF851B] focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* {Phone Section} */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <div className="relative">
                <FaPhoneAlt  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  {...register("phone", {
                    required: "Phone is required",
                    minLength: {
                      value: 10,
                      message: "Phone number must be 10 digits",
                    }
                  })}
                  
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF851B] focus:border-transparent transition-all duration-200 bg-gray-50"
                  placeholder="+92 322 387 7270"
                />
              </div>
              {errors.phone && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            {/* {Address Section} */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <div className="relative">
                <FaAddressBook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  {...register("address", {
                    required: "Address is required",
                    minLength: {
                      value: 10,
                      message: "Address must be at least 10 characters",
                    }
                  })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF851B] focus:border-transparent transition-all duration-200 bg-gray-50"
                  placeholder="Street 1, City, Country"
                />
              </div>
              {errors.address && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-md font-medium shadow-md transition-colors duration-300 ${
                loading
                  ? "bg-[#FF851B]-400 cursor-not-allowed"
                  : "bg-[#FF851B] cursor-pointer hover:bg-[#e57317] text-white"
              }`}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-[#FF851B] hover:underline font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
