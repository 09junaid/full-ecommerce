import React, { useState, useEffect } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

export default function UserPage() {
  const [auth] = useAuth();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API}/api/v1/auth/get-all-users`
        );
        setUsers(response.data?.users || []);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Users</h1>
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF851B] text-sm md:text-base"
          />
          <RiSearchLine className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF851B]"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Desktop/Tablet View */}
          <div className="hidden md:block p-4 md:p-6 overflow-x-auto">
            <div className="min-w-full">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm font-medium text-gray-600 border-b border-gray-200">
                    <th className="py-4 px-4">Name</th>
                    <th className="py-4 px-4">Email</th>
                    <th className="py-4 px-4">Join Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#FF851B]/10 rounded-full flex items-center justify-center">
                              <span className="text-[#FF851B] font-semibold text-sm sm:text-base">
                                {user.name?.charAt(0) || "U"}
                              </span>
                            </div>
                            <span className="text-gray-800 font-medium text-sm sm:text-base">
                              {user.name || "No Name"}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-600 text-sm sm:text-base">
                          <a href={`mailto:${user.email}`} className="hover:text-[#FF851B] hover:underline">
                            {user.email}
                          </a>
                        </td>
                        <td className="py-4 px-4 text-gray-600 text-sm sm:text-base">
                          {formatDate(user.createdAt)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="py-8 text-center text-gray-500">
                        <div className="flex flex-col items-center justify-center">
                          <svg className="w-16 h-16 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          No users found matching your search
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden">
            {filteredUsers.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <div key={user._id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#FF851B]/10 rounded-full flex-shrink-0 flex items-center justify-center">
                        <span className="text-[#FF851B] font-semibold">
                          {user.name?.charAt(0) || "U"}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-gray-800 font-medium truncate">{user.name || "No Name"}</h3>
                        <a 
                          href={`mailto:${user.email}`} 
                          className="text-gray-600 text-sm hover:text-[#FF851B] hover:underline block truncate"
                        >
                          {user.email}
                        </a>
                        <div className="text-gray-500 text-xs mt-1">
                          Joined: {formatDate(user.createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <div className="flex flex-col items-center justify-center">
                  <svg className="w-16 h-16 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  No users found matching your search
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}