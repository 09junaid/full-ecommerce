import React from 'react';
// import Layout from '../components/layout/Layout';
import { useNavigate } from 'react-router-dom';

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    // <Layout>
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-6 py-12">
        <div className="max-w-lg w-full text-center animate-in fade-in slide-in-from-bottom-10 duration-500">
          {/* 404 Badge */}
          <div className="inline-block mb-6 px-4 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
            <p className="text-sm font-medium text-blue-500 dark:text-blue-400">404 Error</p>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white tracking-tight drop-shadow-md">
            Oops! Page Not Found
          </h1>

          {/* Description */}
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            Sorry, the page you’re looking for doesn’t exist or has been moved.
          </p>

          {/* Illustration */}
          <div className="mt-8">
            <svg
              className="w-40 h-40 mx-auto text-gray-300 dark:text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.172 16.172a4 4 0 015.656 0M12 12a4 4 0 100-8 4 4 0 000 8zm0 0v4m-7 4h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center mt-10 gap-4">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center w-full sm:w-auto px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 mr-2 rtl:rotate-180 group-hover:-translate-x-1 transition-transform duration-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
              Go Back
            </button>

            <button
              onClick={() => navigate('/')}
              className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300 hover:scale-105"
            >
              Take Me Home
            </button>
          </div>
        </div>
      </section>
    // </Layout>
  );
}