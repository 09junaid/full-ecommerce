import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function ProfilePage() {
  const [auth] = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-light text-gray-800 tracking-tight">
            My Account
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-500">
            Welcome back, {auth.user?.name || 'User'}
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md max-w-3xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#FF9A3C] to-[#FF851B] py-8 px-6 sm:px-10 text-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center text-3xl sm:text-4xl font-medium text-white mb-4 shadow-lg">
              {auth.user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-normal text-white tracking-wide">
                {auth.user?.name || "User"}
              </h2>
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium tracking-wider">
                {auth.user?.role ? auth.user.role.charAt(0).toUpperCase() + auth.user.role.slice(1) : "User"}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="py-6 sm:py-8 px-6 sm:px-10 divide-y divide-gray-100/50">
            {/* Account Info */}
            <div className="pb-6">
              <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
                Account Details
              </h3>
              <div className="space-y-5">
                {[
                  {
                    label: "Full Name",
                    value: auth.user?.name || "Not provided",
                    iconPath: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  },
                  {
                    label: "Email Address",
                    value: auth.user?.email || "user@example.com",
                    iconPath: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  },
                  {
                    label: "Phone Number",
                    value: auth.user?.phone || "Not provided",
                    iconPath: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  },
                  {
                    label: "Shipping Address",
                    value: auth.user?.address || "No address saved",
                    iconPath: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-[#FF851B] mt-0.5">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.iconPath} />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">{item.label}</p>
                      <p className="mt-1 text-gray-700">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Account Activity */}
            <div className="pt-6">
              <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
                Account Activity
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50/50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">Member Since</p>
                  <p className="mt-1 text-gray-700">
                    {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                  </p>
                </div>
                <div className="bg-gray-50/50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">Last Login</p>
                  <p className="mt-1 text-gray-700">
                    {new Date().toLocaleDateString('en-US', {
                      weekday: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
