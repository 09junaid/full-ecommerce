import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext';
import { FiMail, FiUser, FiMessageSquare, FiClock, FiSearch } from 'react-icons/fi'

export default function MessagePage() {
  const [contact, setContact] = useState([])
  const [filtered, setFiltered] = useState([])
  const [auth] = useAuth();
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  const getAllContact = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${import.meta.env.VITE_APP_API}/api/v1/contact/get-contact`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setContact(data?.contacts || []);
      setFiltered(data?.contacts || []);
    } catch (error) {
      console.log("Failed to fetch contacts:", error)
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getAllContact()
  }, [auth?.token]);

  useEffect(() => {
    const filteredData = contact.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.message.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredData);
  }, [search, contact]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {/* Header Section */}
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#FF851B]">Contact Messages</h1>
        <p className="text-gray-600 mt-2">Manage and review all messages from your customers</p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 max-w-2xl mx-auto md:mx-0">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name, email or message..."
            className="block w-full pl-10 pr-3 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF851B] focus:border-[#FF851B] text-sm sm:text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Content Section */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#FF851B]"></div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 text-center max-w-md mx-auto">
          <FiMail className="mx-auto h-12 w-12 text-[#FF851B] mb-4" />
          <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">No messages found</h3>
          <p className="text-gray-500 text-sm sm:text-base">New messages will appear here once received</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    <div className="bg-[#FF851B]/10 p-2 rounded-full mr-3">
                      <FiUser className="h-5 w-5 text-[#FF851B]" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{item.name}</h3>
                  </div>
                  <span className="text-xs text-gray-500 flex items-center whitespace-nowrap">
                    <FiClock className="mr-1" />
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 flex items-center">
                  <FiMail className="mr-2 text-[#FF851B] min-w-[20px]" />
                  <span className="truncate">{item.email}</span>
                </p>
                
                <div className="bg-[#FFF5E6] rounded-lg p-3 sm:p-4 text-sm text-gray-700">
                  <div className="flex">
                    <FiMessageSquare className="mr-2 mt-0.5 text-[#FF851B] flex-shrink-0" />
                    <p className="break-words">{item.message}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}