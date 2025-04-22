import React, { useState } from "react";
import { Link,useNavigate} from "react-router-dom";
import logo from "../../assets/images/logo1.png";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import {useSnackbar} from "notistack";

export default function ForgotPassword() {
  const [email,setEmail]=useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate=useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const response=await axios.post(`${import.meta.env.VITE_APP_API}/api/v1/auth/forgot-password`,{email});
      if(response.data.success){
        enqueueSnackbar(response.data.message,{variant:"success",
          autoHideDuration: 2000,
          anchorOrigin:{
            vertical:"bottom",
            horizontal:"right"
          }
        })
        navigate("/login")
      }else{
        enqueueSnackbar(response.data.message,{variant:"error",
          autoHideDuration: 2000,
          anchorOrigin:{
            vertical:"bottom",
            horizontal:"right"
          }
        })
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Something went wrong",{variant:"error",
        autoHideDuration: 2000,
        anchorOrigin:{
          vertical:"bottom",
          horizontal:"right"
        }
      })
      
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left Side - Image */}
        <div className="hidden md:block w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
            alt="Forgot Password Illustration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
          <div className="absolute bottom-8 left-8 text-white">
            <h2 className="text-3xl font-bold">Reset Your Password</h2>
            <p className="text-base mt-2">We’ll send you a link to reset your password.</p>
          </div>
        </div>

        {/* Right Side - Forgot Password Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <div className="flex items-center justify-center mb-8">
            <img src={logo} alt="Logo" className="h-12 w-auto" />
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF851B] focus:border-transparent transition-all duration-200 bg-gray-50"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer flex items-center justify-center gap-2 bg-[#FF851B] text-white py-3 px-4 rounded-md hover:bg-[#e57317] transition-colors duration-300 font-medium shadow-md"
            >
              Send Reset Link
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 bg-transparent text-[#FF851B] border border-[#FF851B] py-2 px-6 rounded-md font-medium hover:bg-[#FF851B] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-sm"
            >
              <FaArrowLeft className="text-sm" />
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}