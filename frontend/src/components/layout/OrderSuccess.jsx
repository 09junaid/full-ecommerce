import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Layout from "./Layout";
import { FiCheckCircle, FiShoppingBag, FiHome, FiPackage } from 'react-icons/fi';

const OrderSuccess = () => {
  const { state } = useLocation();
  const order = state?.order;


  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 h-[100vh]">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden p-6 sm:p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
            <FiCheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Order Confirmed!</h1>
          <p className="mt-2 text-gray-600 max-w-md mx-auto">
            Your order has been successfully placed and is being prepared for shipment.
          </p>
          
          {order && (
            <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200 max-w-md mx-auto">
              <div className="flex flex-col items-center">
                <div className="flex items-center mb-2">
                  <FiShoppingBag className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="font-medium">Order #{order._id || 'N/A'}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FiPackage className="h-4 w-4 mr-1" />
                  <span>Estimated dispatch within 1-2 business days</span>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              to="/dashboard/user/orders"
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              <FiShoppingBag className="mr-2 h-4 w-4" />
              View Orders
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              <FiHome className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">Need help?</h3>
            <p className="mt-1 text-sm text-gray-500">
              Contact our support team at support@hypehive.com
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderSuccess;